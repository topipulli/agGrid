import React, { useState } from 'react';
import { AgGridReact } from'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';
import {useRef} from 'react';



function TodoList() {
const [desc, setDesc] = useState({description: '', date: '', priority: ''});
const [todos, setTodos] = useState ([]);

const gridRef = useRef();

const inputChanged = (event) => {
    setDesc({...desc, [event.target.name]: event.target.value});
}

const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, desc])
}

const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {    
        setTodos(todos.filter((todo, index) =>
            index !== gridRef.current.getSelectedNodes()[0].childIndex))
        }else {  
             alert('Select row first');  
            }
        }

const columns = [  
    {headerName: 'Description', field: "description", sortable: true, filter: true, floatingFilter: true},
    {headerName: 'Date', field: "date", sortable: true, filter: true, floatingFilter: true},  
    {headerName: 'Priority', field: "priority", sortable: true, filter: true, floatingFilter: true,
    cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}}
]

const gridOptions = {
    animateRows: true
}


new AgGridReact(gridOptions);


return (
    <div className='App' >
        <form>
        <input type="text" placeholder='To Do' onChange={inputChanged} name="description" value={desc.description}/>
        <input type="date" placeholder='Date' onChange={inputChanged} name="date" value={desc.date}/>
        <input type="text" placeholder='Priority' onChange={inputChanged} name="priority" value={desc.priority}/>
        <button onClick={addTodo}>Add</button>
        <button onClick={deleteTodo}>Delete</button>
        </form>
        <div className="ag-theme-material"
        style={{height: '700px', width: '70%', margin: 'auto'}} >
       
       <AgGridReact 
       ref={gridRef}  
       onGridReady={ params => gridRef.current = params.api }  
       rowSelection="single"  
       columnDefs={columns}  
       rowData={todos}>
       </AgGridReact>
        </div>
    </div>
    );
};

export default TodoList;