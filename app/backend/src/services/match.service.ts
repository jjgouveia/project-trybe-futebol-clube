import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import IResponse from '../interfaces/IResponse';

export default class MatchService {
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
}
