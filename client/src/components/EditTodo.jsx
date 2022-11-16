import { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import  Modal  from "react-bootstrap/Modal";


export function EditTodo({id, description}){

    const [show, setShow] = useState(false)


    const [update, setUpdate] = useState("")

    const hideHandler = () => setShow(false)

    const handleShow =  () => setShow(true)

    const fetchinit = async(id) => {

        const stringified = JSON.stringify({
            description: update
        })

        const response  = await fetch(`http://localhost:5500/${id}`,{
            method: "PUT",
            headers: {
                'Content-Type':'application/json'
            },
            body: stringified
        })
        window.location.assign('/')
    }


    return(
<>
        <Button onClick={handleShow} variant="outline-light" size="sm" >Update</Button>
        <Modal show={show} onHide={hideHandler}>
            <Modal.Header closeButton>
            <Modal.Title>Update Your Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                <thead>
            <tr>
                <th>ID</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>

            <tr key={id}>
                <td>{id}</td>
                <td>
                {description}
                <input className="" type="text" value={update} onChange={(e)=> setUpdate(e.target.value)} />

                </td>
                <td><Button variant="secondary" onClick={()=>fetchinit(id)}>Update</Button></td>
            </tr>
       
        </tbody>
                </Table>
            </Modal.Body>
        </Modal>
        </>
    )
}