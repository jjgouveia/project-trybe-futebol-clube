import { Request, Response } from 'express';

export interface IMatchController {
  getMatches(req: Request, res: Response): Promise<unknown>
  getMatchById(req: Request, res: Response): Promise<void>
  createMatch(req: Request, res: Response): Promise<void>
  updateMatchProgress(req: Request, res: Response): Promise<void>
  updateScoreMatch(req: Request, res: Response): Promise<void>
}

export interface INewMatch extends IUpdateScore{
  homeTeam: string,
  awayTeam: string,
}

export interface IUpdateScore {
  homeTeamGoals: string,
  awayTeamGoals: string
}
