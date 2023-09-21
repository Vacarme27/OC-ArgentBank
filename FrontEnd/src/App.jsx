import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './view/homepage/Homepage';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import SignIN from './view/sign-in/sign-in';
import User from './view/user/user'
import './app.scss';


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/sign-in' element={<SignIN/>}/>
        <Route path='/user' element={<User/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
