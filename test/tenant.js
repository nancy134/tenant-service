const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require('../server');

chai.use(chaiHttp);
chai.should();

describe("tenants", () => {
    it("should get service name", done => {
        chai
        .request(server)
        .get("/")
        .end((err, res) => {
            if (err) done(err);
            res.should.have.status(200);
            done();
        });
    });
    it("should get all tenants", done => {
        chai
        .request(server)
        .get("/tenants")
        .end((err, res) => {
            if (err) done(err)
            res.should.have.status(200);
            done()
        });
    });

    it("should get tenant by name", done => {
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
