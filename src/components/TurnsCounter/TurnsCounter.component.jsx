import './TurnsCounter.styles.scss'

export default function TurnCounter({turns}) {
  return <p className="game__TurnCounter">Total turns: {turns}</p>
}