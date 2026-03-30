import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  completedTodo,
  deleteTodo,
  updateTodo,
  type Todo,
} from "../Features/todoSlice";

const Todos = () => {
  const addTodoRef = useRef<HTMLInputElement>(null);
  // const [todos, setTodos] = useState<string[]>([]);

  const loginUser = useSelector(
    (state: { logindata: { username: string } }) => state?.logindata?.username,
  );

  const todos = useSelector(
    (state: { tododata: { todos: Todo[] } }) => state.tododata.todos,
  );

  console.log("todos1 >>", todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    const value = addTodoRef.current?.value;

    if (!value) return;

    dispatch(addTodo({ text: value, username: loginUser }));

    // setTodos((prev) => [...prev, value]);

    // clear input
    if (addTodoRef.current) {
      addTodoRef.current.value = "";
    }
  };

  return (
    <div className="bg-black p-4 rounded shadow-lg h-100 d-flex flex-column">
      <h4 className="text-warning mb-3">Add / Manage Todos</h4>

      <div className="d-flex gap-2 mb-3">
        <Form.Control
          ref={addTodoRef}
          placeholder="Enter todo..."
          className="bg-dark text-light border-secondary"
        />

        <Button variant="warning" onClick={handleAddTodo}>
          Add
        </Button>
      </div>

      <ul className="list-group" style={{maxHeight: "300px", overflowY:"auto"}}>
        {todos
          .filter((todo) => todo.username === loginUser)
          .map((todo) => (
            <li
              key={todo.id}
              className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light border-secondary"
            >
              <div className="d-flex align-items-center gap-2">
                <Form.Check 
                  id={todo.id}
                  type="checkbox" 
                  checked= {todo.isTodoCompleted}
                  onChange={() => 
                    dispatch(completedTodo({id: todo.id, username: loginUser}))
                  }
                />
                <span className={todo.isTodoCompleted ? "text-decoration-line-through": ""}>{todo.text}</span>
              </div>

              <div>
                <Button
                  size="sm"
                  variant="warning"
                  className="mx-2"
                  onClick={() => {
                    const newText = prompt("Update todo:", todo.text);
                    if (newText) {
                      dispatch(
                        updateTodo({
                          id: todo.id,
                          text: newText,
                          username: loginUser
                        }),
                      );
                    }
                  }}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() =>
                    dispatch(
                      deleteTodo({
                        id: todo.id,
                        username: loginUser,
                      }),
                    )
                  }
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todos;
