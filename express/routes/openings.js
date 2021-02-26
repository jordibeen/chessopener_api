const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const openings = await models.opening.findAll();
	res.status(200).json(openings);
};

async function getById(req, res) {
	const id = getIdParam(req);
	const opening = await models.opening.findByPk(id);
	if (opening) {
		res.status(200).json(opening);
	} else {
		res.status(404).send('404 - Not found');
	}
};

module.exports = {
	getAll,
	getById
};
