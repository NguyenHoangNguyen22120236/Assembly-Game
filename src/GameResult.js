export default function GameResult(props){
    const info ={
      title: props.gameWon ? "You win!" : "Game Over",
      message: props.gameWon ? "Well done! 🎉" : `You lose! Better start learning Assembly 😭`,
      backgroundColor: props.gameWon ? "#10A95B" : "#BA2A2A",
    }

    return (
      <div className='game-result' style={{backgroundColor: info.backgroundColor}}>
        <h2>{info.title}</h2>
        <p>{info.message}</p>
      </div>
    )
  }