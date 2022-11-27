import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import Matches from '../database/models/Matches';

import App from '../app';

import { Response } from 'superagent';
import { matchByIdMock, matchesMock, noSuchIdMock } from './mocks/match.mock.test';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;


describe('Match route tests', () => {

  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('Return a hole list of matches', async () => {

    sinon
      .stub(Matches, 'findAll')
      .resolves(matchesMock as unknown[] as Matches[])

    chaiHttpResponse = await chai
        .request(app)
        .get('/matches')

    expect(chaiHttpResponse.status).to.be.eq(200)
    expect(chaiHttpResponse.body).to.deep.eq(matchesMock);
  });

  
  it('Return a sigle match when searched by ID', async () => {

    sinon
      .stub(Matches, 'findByPk')
      .resolves(matchByIdMock as unknown as Matches)

    chaiHttpResponse = await chai
        .request(app)
        .get('/matches/1')

    expect(chaiHttpResponse.status).to.be.eq(200)
    expect(chaiHttpResponse.body).to.deep.eq(matchByIdMock);
  });

  it('Return a error when Match ID not exists', async () => {

    sinon
      .stub(Matches, 'findByPk')
      .resolves(undefined)

    chaiHttpResponse = await chai
        .request(app)
        .get('/matches/5')

    expect(chaiHttpResponse.status).to.be.eq(404)
    expect(chaiHttpResponse.body).to.deep.eq(noSuchIdMock);
  });
 
})