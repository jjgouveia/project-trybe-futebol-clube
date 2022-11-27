import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  private _matchService = new MatchService();

  constructor() {
    this.getMatches = this.getMatches.bind(this);
    this.getMatchById = this.getMatchById.bind(this);
    this.createMatch = this.createMatch.bind(this);
    this.updateMatchProgress = this.updateMatchProgress.bind(this);
    this.updateScoreMatch = this.updateScoreMatch.bind(this);
  }

  async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      const request = await this
        ._matchService.getMatchesByProgress(inProgress as string);
      return res.status(200).json(request);
    }

    const matches = await this._matchService.getAllMatches();
    res.status(200).json(matches);
  }

  async getMatchById(req: Request, res: Response) {
    const { id } = req.params;

    const request = await this._matchService.getMatchById(id);

    res.status(200).json(request);
  }

  async createMatch(req: Request, res: Response) {
    const matchInfo = req.body;
    const request = await this._matchService.createMatch(matchInfo);
    res.status(201).json(request);
  }

  async updateMatchProgress(req: Request, res: Response) {
    const { id } = req.params;
    await this._matchService.updateProgressMatch(id);

    res.status(200).json({ message: 'Finished' });
  }

  async updateScoreMatch(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this._matchService.updateScoreMatch(id, req.body);

    res.status(200).json({ updatedScore: result });
  }
}
