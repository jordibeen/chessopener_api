const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('game', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
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
