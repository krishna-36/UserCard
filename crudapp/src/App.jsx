import React from 'react'
import {Route, Routes, BrowserRouter} from "react-router-dom"
import Edit from './components/Edit'
import Create from './components/Create'
import Home from './components/Home'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer autoClose={5000}/>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/edit/:userid' element={<Edit></Edit>}></Route>
          <Route path='/create' element={<Create></Create>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App