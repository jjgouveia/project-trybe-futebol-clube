import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs'
import { invalidLogins, loginMock, tokenMock, userMock } from './mocks/login.mock.test'
// @ts-ignore
import chaiHttp = require('chai-http');

import Users from '../database/models/Users'

import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;


describe('Login route tests', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(userMock as Users);
  });

  afterEach(sinon.restore);

  it('Login successfully', async () => {
    sinon
        .stub(bcrypt, "compareSync")
        .returns(true);

    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginMock)

    expect(chaiHttpResponse.status).to.be.eq(200)
    expect(chaiHttpResponse.body.token).to.be.an('string');
    
  })
  it('Login fails and returns "400" with missing field', async () => {
    sinon
      .stub(bcrypt, "compareSync")
      .returns(true);

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(invalidLogins[0])

    expect(chaiHttpResponse.status).to.be.eq(400)
    expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled');
  })
  it('Login fails and returns "401" with invalid password', async () => {
    sinon.stub(bcrypt, "compareSync").returns(false);
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(invalidLogins[2])

    expect(chaiHttpResponse.status).to.be.eq(401)
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  })
  it('Login fails and returns "401" with invalid email', async () => {
    sinon
      .stub(bcrypt, "compareSync")
      .returns(false);

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(invalidLogins[3])

    expect(chaiHttpResponse.status).to.be.eq(401)
    expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password');
  })
  it('Login get/validate', async () => {

    sinon
      .stub(bcrypt, "compareSync")
      .returns(true);

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set({ authorization: tokenMock })
      .send(chaiHttpResponse.body.token)

    expect(chaiHttpResponse.status).to.be.eq(200)
    expect(chaiHttpResponse.body.role).to.be.eq('admin');
  })
})