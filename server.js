'use strict';

const express = require('express');
const Sequelize = require('sequelize');
const TenantModel = require('./models/tenant');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
    res.send('tenant-api.phowma.com');
});

app.get('/tenants', (req, res) => {
  const sequelize = new Sequelize(process.env.DATABASE_URL);
  const Tenant = TenantModel(sequelize, Sequelize);
  Tenant.findAll().then(tenants => res.json(tenants))
});

app.listen(PORT, HOST);
