import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Tabla from './components/Table'
import Table2 from './components/Table2'
import BasicExample from './components/Basic'

// import './App.css'

function App() {
  return (
    <>
      <p>MI TABLA</p>
      <Tabla/>
      <p>Separacion</p>
      {/* <Table2/> */}
      <p>Separacion</p>
      <BasicExample/>
    </>
  )
}

export default App
