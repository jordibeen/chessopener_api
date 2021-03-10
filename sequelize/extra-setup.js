function applyExtraSetup(sequelize) {
	const { category, game, opening } = sequelize.models;

    opening.hasMany(game);
    game.belongsTo(opening);
    category.hasMany(opening);
    opening.belongsTo(category);
}

module.exports = { applyExtraSetup };
