const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('opening', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		eco: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		slug: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		sequence: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		fen: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		lastLichessStatsFetch: {
			allowNull: true,
			type: DataTypes.DATE,
		},
		lastLichessGamesFetch: {
			allowNull: true,
			type: DataTypes.DATE,
		},
	});
};
