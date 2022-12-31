const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('game', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		lichessId: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		winner: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		speed: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		whiteName: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		whiteRating: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		blackName: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		blackRating: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		year: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		pgn: {
			allowNull: false,
			type: DataTypes.TEXT,
		},
		playedAt: {
			allowNull: true,
			type: DataTypes.DATE,
		},
	});
};
