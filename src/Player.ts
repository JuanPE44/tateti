import { PlayerInfo } from "./types"

export class Player {
  public data

  constructor(info: PlayerInfo) {
    this.data = {
      ...info,
      isTurn: false
    }
  }
}