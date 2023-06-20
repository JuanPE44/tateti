
export type IdCell = `${string}-${string}`
export type CellBoard = "" | "X" | "O"
export type RowArray = [CellBoard,CellBoard,CellBoard] 
export type BoardArray = [RowArray,RowArray,RowArray]
export type PlayerInfo = {
  color: `#${string}`
  type: "X" | "O"
  isTurn?: boolean
}