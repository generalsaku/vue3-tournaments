export const isOvertimeValid = (game: any) => {
    return !game.overtime || Math.abs(game.team1Score - game.team2Score) === 1
}
  
export const isTeam1Winner = (game: any) => {
    return game.team1Score != null && 
    game.team2Score != null && 
    (game.team1Score ?? 0) > (game.team2Score ?? 0) && 
    isOvertimeValid(game)
}

export const isTeam2Winner = (game: any) => {
    return game.team1Score != null &&
    game.team2Score != null &&
    (game.team1Score ?? 0) < (game.team2Score ?? 0) &&
    isOvertimeValid(game)
}

export const isAnyWinner = (game: any) => isTeam1Winner(game) || isTeam2Winner(game)