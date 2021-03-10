const sequelize = require('../../sequelize');
const { pickRandom, randomDate } = require('./helpers/random');

async function reset() {
	await sequelize.sync({ force: true });
	console.log('Done!');
}

reset();
