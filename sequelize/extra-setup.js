function applyExtraSetup(sequelize) {
	const { instrument, orchestra, opening, game } = sequelize.models;

	orchestra.hasMany(instrument);
	instrument.belongsTo(orchestra);

    opening.hasMany(game);
    game.belongsTo(opening);
}

module.exports = { applyExtraSetup };
