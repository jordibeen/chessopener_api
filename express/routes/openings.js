const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');
const { Op } = require("sequelize");

async function getAll(req, res) {
	const urlParams = req.query;
	let limit = null;
	let offset = null;
	let wheres = {};
	if(urlParams.search) {
		wheres.name = {
			[Op.iLike]: '%' + urlParams.search + '%'
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

async function listMasterGames(req, res) {
	const id = getIdParam(req);
	const opening = await models.opening.findByPk(id);
	if (!opening) {
		res.status(404).send('404 - Not found');
	}
	const games = await opening.getGames();
	if(!games.length){
		console.log('Import masters games from Lichess');
	}
	res.status(200).json(games);
};

module.exports = {
	getAll,
	getById,
	listMasterGames
};
