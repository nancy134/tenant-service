'use strict';

module.exports = {
    up: function(queryInterface, Sequelize){
        return queryInterface.addColumn(
            'tenants',
            'constantContactClientId',
             Sequelize.STRING
        );
    },

    down: function(queryInterface, Sequelize){
        return queryInterface.removeColumn(
            'tenants',
            'constantContactClientId'
        );
    }
};
