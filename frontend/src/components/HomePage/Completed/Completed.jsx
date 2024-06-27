import '../TodoStyles.css'

function Completed({ completedTodos }) {
    //TODO DELETE FETCH REQUEST
    return (
      <>
       {
        completedTodos.map((todo) => (
            <div class="todo_box" key={todo.id}>
                <h1>{todo.title}</h1>
                <h3>{todo.description}</h3>
                {/* DELETE BTN */}
            </div>
        ))
     }
      </>
    )
  }
  
  export default Completed
  