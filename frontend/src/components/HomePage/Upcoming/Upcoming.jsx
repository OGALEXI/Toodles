

function Upcoming({ upcomingTodos }) {
  console.log(upcomingTodos)
  return (
    <>
     {
        upcomingTodos.forEach((todo) => (
            <div key={todo.id}>
                <h1>{todo.title}</h1>
            </div>
        ))
     }
    </>
  )
}

export default Upcoming
