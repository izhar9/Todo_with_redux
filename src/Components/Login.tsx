// Components/Login.tsx
import { useForm } from "react-hook-form";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { type user } from "../Features/signUpSlice";
import { addLoginUser } from "../Features/loginSlice";

type LoginFormData = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const users = useSelector(
    (state: { signUpdata: { users: user[] } }) => state.signUpdata.users,
  );
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormData) => {
    const userExists = users.some(
      (user) => 
        user.username.toLowerCase() === data.username.toLowerCase() &&
        user.password === data.password // Note: In production, you should hash passwords!
    );

    if (userExists) {
        dispatch(addLoginUser(data.username))
        navigate("/todos");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Container className="p-4 bg-black rounded shadow-lg">
      <h3 className="text-center text-warning mb-4">Login</h3>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            {...register("username", { required: "Username is required" })}
            placeholder="Enter Username"
            className="bg-dark text-light border-secondary"
          />
          {errors.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Enter Password"
            className="bg-dark text-light border-secondary"
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </Form.Group>

        <Button
          type="submit"
          className="w-100 mt-3 fw-bold"
          variant="warning"
          disabled={isSubmitting}
        >
          Login
        </Button>
      </Form>
      <h6 className="my-2 text-center">Don't have an account? <Link to="/signUp">Signup</Link></h6>
    </Container>
  );
};

export default Login;