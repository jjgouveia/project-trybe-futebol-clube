import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import LeaderboardService from '../services/leaderboard.service';

import App from '../app';

import { Response } from 'superagent';
import { commonLeaderboardMock, homeLeaderboardMock } from './mocks/leaderboard.mock.test';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const leaderboardService = new LeaderboardService();


describe('Leaderboard route tests', () => {

  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('Successfully access the common leaderboard route', async () => {

    sinon.stub(leaderboardService, 'getLeaderboard').resolves(commonLeaderboardMock as any);

    chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard')

    expect(chaiHttpResponse.status).to.be.eq(200)
  });

  it('Successfully access the home leaderboard', async () => {

    chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home')

    expect(chaiHttpResponse.status).to.be.eq(200)
  });
  it('Successfully access the away leaderboard', async () => {

    chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away')

    expect(chaiHttpResponse.status).to.be.eq(200)
  });
});