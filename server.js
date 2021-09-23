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
  models.tenant.findAll().then(tenants => {
      res.json(tenants);
  }).catch(err => {
      res.json(err);
  });
});

app.get('/tenant', (req, res) => {
   models.tenant.findOne({where: {name: req.query.name}}).then(tenant => {
       res.json(tenant);
   }).catch(err => {
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

app.put('/tenants/:id', (req, res) => {
    models.tenant.update(
        req.body,
        {
            returning: true,
            where: {id: req.params.id}
        }
    ).then(function(update){
        if (!update[0]){
            res.json({message: "No records updated"});
        } else {
            res.json(update[1][0]);
        }
    }).catch(function(err){
        res.json(err);
    });
});

/* istanbul ignore if */
if (process.env.NODE_ENV !== "test"){
    app.listen(PORT, HOST);
}

module.exports = app;
