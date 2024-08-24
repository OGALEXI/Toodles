import { useState } from 'react';
import '../TodoStyles.css';
import trashEmpty from '../../../assets/trash-bin-trash-svgrepo-com.svg';
import trashFill from '../../../assets/trash-bin-trash-fill-svgrepo-com.svg';


function Completed({ completedTodos }) {
    //Format date
    const formatDate = (date) => {
      date = new Date(date)
      const options = { month: 'long', day: 'numeric' };
      const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
      return formattedDate;
    }
    //TODO DELETE FETCH REQUEST

    function hover(e) {
      e.target.src = trashFill;
    }

    function unhover(e) {
      e.target.src = trashEmpty;
    }

    return (
      <div id="todo-holder">
       {
        completedTodos.map((todo) => {
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
                    <img id="complete-img" src={trashEmpty} width='34' height='34' onMouseEnter={(e) => hover(e)} onMouseLeave={(e) => unhover(e)}/>
                    <span id="compl-tooltip">Delete Todo</span>
                  </div>
                </section>
                {/* DELETE BTN */}
            </div>
        )
        })
     }
      </div>
    )
  }
  
  export default Completed
  