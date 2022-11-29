import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import Matches from '../database/models/Matches';

import App from '../app';

import { Response } from 'superagent';
import { createNewMatch,
  inProgressMatchesMock,
  invalidMatchMock,
  matchByIdMock,
  matchesMock,
  msgErrorEqualMatch, msgErrorEqualTeam, msgMissingField, newMatchResponseMock, noSuchIdMock, notInProgressMatchMock } from './mocks/match.mock.test';

import { tokenMock } from './mocks/login.mock.test';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;


describe('Match/ GET route tests', () => {

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
 describe('Matches inProgress route tests', () => {
  it('Test if when selected "true" returns only the match in progress', async () => {
    sinon
      .stub(Matches, 'findAll')
      .resolves(inProgressMatchesMock as unknown[] as Matches[])

      chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(inProgressMatchesMock);
  })
  it('Test if when selected "false" returns only the match finished', async () => {
    sinon
      .stub(Matches, 'findAll')
      .resolves(notInProgressMatchMock as unknown[] as Matches[])

      chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(notInProgressMatchMock);
  });
 });
});

describe('Match POST route tests', () => {

  beforeEach(() => sinon.stub(jwt, 'verify').resolves({ id: 1 }));

  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

it('Test if it is possible to create a new match', async () => {

  sinon
    .stub(Matches, 'create')
    .resolves(newMatchResponseMock as Matches);

    chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .send(createNewMatch)
    .set('Authorization', tokenMock);

    expect(chaiHttpResponse.status).to.be.eq(201);
    expect(chaiHttpResponse.body).to.deep.eq(newMatchResponseMock);
});

it('Test if it is not possible to create a new match with equal teams', async () => {

  sinon
    .stub(Matches, 'create')
    .resolves(invalidMatchMock[0] as Matches);

    chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .send(invalidMatchMock[0])
    .set('Authorization', tokenMock);

    expect(chaiHttpResponse.status).to.be.eq(422);
    expect(chaiHttpResponse.body).to.deep.eq(msgErrorEqualMatch);
});

it('Test if it is not possible to create a new match with a non-existent team', async () => {

  sinon
    .stub(Matches, 'create')
    .resolves(invalidMatchMock[1] as Matches);

    chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .send(invalidMatchMock[1])
    .set('Authorization', tokenMock);

    expect(chaiHttpResponse.status).to.be.eq(404);
    expect(chaiHttpResponse.body).to.deep.eq(msgErrorEqualTeam);
});

})

// describe('Match POST route tests', () => {

//   beforeEach(() => sinon.stub(jwt, 'verify').resolves({ id: 1 }));

//   let chaiHttpResponse: Response;

//   afterEach(sinon.restore);

//   it('Match PATCH route tests', () => {
//     sinon
//     .stub(Matches, 'update')
//     .resolves()
//   });

// });