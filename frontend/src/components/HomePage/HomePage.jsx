import { useEffect, useState } from 'react'
import './HomePage.css'
import Completed from './Completed/Completed';
import Upcoming from './Upcoming/Upcoming';


function HomePage({ currUser, afterLogout, openNewModal, upcomingTodos, completedTodos, refreshTodos }) {
  const [currTab, setCurrTab] = useState('upcoming');
  
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
            <button id="new-todo-btn" onClick={() => openNewModal()}>+ New Todo</button>
            {
                currTab == 'upcoming' ? (
                    <Upcoming upcomingTodos={upcomingTodos} refreshTodos={refreshTodos}/>
                ) : (
                    <Completed completedTodos={completedTodos} refreshTodos={refreshTodos}/>
                )
            }
        </section>
      </div>
    </>
  )
}

export default HomePage
