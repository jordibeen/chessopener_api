const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');
const { Op } = require("sequelize");

async function getAll(req, res) {
	const urlParams = req.query;
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
	const openings = await models.opening.findAll({
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
