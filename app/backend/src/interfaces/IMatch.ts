export interface INewMatch extends IUpdateScore{
  homeTeam: string | number,
  awayTeam: string | number,
}

export interface IUpdateScore {
  homeTeamGoals: string | number,
  awayTeamGoals: string | number,
}
