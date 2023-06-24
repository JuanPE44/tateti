
export type IdCell = `${string}-${string}`
export type CellBoard = {el: HTMLDivElement, inner: "" | "X" | "O"} 
export type RowArray = [CellBoard,CellBoard,CellBoard] | []
export type BoardArray = [RowArray,RowArray,RowArray] | []
export type PlayerInfo = {
  color: `#${string}`
  type: "X" | "O"
  isTurn?: boolean
}
export type PossibleWin = `${string} ${string} ${string}`[]
export type cordinates = {x: number, y: number}