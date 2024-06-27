import '../TodoStyles.css';

function Upcoming({ upcomingTodos }) {
  //TODO - Complete BTN toggle fetch request
  
  return (
    <>
      <button id="new-todo-btn">+ New Todo</button>
     {
        upcomingTodos.map((todo) => (
            <div class="todo_box" key={todo.id}>
                <section id="title-description">
                <h1 id="todo-title">{todo.title}</h1>
                <h3 id="todo-deats">Details: {todo.description}</h3>
                </section>

                <section id="due-and-check">
                  <div id="due-date-box">
                    <h2>DUE</h2>
                    <p>{todo.dateDue}</p>
                  </div>
                  <div>
                    <button>o</button>
                  </div>
                </section>
                
            </div>
        ))
     }
    </>
  )
}

export default Upcoming
