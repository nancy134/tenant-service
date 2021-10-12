'use strict';

module.exports = {
    up: function(queryInterface, Sequelize){
        return queryInterface.addColumn(
            'tenants',
            'sparkClientId',
             Sequelize.STRING
        );
    },

    down: function(queryInterface, Sequelize){
        return queryInterface.removeColumn(
            'tenants',
            'sparkClientId'
        );
    }
};
