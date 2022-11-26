import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import IResponse from '../interfaces/IResponse';
import { INewMatch, IUpdateScore } from '../interfaces/IMatch';
import TeamService from './team.service';

export default class MatchService {
  teamService = new TeamService();
  constructor(
    private matches = Matches,
  ) {}

  public async getAllMatches(): Promise<Matches[]> {
    const query = await this.matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return query;
  }

  public async getMatchById(id: string): Promise<IResponse> {
    const query = await this.matches.findByPk(id);

    if (!query) return { type: 404, message: 'There is no match with such id!' };
    return { type: null, message: query };
  }

  public async getMatchesByProgress(str: string): Promise<IResponse> {
    const inProgress = JSON.parse(str);
    const query = await this.matches.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    if (!query) {
      return { type: 404, message: 'No matches found' };
    }

    return { type: 200, message: query };
  }

  public async createMatch(matchInfo: INewMatch): Promise<IResponse> {
    const { homeTeam, awayTeam } = matchInfo;
    const teamHome = this.teamService.getTeamsById(homeTeam);
    const teamAway = this.teamService.getTeamsById(awayTeam);

    if (((await teamHome).id) || (await (await teamAway).id) === 404) {
      return { type: 404, message: 'There is no team with such id!' };
    }
    if (homeTeam === awayTeam) {
      return { type: 422, message: 'It is not possible to create a match with two equal teams' };
    }

    const match = await this.matches.create({ ...matchInfo, inProgress: 1 });
    return { type: 201, message: match };
  }

  public async updateProgressMatch(id: string): Promise<void> {
    await this.matches.update({ inProgress: 0 }, { where: { id } });
  }

  public async updateScoreMatch(id: string, updateParams: IUpdateScore): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = updateParams;
    await this.matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
