const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const instruments = await models.instrument.findAll();
	res.status(200).json(instruments);
};

async function getById(req, res) {
	const id = getIdParam(req);
	const instrument = await models.instrument.findByPk(id);
	if (instrument) {
		res.status(200).json(instrument);
	} else {
		res.status(404).send('404 - Not found');
	}
};

module.exports = {
	getAll,
	getById
};
