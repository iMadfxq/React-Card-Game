import { useEffect, useState } from "react";
import "./App.css";

let CARDS = [
  { content: "🔥" },
  { content: "👍🏼" },
  { content: "💯" },
  { content: "💰" },
  { content: "⏳" },
  { content: "🚲" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0)

  const cardShuffler = () => {
    let shuffledCards = [...CARDS, ...CARDS]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);

    setTurns(0)
  };

  const plusTurn = () => {
    setTurns((turns) => 
      turns + 1
    )
  }

  useEffect(() => {
    cardShuffler();
  }, []);

  return (
    <div>
      {cards.map((card) => {
      return (
      <div key={card.id} onClick={plusTurn} >{card.content}</div>
      )
    })}
    <p>{turns}</p>
    <button onClick={cardShuffler}>New game</button>
    </div>
  );
}

export default App;
