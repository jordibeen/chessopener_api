const { Sequelize } = require('sequelize');
const { applyRelationships } = require('./relationships');

const sequelize = new Sequelize(process.env.DATABASE_CONNECTION_STRING, { url: process.env.DATABASE_CONNECTION_STRING, dialect: 'postgres' });

const modelDefiners = [
	require('./models/game.model'),
	require('./models/opening.model'),
	require('./models/stats.model'),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

applyRelationships(sequelize);

module.exports = sequelize;
