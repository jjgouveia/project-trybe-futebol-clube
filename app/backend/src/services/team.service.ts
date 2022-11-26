import { ITeam } from '../interfaces/ITeam';
import HttpException from '../utils/HttpException';
import Teams from '../database/models/Teams';

export default class TeamService {
  constructor(
    private teams = Teams,
  ) {}

  public async getAllTeams():Promise<Teams[]> {
    const teams = await this.teams.findAll();
    return teams;
  }

  public async getTeamsById(id: string):Promise<ITeam> {
    const teams = await this.teams.findByPk(id);
    if (!teams) throw new HttpException(404, 'There is no team with such id!');
    return teams;
  }
}
