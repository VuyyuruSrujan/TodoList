import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './TodoList.css';
import axios from 'axios';

export default function TodoList() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const [myTasks , setmyTasks] = useState([]);

  useEffect(() =>{
    var check = localStorage.getItem("authToken");
    if(!check){
        navigate("/login");
    }else{
        console.log("user exist");
    };
  });

    useEffect(() =>{
    fetchtasks();  
    },[])

    async function fetchtasks(){
        try {
            var mail = localStorage.getItem("mail");
            var tasks = await fetch(`http://localhost:5001/my_tasks/${mail}`);
            // console.log("tasks:",tasks);
            if(tasks.status == 200){
                const data = await tasks.json()
                console.log("tasks:",data.data)
                setmyTasks(data.data);
                console.log("myTasks",myTasks)
            }else{
              console.log(tasks.status);
            }
        } catch (error) {
            console.log("error:",error);
        }
    };
    useEffect(() => {
      console.log("Updated myTasks:", myTasks);
  }, [myTasks]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate) {
      toast.error('Please fill in all fields!');
      return;
    }

    if (editingId) {
      try {
        const result = await axios.post("http://localhost:5001/update_todo", {
          todo_id: editingId,
          title,
          description,
          dueDate,
        });
  
        if (result.status === 200) {
          toast.success(result.data.message);
          await fetchtasks(); // Refresh tasks
        } else {
          toast.error("Failed to update the task.");
        }
      } catch (error) {
        console.error("Error updating task:", error);
        toast.warning(error.response?.data?.message || "An error occurred.");
      }
    } else {
        try {
            var mail = localStorage.getItem("mail");
            var result = await axios.post("http://localhost:5001/todolist",{
             mail ,
             title , 
             description ,
             dueDate
            })
            if(result.status == 200){
                console.log(result.data);
                toast.success(result.data.message);
                await fetchtasks();
            }
        } catch (error) {
            toast.warning(error);
            console.log("error",error);
        }
    }

    setTitle('');
    setDescription('');
    setDueDate('');
    setEditingId(null);
  };

  async function handleEdit(todo_id){
    const taskToEdit = myTasks.find((task) => task.todo_id === todo_id);
    if (taskToEdit) {
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setDueDate(taskToEdit.dueDate);
    setEditingId(todo_id);
    } else {
      toast.warning("Task not found!");
    }
  };

  async function handleDelete(todo_id){
    // try {
      var deleted = await axios.post("http://localhost:5001/delete_task", {todo_id});
      if(deleted){
        if(deleted.status == 200){
          toast.success(deleted.data.message);
          console.log(deleted.data.message);
          await fetchtasks();
        }else if(deleted.status == 400){
          toast.warning(deleted.data.message);
          console.log(deleted.data.message);
        }else if(deleted.status == 500){
          toast.warning(deleted.data.message);
          console.log(deleted.data.message);
        };
      }
  };

  async function toggleComplete(todo_id){
    try {
      if (!todo_id) {
        toast.warning('Task ID is missing!',todo_id);
      }  
      var task_status =await axios.post('http://localhost:5001/update_status', {todo_id});
      console.log("status:",task_status);
      if(task_status){
        if(task_status.status == 200){
          console.log( task_status.data.message);
          toast.success(task_status.data.message);
          await fetchtasks();
        }else if(task_status.status == 500){
          console.log(task_status.data.message);
          toast.warning(task_status.data.message)
        }
      }
    } catch (error) {
      console.log("error:",error);
      toast.warning(error.response?.data.message);
    }
  };

  const handleSignOut = () => {
    navigate('/login', {replace:true});
    localStorage.removeItem("authToken");
    localStorage.removeItem("mail");
    toast.info('logged out successfully!');
  };

  const convertToIST = (isoDate) => {
    const date = new Date(isoDate); 
    return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
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
        {myTasks.length === 0 ? (
          <div className="no-todos">
            <h2>No tasks yet! Add your first task above. 🚀</h2>
          </div>
        ) : (
            myTasks.map(todo => (
            <div 
              key={todo.todo_id} 
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <div className="todo-content">
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <div className="todo-meta">
                  <span className="due-date">
                    <p>{convertToIST(todo.dueDate)}</p>
                  </span>
                  <span className="created-at">
                    <p>{convertToIST(todo.currentTime)}</p>
                  </span>
                </div>
              </div>
              <div className="todo-actions">
                <button 
                  onClick={() => toggleComplete((todo.todo_id))}
                  className={`status-btn ${todo.todo_status ? true : false}`}
                >
                  {/* {todo.todo_status ? <FaTimes /> : <FaCheck />} */}
                  {todo.todo_status ? "completed" : "not yet completed"}
                </button>
                <button 
                  onClick={() => handleEdit((todo.todo_id))}
                  className="edit-btn"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => handleDelete((todo.todo_id))}
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