const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('stats', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		amountPlayed: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		whiteWins: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		blackWins: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		draws: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		averageRating: {
			allowNull: true,
			type: DataTypes.INTEGER,
		},
	});
};
