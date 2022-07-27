import { useEffect } from 'react';
import './App.css';

let CARDS = [
  {content: '🔥'},
  {content: '👍🏼'},
  {content: '💯'},
  {content: '💰'},
  {content: '⏳'},
  {content: '🚲'},

]


function App() {
  const cardShuffler = () => {
    CARDS = [...CARDS, ...CARDS]
  }
  useEffect(()=>{
    cardShuffler()
    console.log(CARDS)
  }, [])
  return;
}

export default App;
