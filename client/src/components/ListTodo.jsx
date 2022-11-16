import { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table'
import  Button from "react-bootstrap/Button"
import { EditTodo } from "./EditTodo"

export function ListTodo(){

    const [todoList, setTodoList] = useState([])

   useEffect(()=> {

    const fetchit = async() => {
       const res = await fetch('http://localhost:5500/todos')

        const jsonData = await res.json();
        console.log(jsonData)
        setTodoList(jsonData)
    }
    fetchit()

    .catch(err => console.error(err))

   },[])

   const handleDelete = async(id) => {
    const response = await fetch(`http://localhost:5500/${id}`, {
        method: "DELETE",
    })

    const data = await response.json()

    window.location.assign('/')
   }



    return(
        <>
        

       <Table className="mb-5">
        <thead>
            <tr>
                <th>ID</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>

       {todoList.map(todo => (
            <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.description}</td>
                <td><EditTodo {...todo}/></td>
                <td><Button variant="outline-danger" size="sm" onClick={()=>handleDelete(todo.id)}>&times;</Button></td>
            </tr>
       ))}
        </tbody>
       </Table>

       </>
    )
}