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
  const [turns, setTurns] = useState(0);

  const cardShuffler = () => {
    let shuffledCards = [...CARDS, ...CARDS]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);

    setTurns(0);
  };

  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const handleClick = (e) => {
    plusTurn()

    console.dir(e.target)

    if(!choiceOne) {
      setChoiceOne(e.target.innerText)
    } else if(!choiceTwo) {
      setChoiceTwo(e.target.innerText)

    }
  }

  const plusTurn = () => {
    setTurns((turns) => turns + 1);
  };

  useEffect(() => {
    cardShuffler();
  }, []);

  useEffect(() => {
    if(choiceOne && choiceOne === choiceTwo) {
      alert('Match')
      setChoiceOne(null)
      setChoiceTwo(null)
    } else {
      alert('No Match')
      setChoiceOne(null)
      setChoiceTwo(null)
    }
  }, [choiceTwo])

  return (
    <div>
      {cards.map((card) => {
        return (
          <div key={card.id} onClick={handleClick}>
            {card.content}
          </div>
        );
      })}
      <p>{turns}</p>
      <button onClick={cardShuffler}>New game</button>
    </div>
  );
}

export default App;
