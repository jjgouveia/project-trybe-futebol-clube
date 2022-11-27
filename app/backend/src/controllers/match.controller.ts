import { Request, Response } from 'express';
import { IMatchController } from '../interfaces/IMatch';
import MatchService from '../services/match.service';

export default class MatchController implements IMatchController {
  matchService = new MatchService();

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
        .matchService.getMatchesByProgress(inProgress as string);
      return res.status(200).json(request);
    }

    const matches = await this.matchService.getAllMatches();
    res.status(200).json(matches);

    // res.status(400).json({ errorMessage: {
    //   type: 400,
    //   description: 'Wrong parameter provided. Only \'true\' and \'false\' are supported',
    // } });
  }

  async getMatchById(req: Request, res: Response) {
    const { id } = req.params;

    const request = await this.matchService.getMatchById(id);

    res.status(200).json(request);
  }

  async createMatch(req: Request, res: Response) {
    const matchInfo = req.body;
    const request = await this.matchService.createMatch(matchInfo);
    res.status(201).json(request);
  }

  async updateMatchProgress(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchService.updateProgressMatch(id);

    res.status(200).json({ message: 'Finished' });
  }

  async updateScoreMatch(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.matchService.updateScoreMatch(id, req.body);

    res.status(200).json({ updatedScore: result });
  }
}
