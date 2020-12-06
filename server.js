'use strict';

const express = require('express');
const Sequelize = require('sequelize');
const models = require('./models');
const bodyParser = require('body-parser');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const sequelize = new Sequelize(process.env.DATABASE_URL);
//const Tenant = TenantModel(sequelize, Sequelize);

app.get('/', (req, res) => {
    res.send('tenant-service');
});

app.get('/tenants', (req, res) => {
  console.log("/tenants");
  models.tenant.findAll().then(tenants => {
      res.json(tenants);
  }).catch(err => {
      res.json(err);
  });
});

app.get('/tenant', (req, res) => {
   models.tenant.findOne({where: {name: req.query.name}}).then(tenant => {
       console.log("findOne returns success");
       res.json(tenant);
   }).catch(err => {
       console.log("findOne returns error");
       res.json(err)
   });
});

app.post('/tenant', (req, res) => {
    models.tenant.create(req.body).then(function(tenant){
        res.jon(tenant);
    }).catch(function(err){
        res.json(err);
    });
});
console.log("process.env.NODE_ENV: "+process.env.NODE_ENV);
/* istanbul ignore if */
if (process.env.NODE_ENV !== "test"){
    app.listen(PORT, HOST);
}

module.exports = app;
