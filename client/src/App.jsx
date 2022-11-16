import { useEffect } from 'react'
import { useState } from 'react'
import { InputTodo } from './components/InputTodo'
import "./style.css"
import "bootstrap/dist/css/bootstrap.min.css"



function App() {

  const [text, setText] = useState("")



  const onSubmitForm = async(e) => {
    e.preventDefault()
      try {

        const body = {description: text}
        const res = await fetch('http://localhost:5500/', {
          method: "POST",
          headers: {
            "Content-Type":"application/json",
          },
          body: JSON.stringify(body)
        })

        window.location.assign('/')

        console.log(res)

      } catch (error) {
        console.log(error.message)
      }

  }




  return (
    <div className="containers" >
    <form onSubmit={onSubmitForm}>
       <InputTodo text={text} setText={setText}/>
    </form>
    </div>
  )
}

export default App
