const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');
const { Op } = require("sequelize");
const fetch = require('node-fetch');

async function getAll(req, res) {
	const urlParams = req.query;
	let limit = null;
	let offset = null;
	let wheres = {};

	if(urlParams.search) {
		const searches = urlParams.search.split(' ');
		if(searches.length >= 1){
			let searchAnds = []
			searches.forEach((search, i) => {
				searchAnds.push({[Op.iLike]: '%' + search + '%'});
			});
			wheres.name = {
				[Op.and]: searchAnds
			}
		}
		else {
			wheres.name = {
				[Op.iLike]: '%' + urlParams.search + '%'
			}
		}
	}

	if(urlParams.sequence) {
		wheres.sequence = {
			[Op.like]: '%' + urlParams.sequence + '%'
		}
	}

	if(urlParams.limit) {
		limit = urlParams.limit
	}

	if(urlParams.offset) {
		offset = urlParams.offset
	}

	const openings = await models.opening.findAndCountAll({
		'limit': limit,
		'offset': offset,
		'where': wheres
	});

	res.status(200).json(openings);
};

async function getById(req, res) {
	const id = getIdParam(req);
	const opening = await models.opening.findOne({
		'where': {
			'id': id
		}
	});
	if (opening) {
		res.status(200).json(opening);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function getStats(req, res) {
	const id = getIdParam(req);
	const opening = await models.opening.findByPk(id);
	if (!opening) {
		res.status(404).send('404 - Not found');
	}

	let stats = await opening.getStat();

  if(!stats){
    const urlEncodedFen = encodeURIComponent(opening.fen);
		const statsUrl = `https://explorer.lichess.ovh/lichess?variant=standard&recentGames=0&topGames=0&moves=0&speeds[]=blitz&speeds[]=rapid&speeds[]=classical&ratings[]=1600&ratings[]=1800&ratings[]=2200&ratings[]=2500&fen=${urlEncodedFen}`;
		stats = await fetch(statsUrl)
      .then(res => res.json())
      .then((result) => {
        opening.update({
          'lastLichessStatsFetch': new Date()
        });
        return models.stats.create({
    		  'amountPlayed': result.white + result.black + result.draws,
    		  'whiteWins': result.white,
    		  'blackWins': result.black,
    		  'draws': result.draws,
    		  'averageRating': result.averageRating,
    		  'openingId': opening.id});
        }, (error) => {
          console.log(error);
      });
  }
  if(opening.lastLichessStatsFetch < dayAgo()){
    const urlEncodedFen = encodeURIComponent(opening.fen);
		const statsUrl = `https://explorer.lichess.ovh/lichess?variant=standard&recentGames=0&topGames=0&moves=0&speeds[]=blitz&speeds[]=rapid&speeds[]=classical&ratings[]=1600&ratings[]=1800&ratings[]=2200&ratings[]=2500&fen=${urlEncodedFen}`;
		stats = await fetch(statsUrl)
      .then(res => res.json())
      .then((result) => {
        opening.update({
          'lastLichessStatsFetch': new Date()
        });
        return stats.update({
          'amountPlayed': result.white + result.black + result.draws,
    		  'whiteWins': result.white,
    		  'blackWins': result.black,
    		  'draws': result.draws,
    		  'averageRating': result.averageRating});
        }, (error) => {
          console.log(error);
      });
  }
	res.status(200).json(stats);
};

async function listGames(req, res) {
	const id = getIdParam(req);
	const opening = await models.opening.findByPk(id);
	if (!opening) {
		res.status(404).send('404 - Not found');
	}

  if(!opening.lastLichessGamesFetch || opening.lastLichessGamesFetch < dayAgo()){
    const urlEncodedFen = encodeURIComponent(opening.fen);
    const gamesUrl = `https://explorer.lichess.ovh/lichess?variant=standard&recentGames=4&topGames=4&speeds[]=blitz&speeds[]=rapid&speeds[]=classical&ratings[]=2500&fen=${urlEncodedFen}`;
    const lichessGames = await fetch(gamesUrl)
      .then(res => res.json())
      .then((result) => {
        let g = []
        g.push(...result.recentGames);
        g.push(...result.topGames);
        return g;
      }, (error) => {
        console.log(error);
      });
    await createNewGames(lichessGames, opening);
    opening.update({
      'lastLichessGamesFetch': new Date()
    })
  }
  let games = await opening.getGames();
	res.status(200).json(games);
};

// Non-route functions
function dayAgo(){
  return Date.now() - (1000 * 60 * 60 * 24);
}

async function createNewGames(lichessGames, opening) {
  for(const lichessGame of lichessGames){
    const gameInDb = await models.game.findOne({
      'where': {
        'lichessId': lichessGame.id
      }
    })
    if(gameInDb){
      continue;
    }
    const gameUrl = `https://lichess.org/game/export/${lichessGame.id}?clocks=false&evals=false`;
    const gamePgn = await fetch(gameUrl)
      .then(res => res.blob())
      .then((result) => {
        return result.text();
      }, (error) => {
        return '';
        console.log(error);
      })

    let playedAt = null;
    let playedAtDate = null;
    let playedAtTime = null;
    const dateRegex = new RegExp(`\\[UTCDate "([0-9.]*)"\\]`);
    const dateMatch = gamePgn.match(dateRegex);
    if(dateMatch){
      playedAtDate = dateMatch[1].replace(/\./g, '-')
    }
    const timeRegex = new RegExp(`\\[UTCTime "([0-9:]*)"\\]`);
    const timeMatch = gamePgn.match(timeRegex);
    if(timeMatch){
      playedAtTime = timeMatch[1]
    }
    if(playedAtDate && playedAtTime){
      playedAt = new Date(`${playedAtDate}T${playedAtTime}`);
    }

    const newGame = await models.game.create({
      'lichessId': lichessGame.id,
      'winner': lichessGame.winner,
      'speed': lichessGame.speed,
      'whiteName': lichessGame.white.name,
      'whiteRating': lichessGame.white.rating,
      'blackName': lichessGame.black.name,
      'blackRating': lichessGame.black.rating,
      'year': lichessGame.year,
      'playedAt': playedAt,
      'pgn': gamePgn,
      'openingId': opening.id
    }).then(res => {
      return res;
    });
  }
}


module.exports = {
	getAll,
	getById,
	getStats,
	listGames
};
