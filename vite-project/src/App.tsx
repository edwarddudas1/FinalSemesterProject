import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FirstPage from "./components/Home/FirstPage/FirstPage"
import HomePage from "./components/Home/HomePage/HomePage"
import WastePage from './components/Home/WastePage/WastePage';

function App() {

  return (
    <>

    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />}/>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/waste" element={<WastePage />}/>
        <Route path="/home2" element={<HomePage />}/>
      </Routes>
    </Router>

    </>
  )
}

export default App
