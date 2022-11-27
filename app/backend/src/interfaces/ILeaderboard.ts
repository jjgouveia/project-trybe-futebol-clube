import Matches from '../database/models/Matches';

export interface ITeamStats {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

interface ITeamName {
  teamName: string
}

export interface IMatchesWithTeamNames extends Matches {
  teamHome?: ITeamName;
  teamAway?: ITeamName;
}
