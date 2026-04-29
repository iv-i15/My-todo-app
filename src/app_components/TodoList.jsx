import TodoItem from "./TodoItem";

function TodoList({
todos,
selectedUser,
sortOrder,
showCompleted,
onToggle,
onDelete,
sortCompletedBy
}){
    const visibleTodos = [...todos]
        .filter((todo)=>
          todo.completed === showCompleted &&
          (selectedUser ==="all" || todo.userId === Number(selectedUser))
        )
        .sort((a,b) => {
          if (showCompleted && sortCompletedBy === "date") {
            return new Date(b.completedAt || 0) - new Date(a.completedAt || 0);
          }
          if (sortOrder === "asc"){
            return a.text.localeCompare(b.text);
          } else{
            return b.text.localeCompare(a.text);
          }
        })
    return(
        <ul>
            {visibleTodos.map(todo => (
                <TodoItem 
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    )
}

export default TodoList;