import { useEffect, useState } from 'react'
import './App.css'
import { Square } from './components/Square'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'



function App() {
  const [ board, setBoard ] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(16).fill(null)
  }
  )
  const [ turn, setTurn ] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ??  TURNS.X // ?? mira si lo que tiene a la derecha es null o undefine si es asi pone lo siguiente
  })
  //null es que no hay ganador false es que hay un ganador
  const [winner, SetWinner ] = useState(null)
  
  const resetGame = () => {
    setBoard(Array(16).fill(null))
    setTurn(TURNS.X)
    SetWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    // para no volver a sobreescribir en el square
    if(board[index] || winner) return
    //actualizamos el tablero 
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //actualizamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)
    // guardar el tablero y el turno en local storage
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    //revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      SetWinner(newWinner)
    }else if (checkEndGame(newBoard)){
      SetWinner(false)
    }
  }

  useEffect(()=>{

  },[board])

  return (
    <main className='board'>
        <h1>Cuatro en Linea</h1>
        <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
