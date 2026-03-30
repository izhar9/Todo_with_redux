import { useForm } from "react-hook-form";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUser, type user } from "../Features/signUpSlice";
import { Link, useNavigate } from "react-router-dom";

type FormData = {
  name: string;
  username: string;
  password: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const users = useSelector(
    (state: { signUpdata: { users: user[] } }) => state.signUpdata.users,
  );
  console.log("users >>",users)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    dispatch(addUser(data));
    navigate("/login");
    reset();
  };

  return (
    <Container className="p-4 bg-black rounded shadow-lg">
      <h3 className="text-center text-warning mb-4">Sign Up</h3>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            {...register("name", { required: true })}
            placeholder="Enter Name"
            className="bg-dark text-light border-secondary"
          />
          {errors.name && <p className="text-danger">Name is required</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            {...register("username", {
              required: "Username is required",
              validate: (value) => {
                const exists = users.some(
                  (user) => user.username.toLowerCase() === value.toLowerCase(),
                );
                return exists ? "Username already exists" : true;
              },
            })}
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
            {...register("password", { required: true })}
            placeholder="Enter Password"
            className="bg-dark text-light border-secondary"
          />
          {errors.password && (
            <p className="text-danger">Password is required</p>
          )}
        </Form.Group>

        <Button
          type="submit"
          className="w-100 mt-3 fw-bold"
          variant="warning"
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
      </Form>
            <h6 className="my-2 text-center">Already have an account? <Link to="/login">Login</Link></h6>
    </Container>
  );
};

export default SignUp;
