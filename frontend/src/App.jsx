import { useEffect, useState } from 'react';
import './App.css';
import UserOptions from './components/UserOptions/UserOptions';
import HomePage from './components/HomePage/HomePage';

function App() {
  //Go into localStorage and see if we're logged in
  const [loggedIn, setLoggedIn] = useState(() => {
    const storedLogin = localStorage.getItem('loggedIn');
    return storedLogin ? JSON.parse(storedLogin) : false;
  });

  //Go into localStorage and see if we're storing a user
  const [currUser, setCurrUser] = useState(() => {
    const storageUser = localStorage.getItem('currUser');
    return storageUser ? JSON.parse(storageUser) : {};
  });

  const afterLogin = (user) => {
    setCurrUser(user);
    setLoggedIn(true);
    localStorage.setItem('currUser', JSON.stringify(currUser));
    localStorage.setItem('loggedIn', JSON.stringify(true));
  }

  const afterLogout = () => {
    setCurrUser({});
    setLoggedIn(false);
    localStorage.setItem('currUser', {});
    localStorage.setItem('loggedIn', JSON.stringify(false));
  }

  //Any time the user changes reflect that change in localStorage
  useEffect(() => {
    localStorage.setItem('currUser', JSON.stringify(currUser));
  }, [currUser])

  //Any time loggedIn state changes reflect it in localstorage
  useEffect(() => {
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  }, [loggedIn])

  return (
    <>
      {
        loggedIn ? (
          <HomePage currUser={currUser} afterLogout={afterLogout} />
        ) : (
          <UserOptions afterLogin={afterLogin}/>
        )
      }
    </>
  )
}

export default App
