import { BoardArray, IdCell, PossibleWin, cordinates } from "./types"
import { Game } from "./Game"
export class Board {
  array
  element
  game

  constructor(game: Game) {
    this.game = game
    this.element = document.createElement("div")
    this.array = this.createBoardArray()
    this.createBoard(this.array)
  }

  createBoardArray(): BoardArray {
    return [
      ["","",""],
      ["","",""],
      ["","",""],
    ]
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

  createCell(cellInner: string, idCell:IdCell) {
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
      this.drawCell(cell)
      this.checkWin()
      this.game.changeTurn()
    }
  }

  drawCell(cell: HTMLDivElement) {
    const [cordinate] = this.getCordinates(cell.id)
    const {x,y} = cordinate
    const typePlayer = this.game.playerTurn.data.type
    this.array[y][x] = typePlayer
    cell.innerHTML = typePlayer
    cell.classList.add("cell-animated")
  }

  getCordinates(...ids: string[]) { 
    const cordinates: cordinates[] = []
    ids.forEach(id => {
      const cordinate = id.split("-")
      cordinates.push({x:parseInt(cordinate[0]), y:parseInt(cordinate[1])})
    })
    return cordinates 
  }

  getPossibleWin(): PossibleWin {
    return [
      "0-0 0-1 0-2",
      "1-0 1-1 1-2",
      "2-0 2-1 2-2",
      "0-0 1-1 2-2",
      "2-0 1-1 0-2"
    ]
  }

  checkWin() {
    const possibleWin = this.getPossibleWin()
    possibleWin.forEach(win => {
      const cordinates = win.split(" ")
      this.checkCordinates(cordinates)
    })
  }

  checkCordinates(cordinates: string[]) {
    const [cord1,cord2,cord3] = cordinates;
    const [a,b,c] = this.getCordinates(cord1,cord2,cord3);
    const squareA = this.array[a.y][a.x]
    const squareB = this.array[b.y][b.x]
    const squareC = this.array[c.y][c.x]
    console.log({squareA,squareB,squareC})
    if(squareA === squareB && squareA === squareC && squareA !== '') {
      console.log("ganaste")
    }
    // falta terminar las comprobaciones
  }
}