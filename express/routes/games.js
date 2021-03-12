const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const urlParams = req.query;
	let wheres = {};
	if(urlParams.openingId) {
		wheres['openingId'] = urlParams.openingId;
	}
	const games = await models.game.findAll({
		'where': wheres
	});
	res.status(200).json(games);
};

async function getById(req, res) {
	const id = getIdParam(req);
	const game = await models.game.findByPk(id);
	if (game) {
		res.status(200).json(game);
	} else {
		res.status(404).send('404 - Not found');
	}
};

module.exports = {
	getAll,
	getById
};
