import { useState } from 'react';
import '../TodoStyles.css';
import trashEmpty from '../../../assets/trash-bin-trash-svgrepo-com.svg';
import trashFill from '../../../assets/trash-bin-trash-fill-svgrepo-com.svg';
import checkFill from '../../../assets/check-circle-fill-svgrepo-com.svg';
import checkEmpty from '../../../assets/check-circle-svgrepo-com.svg';


function Completed({ completedTodos, refreshTodos, openDeleteModal, currUser }) {
    //Format date
    const formatDate = (date) => {
      date = new Date(date)
      const options = { month: 'long', day: 'numeric' };
      const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
      return formattedDate;
    }
    //TODO DELETE FETCH REQUEST
    const unComplete = async (todoId) => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/delete-all/${currUser.id}`, { method: "DELETE" });
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

    const deleteAll = async () => {
      try {
          const res = await fetch(`http://127.0.0.1:8000/delete-all/${currUser.id}`, {method: "DELETE"});
          if (res.status !== 200) {
          const data = await res.json();
          alert(data.message);
        } else {
          refreshTodos();
        }
    } catch (e) {
        console.log("beep")
    }
    }

    function hover(e) {
      e.target.src = trashFill;
    }

    function unhover(e) {
      e.target.src = trashEmpty;
    }

    function hover2(e) {
      e.target.src = checkEmpty;
    }
  
    function unhover2(e) {
      e.target.src = checkFill;
    }

    return (
      <div id="todo-holder">
        <div id="delete-all-btn">
          <button onClick={deleteAll}>Delete All</button>
        </div>
        {
          !completedTodos.length && (
            <div id="no-complete">You have no completed todos.</div>
          )
        }
       {
        completedTodos.map((todo) => {
          todo.dateDue = formatDate(todo.dateDue).split(' ')
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
                  <section>
                  <div id="complete-btn-up">
                    <img id="complete-img" src={trashEmpty} width='34' height='34' onMouseEnter={(e) => hover(e)} onMouseLeave={(e) => unhover(e)} onClick={() => openDeleteModal(todo)}/>
                    <span id="compl-tooltip">Delete Todo</span>
                  </div>
                  <div id="complete-btn-up">
                    <img id="complete-img" src={checkFill} width='34' height='34' onMouseEnter={(e) => hover2(e)} onMouseLeave={(e) => unhover2(e)} onClick={() => unComplete(todo.id)}/>
                    <span id="compl-tooltip">Undo Complete</span>
                  </div>
                  </section>
                </section>
            </div>
        )
        })
     }
      </div>
    )
  }
  
  export default Completed
  