const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');
const { Op } = require("sequelize");

async function getAll(req, res) {
	const urlParams = req.query;
	let wheres = {};
	if('search' in urlParams) {
		const search = urlParams['search'];
		wheres['name'] = {
			[Op.like]: '%' + search + '%',
		};
	}
	console.log(wheres);
	const openings = await models.opening.findAll({
		'where': wheres
	});
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
