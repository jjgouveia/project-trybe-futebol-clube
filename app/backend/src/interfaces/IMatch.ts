export interface INewMatch extends IUpdateScore{
  homeTeam: string,
  awayTeam: string,
}

export interface IUpdateScore {
  homeTeamGoals: string,
  awayTeamGoals: string
}
