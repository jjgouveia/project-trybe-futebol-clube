import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import Teams from '../database/models/Teams'

import App from '../app';

import { Response } from 'superagent';
import { noSuchIdMock, teamMockById, teamsMock } from './mocks/teams.mock.test';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;


describe('Teams route tests', () => {

  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('Return a hole list of teams', async () => {

    sinon
      .stub(Teams, 'findAll')
      .resolves(teamsMock as Teams[]);

    chaiHttpResponse = await chai
        .request(app)
        .get('/teams')

    expect(chaiHttpResponse.status).to.be.eq(200)
    expect(chaiHttpResponse.body).to.deep.eq(teamsMock);
  });

  it('Return a specific team by ID', async () => {

    sinon
      .stub(Teams, 'findByPk')
      .resolves(teamMockById as Teams);

    chaiHttpResponse = await chai
        .request(app)
        .get('/teams/1')

    expect(chaiHttpResponse.status).to.be.eq(200)
    expect(chaiHttpResponse.body).to.deep.eq(teamMockById);
  });

  it('Return a error if the ID does not exist', async () => {

    sinon
      .stub(Teams, 'findByPk')
      .resolves(undefined);

    chaiHttpResponse = await chai
        .request(app)
        .get('/teams/80')

    expect(chaiHttpResponse.status).to.be.eq(404)
    expect(chaiHttpResponse.body).to.deep.eq(noSuchIdMock);
  });
})