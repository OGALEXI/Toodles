import { useState } from 'react'
import './HomePage.css'

function HomePage({ currUser, afterLogout }) {
  const [currTab, setCurrTab] = useState('upcoming');

  //GET COMPLETED TODOS
  //GET UPCOMING TODOS
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
                    <h1>Upcominggg</h1>
                ) : (
                    <h1>Completeddd</h1>
                )
            }
        </section>
      </div>
    </>
  )
}

export default HomePage
