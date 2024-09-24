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
      <BasicExample/>
      <p>Separacion</p>
      {/* <Table2/> */}
      <p>Separacion</p>
      <Tabla/>
    </>
  )
}

export default App
