import { IMatchesWithTeamNames, ITeamStats } from '../interfaces/ILeaderboard';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class LeaderboardService {
  private _teams: Teams[] = [];
  private _matches: IMatchesWithTeamNames[] = [];
  private _teamStats: ITeamStats[] = [];

  private async getTeams() {
    this._teams = await Teams.findAll();
    const teams = await Teams.findAll();
    return teams;
  }

  private async getMatches() {
    this._matches = await Matches.findAll({
      where: { inProgress: false },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return this._matches;
  }

  private getTeamStats() {
    this._teamStats = this._teams.map((team) => {
      const stats = {
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      };
      return stats;
    });
  }

  private getHomePoints() {
    this._teamStats.forEach((team) => {
      this._matches.forEach((match) => {
        if (team.name === match.teamHome?.teamName) {
          const t = team;
          if (match.homeTeamGoals > match.awayTeamGoals) {
            t.totalVictories += 1;
            t.totalPoints += 3;
          }
          if (match.homeTeamGoals === match.awayTeamGoals) {
            t.totalDraws += 1;
            t.totalPoints += 1;
          }
          if (match.homeTeamGoals < match.awayTeamGoals) t.totalLosses += 1;
          return t;
        }
      });
    });
    this.getStatsHomePoints();
  }

  private getAwayPoints() {
    this._teamStats.forEach((team) => {
      this._matches.forEach((match) => {
        if (team.name === match.teamAway?.teamName) {
          const t = team;
          if (match.homeTeamGoals < match.awayTeamGoals) {
            t.totalVictories += 1;
            t.totalPoints += 3;
          }
          if (match.homeTeamGoals === match.awayTeamGoals) {
            t.totalDraws += 1;
            t.totalPoints += 1;
          }
          if (match.homeTeamGoals > match.awayTeamGoals) t.totalLosses += 1;
          return t;
        }
      });
    });
    this.getStatsAwayPoints();
  }

  private getStatsHomePoints() {
    this._teamStats.forEach((team) => {
      this._matches.forEach((match) => {
        if (team.name === match.teamHome?.teamName) {
          const t = team;
          t.totalGames += 1;
          t.goalsFavor += match.homeTeamGoals;
          t.goalsOwn += match.awayTeamGoals;
          t.goalsBalance = team.goalsFavor - team.goalsOwn;
          t.efficiency = Number(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
          return t;
        }
      });
    });
  }

  private getStatsAwayPoints() {
    this._teamStats.forEach((team) => {
      this._matches.forEach((match) => {
        if (team.name === match.teamAway?.teamName) {
          const t = team;
          t.totalGames += 1;
          t.goalsFavor += match.awayTeamGoals;
          t.goalsOwn += match.homeTeamGoals;
          t.goalsBalance = team.goalsFavor - team.goalsOwn;
          t.efficiency = Number(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
          return t;
        }
      });
    });
  }

  public getLeaderboard(str?: string) {
    this.getTeams();
    this.getMatches();
    this.getTeamStats();

    if (str === 'home') {
      this.getHomePoints();
    }
    if (str === 'away') {
      this.getAwayPoints();
    }
    if (!str) {
      this.getHomePoints();
      this.getAwayPoints();
    }

    const sortTeams = [...this._teamStats].sort((a, b) =>
      b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor
      || b.goalsOwn + a.goalsOwn);

    return sortTeams;
  }
}
