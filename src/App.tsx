import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Components/Layout';
import Todos from './Components/Todos';
import SignUp from './Components/SignUp';
import Login from './Components/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Layout /> }>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path='signUp' element = {<SignUp />}/>
          <Route path='login' element={<Login />} />
          <Route path='todos' element = {<Todos />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
