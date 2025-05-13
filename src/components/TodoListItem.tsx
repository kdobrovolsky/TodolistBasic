export type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  title: string;
  tasks: Task[];
};

export const TodoListItem = ({ title, tasks }: TodoListPropsType) => {
return( <>
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      {tasks.length === 0?(
        <p>No tasks</p>
        ):(
        <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.isDone} /> <span>{task.title}</span>
          </li>
        ))}
      </ul>
    )}
     
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  </>
  )
};
