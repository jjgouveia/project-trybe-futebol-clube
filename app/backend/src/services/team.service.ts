import IResponse from '../interfaces/IResponse';
import Teams from '../database/models/Teams';

export default class TeamService {
  constructor(
    private teams = Teams,
  ) {}

  public async getAllTeams():Promise<Teams[]> {
    const teams = await this.teams.findAll();
    return teams;
  }

  public async getTeamsById(id: string):Promise<IResponse> {
    const teams = await this.teams.findByPk(id);
    if (!teams) return { type: 404, message: 'Time não encontrado' };
    return { type: null, message: teams };
  }
}
