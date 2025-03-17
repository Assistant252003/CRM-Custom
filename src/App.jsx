import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import form from './components/NameForm'
import FormBuilder from './components/FormBuilder'
import NameForm from './components/NameForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <NameForm/> */}
      <FormBuilder/>
      {/* <FormBuilder /> */}
      <form/>
    </div>
  )
}

export default App
