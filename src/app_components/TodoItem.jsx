function TodoItem({todo, onToggle, onDelete}){
    return(
        <li>
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
        </li>
    )
}

export default TodoItem;