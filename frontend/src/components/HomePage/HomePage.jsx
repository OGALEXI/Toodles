import { useEffect, useState } from 'react'
import './HomePage.css'
import Completed from './Completed/Completed';
import Upcoming from './Upcoming/Upcoming';


function HomePage({ currUser, afterLogout }) {
  const [currTab, setCurrTab] = useState('upcoming');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [upcomingTodos, setUpcomingTodos] = useState([]);
  

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

  useEffect(() => {
    fetchUpcoming()
    fetchCompleted()
  }, [])

  return (
    <>
      {
        //CREATE NEW TODO MODAL
      }
      <div id="hp-main">
        <section id="homepage-header">
            <h1>Welcome, {currUser.firstName}</h1>
            <button id="logout_btn" onClick={afterLogout}>Log Out</button>
        </section>
        {/* NEW TODO BUTTON */}
        <section id="todo-section">
            <div>
                <button className="todo-tabs" onClick={() => setCurrTab('upcoming')}>Upcoming</button>
                <button className="todo-tabs" onClick={() => setCurrTab('completed')}>Completed</button>
            </div>
            {
                currTab == 'upcoming' ? (
                    <Upcoming upcomingTodos={upcomingTodos}/>
                ) : (
                    <Completed completedTodos={completedTodos} />
                )
            }
        </section>
      </div>
    </>
  )
}

export default HomePage
