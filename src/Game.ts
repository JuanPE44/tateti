
import { Board } from './Board'
import { Player } from './Player'
export class Game {
  board = new Board(this)
  players = this.createPlayers()
  playerTurn = this.players[0]
  constructor() {
  }

  createPlayers(){
    const p1 = new Player({color: "#333", type: "X"})
    const p2 = new Player({color: "#ddd", type: "O"})
    return [p1,p2]
  }

  changeTurn() {
    const [p1,p2] = this.players
    this.playerTurn = (this.playerTurn === p1) ? p2 : p1 
  }
}