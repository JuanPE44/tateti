import { BoardArray, IdCell, PossibleWin, cordinates } from "./types"
import { Game } from "./Game"
export class Board {
  ROWS = 3
  COLS = 3
  array: BoardArray = []
  element
  game
  win = false

  constructor(game: Game) {
    this.game = game
    this.element = document.createElement("div")
    this.createBoard()
  }

  createBoard() {
    this.element.classList.add("board")
    let fragment = document.createDocumentFragment()

    for(let i=0; i<this.ROWS;i++) {
      this.array[i] = []
      for(let j=0;j<this.COLS;j++) {
        const idCell:IdCell = `${i}-${j}`
        const div = this.createCell("", idCell)
        this.array[i][j] = {el: div, inner: ''}
        fragment.appendChild(div)
      }
    }
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
    if(this.win) return
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
    this.array[x][y].inner = typePlayer
    cell.innerHTML = typePlayer
    cell.classList.add("cell-animated", `cell-${typePlayer}`)
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
      "2-0 1-1 0-2",
      "0-0 1-0 2-0",
      "0-1 1-1 2-1",
      "0-2 1-2 2-2"
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
    const squareB = this.array[b.x][b.y]
    const squareA = this.array[a.x][a.y]
    const squareC = this.array[c.x][c.y]

    if(squareA.inner === squareB.inner && squareA.inner === squareC.inner && squareA.inner !== '') {
      this.printWin([squareA.el,squareB.el,squareC.el])
      this.win = true
    }
  }

  printWin(scares:(HTMLDivElement)[]) {
    scares.forEach(square => {
      square.classList.add("cell-winner")
    })
  }
}