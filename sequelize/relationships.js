function applyRelationships(sequelize) {
	const { game, opening, stats } = sequelize.models;

    // Opening < - > Stats
    opening.hasOne(stats);
    stats.belongsTo(opening);

    // Opening < - > Game
    opening.hasMany(game);
    game.belongsTo(opening);
}

module.exports = { applyRelationships };
