function applyRelationships(sequelize) {
	const { game, opening } = sequelize.models;

    opening.hasMany(game);
    game.belongsTo(opening);
}

module.exports = { applyRelationships };
