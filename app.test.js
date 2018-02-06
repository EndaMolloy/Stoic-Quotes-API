const {app} = require('./app');
const request = require('supertest');
const {expect} = require('chai');

describe('App', ()=> {
  describe('GET /api/quotes/:id', ()=>{
    it('should return a single quote', (done)=>{
      request(app)
        .get('/api/quotes/'+36)
        .end((res)=>{
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.lengthOf(3);
          expect(res.statusCode).to.equal(200);
        })
        done();
    });
  });

  describe('GET /api/sdfsd', ()=>{
    it('should return a statusCode of 404', (done)=>{
      request(app)
        .get('/api/sdfsd')
        .end((res)=>{
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.include({
            "error": "/api/sdfsd not found"
          })
        })
        done();
    });
  });
});
