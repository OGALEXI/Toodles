import { useState } from 'react';
import '../TodoStyles.css';
import checkFill from '../../../assets/check-circle-fill-svgrepo-com.svg';
import checkEmpty from '../../../assets/check-circle-svgrepo-com.svg';

function Upcoming({ upcomingTodos, refreshTodos }) {
  //Format date
  const formatDate = (date) => {
    date = new Date(date)
    const options = { month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
  }
  //TODO - Complete BTN toggle fetch request
  const complete = async (todoId) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/toggle-complete/${todoId}`);
      if (res.status !== 200) {
        const data = await res.json();
        alert(data.message);
      } else {
        refreshTodos();
      }
    } catch (e) {
      console.log('An error occurred.')
    }
  }

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
          todo.dateDue = formatDate(todo.dateDue).split(' ');
          console.log(todo.dateDue)
          return (
            <div className="todo_box" key={todo.id}>
                <section id="title-description">
                <h1 id="todo-title">{todo.title}</h1>
                <h3 id="todo-deats">Details: {todo.description}</h3>
                </section>

                <section id="due-and-check">
                  <div id="due-date-box">
                    <h2>DUE</h2>
                    <p>{todo.dateDue[0].slice(0,3)} {todo.dateDue[1]}</p>
                  </div>
                  <div id="complete-btn-up">
                    <img id="complete-img" src={checkEmpty} width='34' height='34' onMouseEnter={(e) => hover(e)} onMouseLeave={(e) => unhover(e)} onClick={() => complete(todo.id)}/>
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
