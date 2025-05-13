import { Button } from "./Button";

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
        <Button title={"+"}/>
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
      <Button title={"All"}/>
      <Button title={"Active"}/>
      <Button title={"Completed"}/>
      </div>
    </div>
  </>
  )
};
