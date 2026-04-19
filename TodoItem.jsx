function TodoItem({todo, onToggle, onDelete}){
    return(
        <li>
            <div className="todo_left">
                <input 
                    type="checkbox" 
                    checked={todo.completed}
                    onChange={()=>{
                        onToggle(todo.id)
                    }}
                />

                {todo.text}

                {todo.completed && todo.completedAt && (
                <small>
                    {" "}
                    ({new Date(todo.completedAt).toLocaleString()})            </small>
                )}

                <button onClick={() => {
                    onDelete(todo.id)
                }}
                >Delete</button>
            </div>

        </li>
    )
}

export default TodoItem;