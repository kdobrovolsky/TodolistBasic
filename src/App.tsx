import './App.css'
import { Task, TodoListItem } from './components/TodoListItem'

function App() {
  const tasks: Task[] = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
  ]
  return (
      <div className="app">
        <TodoListItem title={'TodoList'} tasks={tasks}/>
      </div>
  )
}

export default App
