import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './view/homepage/Homepage';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Sign from './view/sign/sign';
import User from './view/user/user'
import ErrorPage from './view/errorPage/errorPage';
import './app.scss';


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Sign/>}/>
        <Route path='/profile' element={<User/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
