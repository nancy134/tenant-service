'use strict';

const express = require('express');
const Sequelize = require('sequelize');
const TenantModel = require('./models/tenant');
const bodyParser = require('body-parser');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
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

app.post('/tenant', (req, res) => {
    Tenant.create(req.body).then(function(tenant){
        res.jon(tenant);
    }).catch(function(err){
        res.json(err);
    });
});
app.listen(PORT, HOST);
