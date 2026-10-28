function App() {
  const [todos, setTodos] = React.useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'webdev project with html, css and js', completed: false }
    ];
  });

  const [inputText, setInputText] = React.useState('');

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setTodos([...todos, { id: Date.now(), text: inputText, completed: false }]);
    setInputText('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <React.Fragment>
      <h1>To Do App</h1>
      <div className="wrapper">
        <form onSubmit={addTodo}>
          <input 
            id="todo-input" 
            placeholder="Add a new task" 
            autoComplete="off"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          /> 
          <button id="add-button" type="submit">Add</button>
        </form>

        <ul id="todo-list">
          {todos.map(todo => (
            <li className={`todo ${todo.completed ? 'completed' : ''}`} key={todo.id}>
              <input 
                type="checkbox" 
                id={`todo-${todo.id}`} 
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <label className="custom-checkbox" htmlFor={`todo-${todo.id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                  <path d="M382-320 155-547l57-57 170 170 366-366 57 57-423 423ZM200-160v-80h560v80H200Z"/>
                </svg>
              </label>
              <label htmlFor={`todo-${todo.id}`} className="todo-text">
                {todo.text}
              </label>
              <button className="delete-button" onClick={() => deleteTodo(todo.id)} type="button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}

// Рендерим приложение в HTML
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);