const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require('../server');
const { expect } = require('chai');
const { match, stub, resetHistory } = require('sinon');
const { makeMockModels } = require('sequelize-test-helpers');
const { noCallThru } = require('proxyquire');
const proxyquireStrict = noCallThru();


chai.use(chaiHttp);
chai.should();

describe('get tenant by name', () => {
    const tenant = { findOne: stub() }
    const mockModels = makeMockModels({ tenant });

    const server = proxyquireStrict('../server', {
        './models': mockModels 
    });

    const id = 1;
    const data = {
        name: "sabre-api"
    }
    const fakeTenant = {id, ...data, update: stub() }

    before(() => {
        //mockModels.tenant.findOne.resolves(undefined);
        mockModels.tenant.findOne.rejects("err");
    });
    it("get tenant by name fail", done => {
        chai
        .request(server)
        .get("/tenant")
        .query({
            name: "sabre-api"
        })
        .end((err, res) => {
            if (err) done(err);
            res.should.have.status(200);
            done()
        });
    });

});

describe('create tenant', () => {
    const tenant = { create: stub() }
    const mockModels = makeMockModels({tenant});
    const server = proxyquireStrict('../server', {
        './models': mockModels
    });
    const id = 1;
    const data = {
        name: "sabre-api"
    };
    const fakeTenant = {id, ...data, update: stub() }

    before(() => {
        mockModels.tenant.create.resolves(fakeTenant);
    });
    it("create tenant success", done => {
        chai
        .request(server)
        .post("/tenant")
        .send({name: "tenant1"})
        .end((err, res) => {
            if (err) done(err);
            res.should.have.status(200);
            done()
        });
    });
});

describe('get all tenants', () => {
    const tenant = { findAll: stub() }
    const mockModels = makeMockModels({tenant});
    const server = proxyquireStrict('../server', {
        './models':mockModels
    });
    before(() => {
        mockModels.tenant.findAll.rejects("err");
    });
    it('get all tenants', done => {
        chai
        .request(server)
        .get('/tenants')
        .end((err, res) => {
            if (err) done(err);
            res.should.have.status(200);
            done()
        });
    });
});
