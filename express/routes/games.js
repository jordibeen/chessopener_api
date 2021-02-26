const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const games = await models.game.findAll();
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
