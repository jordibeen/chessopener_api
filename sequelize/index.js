const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
const sequelize = new Sequelize('postgresql://blq@localhost:5900/chessopenings');

const modelDefiners = [
	require('./models/user.model'),
	require('./models/instrument.model'),
	require('./models/orchestra.model'),
	// Add more models here...
	require('./models/opening.model'),
	require('./models/game.model'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
