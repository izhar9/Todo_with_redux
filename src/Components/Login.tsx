import { useForm } from "react-hook-form";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUser, type user } from "../Features/loginData";
import { useNavigate } from "react-router-dom";

type FormData = {
  name: string;
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const users = useSelector(
    (state: { loginData: { users: user[] } }) => state.loginData.users,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate()

  console.log("userData >>", users);

  const onSubmit = (data: FormData) => {
    const userData = {
      name: data.name,
      username: data.username,
    };
    dispatch(addUser(userData));
    navigate("/todos")
    reset();
  };

  return (
    <Container className="p-4 w-50 border">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            {...register("name", { required: true })}
            placeholder="Enter Name"
          />
          {errors.name && <p className="text-danger">Name is required</p>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            {...register("username", {
              required: "Username is required",
              validate: (value) => {
                const exists = users.some(
                  (user) => user.username.toLowerCase() === value.toLowerCase(),
                );
                if (exists) {
                  return "Username already exists";
                }

                return true;
              },
            })}
            placeholder="Enter Username"
          />
          {errors.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password", { required: true })}
            placeholder="Enter Password"
          />
          {errors.password && (
            <p className="text-danger">Password is required</p>
          )}
        </Form.Group>

        <Button type="submit" className="my-3" disabled={isSubmitting}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
