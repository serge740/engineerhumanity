const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Donation = sequelize.define('Donation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Donor info
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Donation details
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    frequency: {
        type: DataTypes.ENUM('once', 'monthly'),
        defaultValue: 'once'
    },
    programArea: {
        type: DataTypes.STRING,
        defaultValue: 'general'
    },

    // Options
    displayPublicly: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    dedicateTo: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Impact message (set by admin later)
    impactMessage: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'donations',
    timestamps: true
});

module.exports = Donation;
