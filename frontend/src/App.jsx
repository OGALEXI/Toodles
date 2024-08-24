import { useEffect, useState } from 'react';
import './App.css';
import UserOptions from './components/UserOptions/UserOptions';
import HomePage from './components/HomePage/HomePage';
import CreateTodo from './components/HomePage/CreateTodo/CreateTodo';
import DeleteModal from './components/HomePage/DeleteModal/DeleteModal';

function App() {
  //Modals
  const [isNewModalOpen, setNewModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [upcomingTodos, setUpcomingTodos] = useState([]);
  const [currTodo, setCurrTodo] = useState({});

  const openNewModal = () => {
    if (isNewModalOpen) return;
    setNewModalOpen(true);
  }

  const openDeleteModal = (todo) => {
    if (isDeleteModalOpen) return;
    setCurrTodo(todo);
    setDeleteModalOpen(true);
  }
  
   //GET UPCOMING TODOS
   const fetchUpcoming = async () => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/upcoming/${currUser.id}`);
        const data = await res.json();
        setUpcomingTodos(data);
    } catch (e) {
        console.log("An error occurred.", e)
    }
   }

  //GET COMPLETED TODOS
  const fetchCompleted = async () => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/completed/${currUser.id}`);
        const data = await res.json();
        setCompletedTodos(data);
    } catch (e) {
        console.log("An error occurred.", e)
    }
  }

  const closeNewModal = () => {
    setNewModalOpen(false);
    fetchUpcoming();
  }

  const closeDeleteModal = () => {
    setCurrTodo({});
    setDeleteModalOpen(false);
    fetchCompleted();
  }

  const refreshTodos = () => {
    fetchUpcoming()
    fetchCompleted()
  }

  useEffect(() => {
    fetchUpcoming()
    fetchCompleted()
  }, [])


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
          <>
          {
            isNewModalOpen && (
              <div className='modal' onClick={closeNewModal}>
                <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                  <span className='close' onClick={closeNewModal}>&times;</span>
                  <CreateTodo userId={currUser.id} closeNewModal={closeNewModal}/>
                </div>
              </div>
            )
          }
          {
            isDeleteModalOpen && (
              <div className='modal' onClick={closeDeleteModal}>
                <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                  <span className='close' onClick={closeDeleteModal}>&times;</span>
                  <DeleteModal currTodo={currTodo} closeDeleteModal={closeDeleteModal}/>
                </div>
              </div>
            )
          }
          <HomePage currUser={currUser} afterLogout={afterLogout} openNewModal={openNewModal} completedTodos={completedTodos} upcomingTodos={upcomingTodos} refreshTodos={refreshTodos} openDeleteModal={openDeleteModal}/>
          </>
        ) : (
          <UserOptions afterLogin={afterLogin}/>
        )
      }
    </>
  )
}

export default App
