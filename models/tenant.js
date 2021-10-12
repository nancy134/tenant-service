module.exports = (sequelize, type) => {
    const tenant = sequelize.define('tenant', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        cognito_pool_id: type.STRING,
        cognito_client_id: type.STRING,
        constantContactClientId: type.STRING,
        sparkClientId: type.STRING
    }, {});
    return tenant;
}
