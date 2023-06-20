import './style.css'
import { Game } from './Game'

const g = new Game()
const DivBoard = g.board.element
const app = document.querySelector<HTMLDivElement>('#app')
app?.appendChild(DivBoard)
