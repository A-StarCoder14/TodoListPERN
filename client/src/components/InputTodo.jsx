import { useState } from "react"
import { ListTodo } from "./ListTodo"


export function InputTodo({onSubmit, text, setText}){

   


    return(
         <div className="wrappers">
            <div className="label-wrappers">
            <label htmlFor="input">Enter your todos...</label>
             <input type="text" id="input" placeholder="Let's Start Listing Todos.." value={text} onChange={(e)=> setText(e.target.value)}/>
            </div>
            <ListTodo/>
            <button type="submit" className="btns">Submit</button>
        </div>
    )
}