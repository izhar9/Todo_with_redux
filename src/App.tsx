import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import Layout from './Components/Layout';
import Todos from './Components/Todos';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Layout /> }>
          <Route path='login' element = {<Login />}/>
          <Route path='todos' element = {<Todos />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
