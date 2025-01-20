import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './TodoList.css';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

//   useEffect(() =>{
//     var check = localStorage.getItem("authToken");
//     if(!check){
//         navigate("/login");
//     }else{
//         console.log("user exist");
//     };
//   });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate) {
      toast.error('Please fill in all fields!');
      return;
    }

    const newTodo = {
      id: Date.now(),
      title,
      description,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString()
    };

    if (editingId) {
      setTodos(todos.map(todo => 
        todo.id === editingId ? { ...todo, title, description, dueDate } : todo
      ));
      toast.success('Todo updated successfully!');
    } else {
      setTodos([newTodo, ...todos]);
      toast.success('Todo added successfully!');
    }

    setTitle('');
    setDescription('');
    setDueDate('');
    setEditingId(null);
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setDueDate(todo.dueDate);
    setEditingId(todo.id);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.success('Todo deleted successfully!');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    toast.info('Todo status updated!');
  };

  const handleSignOut = () => {
    navigate('/login', {replace:true});
    localStorage.removeItem("authToken");
    toast.info('Signed out successfully!');
  };

  return (
    <div className="todo-page">
      <header className="header">
        <div className="header-content">
          <div>
            <h1>✨ Task Master ✨</h1>
            <p>Organize your life, one task at a time</p>
          </div>
          <button onClick={handleSignOut} className="signout-btn">
            <FaSignOutAlt /> Log Out
          </button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          {editingId ? (
            <>
            <button type='submit' className="add-btn"> <FaEdit /> Update Task </button>
            </>
          ) : (
            <>
             <button type='submit' className="add-btn"> <FaPlus /> Add Task </button>
            </>
          )}
        </div>
      </form>

      <div className="todos-container">
        {todos.length === 0 ? (
          <div className="no-todos">
            <h2>No tasks yet! Add your first task above. 🚀</h2>
          </div>
        ) : (
          todos.map(todo => (
            <div 
              key={todo.id} 
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <div className="todo-content">
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <div className="todo-meta">
                  <span className="due-date">
                    {/* Due: {format(new Date(todo.dueDate), 'MMM dd, yyyy')} */}
                  </span>
                  <span className="created-at">
                    {/* Created: {format(new Date(todo.createdAt), 'MMM dd, yyyy')} */}
                  </span>
                </div>
              </div>
              <div className="todo-actions">
                <button 
                  onClick={() => toggleComplete(todo.id)}
                  className={`status-btn ${todo.completed ? 'uncomplete' : ''}`}
                >
                  {todo.completed ? <FaTimes /> : <FaCheck />}
                </button>
                <button 
                  onClick={() => handleEdit(todo)}
                  className="edit-btn"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => handleDelete(todo.id)}
                  className="delete-btn"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}