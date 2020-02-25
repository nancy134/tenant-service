'use strict';

const express = require('express');
const Sequelize = require('sequelize');
const TenantModel = require('./models/tenant');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
const sequelize = new Sequelize(process.env.DATABASE_URL);
const Tenant = TenantModel(sequelize, Sequelize);

app.get('/', (req, res) => {
    res.send('tenant-api.phowma.com');
});

app.get('/tenants', (req, res) => {
  Tenant.findAll().then(tenants => res.json(tenants))
});

app.get('/tenant', (req, res) => {
   Tenant.findOne({where: {name: req.query.name}}).then(tenant => {
       res.json(tenant);
   });
});
app.listen(PORT, HOST);
