// Librairies
import React, { useState, useRef, useEffect} from 'react';
import classes from './App.module.css';
import Task from '../../Components/Task/Task'
import axios from '../../axios-firebase';


function App() {
  // States
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState([]);

  //REF
  const inputRef = useRef('');

  //Cycle de vie
  useEffect(() => {
    inputRef.current.focus();

    // Axios
    axios.get('/taches.json')
    .then(response => {
      // console.log(response);
      const tasksArray = [];
      for (const key in response.data) {
        tasksArray.push({
          ...response.data[key],
          id: key
        });
      }
      setTasks(tasksArray);
    })
    .catch(error => {
      console.log(error);
    });
  },[]);

  // Méthode ou Fonctions
    const removeClikedHandler = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);

    // Axios
    axios.delete('/taches/' + tasks[index].id + '.json')
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const doneClikedHandler = index => {
    const newTasks = [...tasks];
    newTasks[index].done = !tasks[index].done;
    setTasks(newTasks);

    // Axios
    axios.put('./taches/' + tasks[index].id + '.json', tasks[index])
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const submittedTaskeHandler = event => {
    event.preventDefault();

    const newTask = {
      content: input,
      done: false
    }
    setTasks([...tasks, newTask])
    setInput('');

    // axios
    axios.post('/taches.json', newTask)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const changedFormHandler = event => {
    setInput(event.target.value);
  }
  // VAriables
  let TasksDisplayed = tasks.map((task, index) => (
    <Task 
      done={task.done}
      content ={task.content}
      key={index}
      removeCliked={() => removeClikedHandler(index)}
      doneCliked={() => doneClikedHandler(index)}
    />
  ));
  // let donedTasks = tasks.filter(task => task.done)
  //     .map(( filteredTask ,index) => (
  //       <Task 
  //         done={filteredTask.done}
  //         content ={filteredTask.content}
  //         key={index}
  //         removeCliked={() => removeClikedHandler(index)}
  //         doneCliked={() => doneClikedHandler(index)}
  //       />
  //     ));
  return (
    <div className={classes.App}>
      <header>
        <span>TO-DO</span>
      </header>

      <div className={classes.add}>
        <form onSubmit={(e) => submittedTaskeHandler(e)}>
          <input type="text"
           value={input} 
           ref={inputRef}
           onChange={(e) => changedFormHandler(e)}
           placeholder="Que souhaitez-vous ajouter ?" />
          <button type="submit">
            Ajouter
          </button>
        </form>
      </div>
      {TasksDisplayed}
      {/* {donedTasks} */}

    </div>
  );
}

export default App;
