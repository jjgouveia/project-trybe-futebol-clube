import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  matchService = new MatchService();

  async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    try {
      if (inProgress) {
        const { type, message } = await this
          .matchService.getMatchesByProgress(inProgress as string);
        return res.status(type as number).json(message);
      }

      const matches = await this.matchService.getAllMatches();
      return res.status(200).json(matches);
    } catch (error) {
      res.status(400).json({ errorMessage: {
        type: 400,
        description: 'Wrong parameter provided. Only \'true\' and \'false\' are supported',
      } });
    }
  }

  async getMatchById(req: Request, res: Response) {
    const { id } = req.params;

    const { type, message } = await this.matchService.getMatchById(id);
    if (type) return res.status(type as number).json({ message });

    return res.status(200).json(message);
  }

  async createMatch(req: Request, res: Response) {
    const matchInfo = req.body;

    const { type, message } = await this.matchService.createMatch(matchInfo);
    if (type !== 201) {
      return res.status(type as number).json({ message });
    }
    return res.status(type as number).json(message);
  }

  async updateMatchProgress(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchService.updateProgressMatch(id);

    return res.status(200).json({ message: 'Finished' });
  }

  async updateScoreMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { type, message } = await this.matchService.getMatchById(id);
    if (type) return res.status(type as number).json({ message });
    await this.matchService.updateScoreMatch(id, req.body);

    return res.status(200).json({ updatedScore: message });
  }
}
