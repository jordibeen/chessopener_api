const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('opening', {
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
