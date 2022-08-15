import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card/card.component";

let CARDS = [
  { content: "🔥", title: 'El fueguito' },
  { content: "👍🏼", title: 'El todobien'  },
  { content: "💯", title: 'El melo'  },
  { content: "💰", title: 'El bichote'  },
  { content: "⏳", title: 'El time'  },
  { content: "😈", title: 'El prendido'  },
];

//Add property to check they are not clicking the same card

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

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const handleChoice = (card) => {

    if (!choiceOne) {
      setChoiceOne(card.content);
    } else if (!choiceTwo && card) {
      setChoiceTwo(card.content);
    }
  };

  const plusTurn = () => {
    setTurns((turns) => turns + 1);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  useEffect(() => {
    cardShuffler();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne === choiceTwo) {
        alert("Match");
        plusTurn();
      } else {
        alert("No Match");
        plusTurn();
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div>
      {cards.map((card) => {
        return <Card key={card.id} card={card} choiceHandler={handleChoice} />
      })}
      <p>{turns}</p>
      <button onClick={cardShuffler}>New game</button>
    </div>
  );
}

export default App;
