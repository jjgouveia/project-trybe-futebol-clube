import { Request, Response } from 'express';
import { ITeamController } from '../interfaces/ITeam';
import TeamService from '../services/team.service';

export default class TeamController implements ITeamController {
  teamService = new TeamService();

  constructor() {
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
  }

  async getAll(_req: Request, res: Response) {
    const response = await this.teamService.getAllTeams();
    res.status(200).json(response);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamService.getTeamsById(id);
    res.status(200).json(team);
  }
}
