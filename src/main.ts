import './style.css'
import { Board } from './Board'

const b = new Board()
const board = b.element

const app = document.querySelector<HTMLDivElement>('#app')
app?.appendChild(board)
