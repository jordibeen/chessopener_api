const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('stats', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
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
