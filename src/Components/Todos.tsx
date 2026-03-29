import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

const Todos = () => {
  const addTodoRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<string[]>([]);

  const handleAddTodo = () => {
    const value = addTodoRef.current?.value;

    if (!value) return;

    // update UI
    setTodos((prev) => [...prev, value]);

    // clear input
    if (addTodoRef.current) {
      addTodoRef.current.value = "";
    }
  };

  return (
    <div className="text-white">
      <h4>Add / Manage Todos</h4>

      <div className="d-flex my-2">
        <Form.Control
          ref={addTodoRef}
          className="w-100"
          placeholder="Enter todo"
        />
        <Button className="mx-2 w-100" onClick={handleAddTodo}>
          Add Todo
        </Button>
      </div>

      {/* UI rendering */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;