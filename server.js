const express = require ("express")
const cors = require('cors')
const pool = require('./db')


const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))



//ROUTES//

//Create a Todo

app.post('/', async(req,res)=> {
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo(description) VALUES($1) RETURNING *", [description]);
        console.log(req.body)
        res.json(newTodo.rows[0]);

    } catch (error) {
        console.error(error.message)
    }
})

//Get all Todo
app.get('/todos', async(req,res)=> {
    try {
        const todos = await pool.query('SELECT * FROM todo')
        res.status(200).json(todos.rows)
    } catch (error) {
        console.error(error.message)
    }
})


//Get a Todo
app.get('/todos/:id', async(req,res)=> {
    try {
        const {id} = req.params;
        const todo = await pool.query('SELECT * FROM todo WHERE id = $1', [id])
        res.status(200).json(todo.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//Update a Todo
app.put('/:id', async(req,res)=> {
    try {
        const {id} = req.params;
        const newDescription = req.body.description;
        const todo = await pool.query("UPDATE todo SET description = $1 WHERE id = $2 RETURNING *",[newDescription, id]);

        res.status(201).json(todo.rows)
    } catch (error) {
        console.error(error.message)
    }

})




//Delete a Todo
app.delete('/:id', async(req,res)=>{
    const {id} = req.params;
    const todo = await pool.query('DELETE FROM todo WHERE id = ($1) RETURNING *', [id]);
    res.status(200).json({
        message: `Todo id: ${id} has been deleted`,
        deleted_Item: todo.rows
    })
})

app.listen(5500, ()=> console.log("server running on port 5500"))