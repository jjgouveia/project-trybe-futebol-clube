import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  teamService = new TeamService();

  async getAll(_req: Request, res: Response) {
    try {
      const response = await this.teamService.getAllTeams();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ errors: { type: 500, message: error } });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { type, message } = await this.teamService.getTeamsById(id);
      if (type) return res.status(type as number).json({ message });
      return res.status(200).json(message);
    } catch (error) {
      return res.status(500).json({ errors: { type: 500, message: error } });
    }
  }
}
