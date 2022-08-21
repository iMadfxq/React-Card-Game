import './NewGameButton.styles.scss'

export default function NewGameButton({newGameStarter}) {
  return <button className="game__NewGameButton" onClick={newGameStarter}>New game</button>;
}
