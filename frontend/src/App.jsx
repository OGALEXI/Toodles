import { useState } from 'react';
import './App.css';
import UserOptions from './components/UserOptions/UserOptions';
import HomePage from './components/HomePage/HomePage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currUser, setCurrUser] = useState({});

  const afterLogin = (user) => {
    setCurrUser(user);
  }

  return (
    <>
      {
        loggedIn ? (
          <HomePage currUser={currUser} />
        ) : (
          <UserOptions afterLogin={afterLogin}/>
        )
      }
    </>
  )
}

export default App
