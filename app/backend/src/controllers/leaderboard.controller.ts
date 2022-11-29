import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  private _leaderboardService = new LeaderboardService();

  constructor() {
    this.getLeaderboard = this.getLeaderboard.bind(this);
    this.getHomeLeaderboard = this.getHomeLeaderboard.bind(this);
    this.getAwayLeaderboard = this.getAwayLeaderboard.bind(this);
  }

  async getLeaderboard(_req: Request, res: Response) {
    const request = this._leaderboardService.getLeaderboard();

    return res.status(200).json(request);
  }

  async getHomeLeaderboard(_req: Request, res: Response) {
    const request = this._leaderboardService.getLeaderboard('home');

    res.status(200).json(request);
  }

  async getAwayLeaderboard(_req: Request, res: Response) {
    const request = this._leaderboardService.getLeaderboard('away');

    res.status(200).json(request);
  }
}
