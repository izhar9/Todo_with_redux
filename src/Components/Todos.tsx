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
    <div className="bg-black p-4 rounded shadow-lg">
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

      <ul className="list-group">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light border-secondary"
          >
            {todo}

            <Button
              size="sm"
              variant="danger"
              onClick={() =>
                setTodos((prev) => prev.filter((_, i) => i !== index))
              }
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
