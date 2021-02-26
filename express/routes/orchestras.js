const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const orchestras = 'includeInstruments' in req.query ?
		await models.orchestra.findAll({ include: models.instrument }) :
		await models.orchestra.findAll();
	res.status(200).json(orchestras);
};

async function getById(req, res) {
	const id = getIdParam(req);
	const orchestra = 'includeInstruments' in req.query ?
		await models.orchestra.findByPk(id, { include: models.instrument }) :
		await models.orchestra.findByPk(id);
	if (orchestra) {
		res.status(200).json(orchestra);
	} else {
		res.status(404).send('404 - Not found');
	}
};

module.exports = {
	getAll,
	getById
};
