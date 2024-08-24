import { useState } from 'react';
import '../TodoStyles.css';
import checkFill from '../../../assets/check-circle-fill-svgrepo-com.svg';
import checkEmpty from '../../../assets/check-circle-svgrepo-com.svg';

function Upcoming({ upcomingTodos }) {
  //Format date
  const formatDate = (date) => {
    date = new Date(date)
    const options = { month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
  }
  //TODO - Complete BTN toggle fetch request
  function hover(e) {
    e.target.src = checkFill;
  }

  function unhover(e) {
    e.target.src = checkEmpty;
  }
  
  return (
    <div id="todo-holder">
     {
        upcomingTodos.map((todo) => {
          todo.dateDue = formatDate(todo.dateDue)
          return (
            <div className="todo_box" key={todo.id}>
                <section id="title-description">
                <h1 id="todo-title">{todo.title}</h1>
                <h3 id="todo-deats">Details: {todo.description}</h3>
                </section>

                <section id="due-and-check">
                  <div id="due-date-box">
                    <h2>DUE</h2>
                    <p>{todo.dateDue}</p>
                  </div>
                  <div id="complete-btn-up">
                    <img id="complete-img" src={checkEmpty} width='34' height='34' onMouseEnter={(e) => hover(e)} onMouseLeave={(e) => unhover(e)}/>
                    <span id="compl-tooltip">Complete Todo</span>
                  </div>
                </section>
                
            </div>
        )
        })
     }
    </div>
  )
}

export default Upcoming
