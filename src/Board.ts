import { BoardArray, RowArray, IdCell } from "./types"
import { Game } from "./Game"
export class Board {
  array
  element
  game
  possibleWin

  constructor(game: Game) {
    this.game = game
    this.element = document.createElement("div")
    this.array = this.createBoardArray()
    this.possibleWin = this.getPossibleWin()
    this.createBoard(this.array)
  }

  createBoardArray(): BoardArray {
    const row: RowArray = ["","",""]
    return [row,row,row]
  }

  createBoard(board: BoardArray) {
    this.element.classList.add("board")
    let fragment = document.createDocumentFragment()
    board.forEach((row, iR) => {
      row.forEach((cellInner, iC) => {
        const idCell:IdCell = `${iR}-${iC}`
        const div = this.createCell(cellInner, idCell)
        fragment.appendChild(div)
      })
    })
    this.element.appendChild(fragment)
  }

  createCell(cellInner: string, idCell:IdCell): HTMLDivElement {
    const cell = document.createElement("div")
    cell.classList.add("cell")
    cell.id = idCell
    cell.innerHTML = cellInner.toString()
    cell.addEventListener('click', (e) => {
      this.handleCellClick(e)
    })
    return cell
  }

  handleCellClick(e: Event) {
    const cell = e.target
    if(cell instanceof HTMLDivElement && cell.innerHTML === "") {
      console.log(cell.id)
      const typePlayer = this.game.playerTurn.data.type
      cell.innerHTML = typePlayer
      cell.classList.add("cell-animated")
      this.game.changeTurn()
    }
  }

  getPossibleWin(): number[][][] {
    return [
      [[0,0],[0,1],[0,2]],
      [[1,0],[1,1],[1,2]],
      [[2,0],[2,1],[2,2]],
      [[0,0],[1,1],[2,2]],
      [[2,0],[1,1],[0,2]]
    ]
  }
}