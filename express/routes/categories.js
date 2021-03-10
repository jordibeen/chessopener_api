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
	const categories = await models.category.findAll({
		'where': wheres
	});
	res.status(200).json(categories);
};

async function getById(req, res) {
	const id = getIdParam(req);
	const category = await models.category.findByPk(id);
	if (category) {
		res.status(200).json(category);
	} else {
		res.status(404).send('404 - Not found');
	}
};

module.exports = {
	getAll,
	getById
};
