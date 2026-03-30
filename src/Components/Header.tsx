import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addLoginUser } from "../Features/login";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const loginUser = useSelector(
    (state: { logindata: { username: string } }) => state?.logindata?.username,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
    dispatch(addLoginUser(""));
  };

  return (
    <Navbar expand="lg" className="bg-black px-3 navbar-dark">
      <Container className="align-items-center justify-content-between">
        <Navbar.Brand className="fw-bold text-warning">TodoApp</Navbar.Brand>
        {loginUser && (
          <Nav>
            <NavDropdown
              title={<span className="text-warning">{loginUser}</span>}
              className="ms-auto"
            >
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
