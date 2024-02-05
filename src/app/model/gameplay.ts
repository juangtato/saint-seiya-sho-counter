export interface PlayerBoard {
  life: number;
  cosmo: number;
  armor: number;
  depletion: number;
}

export interface Gameplay {
  leftPlayer: PlayerBoard;
  rightPlayer: PlayerBoard;
}
