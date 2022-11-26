import { Request, Response } from 'express';

export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamController {
  getAll(req: Request, res: Response): Promise<unknown>;
  getById(req: Request, res: Response): Promise<unknown>;
}
