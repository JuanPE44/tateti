
type IdCell = `${string}-${string}`
type CellBoard = "" | "X" | "O"
type RowArray = [CellBoard,CellBoard,CellBoard] 
type BoardArray = [RowArray,RowArray,RowArray]

export class Board {
  public array: BoardArray
  public element: HTMLDivElement

  constructor() {
    this.element = document.createElement("div")
    this.array = this.createBoardArray()
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
    
    if(cell instanceof HTMLDivElement) {
      console.log(cell.id)
    }
  }
}