import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './component/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home'
import DummyCode from './component/DummyCode'
import PasswordGenerator from './component/PasswordGenrator'
import RandomJoke from './component/RandomJoke'
import RandomStory from './component/RandomStory'
import Aboutus from './component/Aboutus'
import History from './component/History'
import Register from './component/Register'
import Login from './component/Login'
import Genratetext from './Genratetext'
import LoremIpsumGenrator from './component/LoremIpsumGenrator'
import TextConverter from './component/TextConvertor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Header/>
     <Routes>
     <Route path="/" element={ <Home/>} />
     <Route path="/text-converter" element={ <TextConverter/>} />
     <Route path="/lorem-ipsum-generator" element={ <LoremIpsumGenrator/>} />
     <Route path="/generate-text" element={ <Genratetext/>} />
     <Route path="/login" element={ <Login/>} />
     <Route path="/register" element={ <Register/>} />
     <Route path="/history" element={ <History/>} />
     <Route path="/about" element={ <Aboutus/>} />
     <Route path="/random-joke" element={ <RandomJoke/>} />
     <Route path="/random-story" element={ <RandomStory/>} />
     <Route path="/dummy-code" element={ <DummyCode/>} />
     <Route path="/password-generator" element={ <PasswordGenerator/>} />
     </Routes>
     </Router>

    </>
  )
}

export default App
