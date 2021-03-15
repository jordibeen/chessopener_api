const { Sequelize } = require('sequelize');
const { applyRelationships } = require('./relationships');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
const sequelize = new Sequelize('postgresql://blq@localhost:5900/chessopenings');

const modelDefiners = [
	require('./models/game.model'),
	require('./models/opening.model'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyRelationships(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
