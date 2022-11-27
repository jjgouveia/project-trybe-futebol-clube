import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { INewMatch, IUpdateScore } from '../interfaces/IMatch';
import HttpException from '../utils/HttpException';

export default class MatchService {
  private _teamModel = Teams;

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

  public async getMatchById(id: string): Promise<Matches> {
    const query = await this.matches.findByPk(id);

    if (!query) throw new HttpException(404, 'There is no match with such id!');

    return query;
  }

  public async getMatchesByProgress(str: string): Promise<Matches[]> {
    const inProgress = JSON.parse(str);

    const query = await this.matches.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    if (!query) throw new HttpException(404, 'No matches found');

    return query;
  }

  public async createValidation({ homeTeam, awayTeam }: INewMatch) {
    if (homeTeam === awayTeam) {
      throw new HttpException(422, 'It is not possible to create a match with two equal teams');
    }

    const teamHome = await this._teamModel.findByPk(homeTeam);
    const teamAway = await this._teamModel.findByPk(awayTeam);

    if (!teamHome || !teamAway) {
      throw new HttpException(404, 'There is no team with such id!');
    }
  }

  public async createMatch(matchInfo: INewMatch): Promise<Matches> {
    await this.createValidation(matchInfo);

    const match = await this.matches.create({ ...matchInfo, inProgress: 1 });
    return match;
  }

  public async updateProgressMatch(id: string): Promise<void> {
    await this.matches.update({ inProgress: 0 }, { where: { id } });
  }

  public async updateScoreMatch(id: string, updateParams: IUpdateScore): Promise<Matches | null> {
    const { homeTeamGoals, awayTeamGoals } = updateParams;
    const request = this.matches.findByPk(id);
    if (!request) throw new HttpException(404, 'There is no match with such id!');
    await this.matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return request;
  }
}
