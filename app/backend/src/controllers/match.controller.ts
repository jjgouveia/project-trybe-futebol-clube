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
}
