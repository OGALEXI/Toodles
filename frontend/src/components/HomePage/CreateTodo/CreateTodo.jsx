import { useState } from "react";
import './CreateTodo.css'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function CreateTodo({ userId, closeNewModal }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dateDue, setDateDue] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault();

        const todo = {
            title,
            description,
            dateDue
        }
        const url = `http://127.0.0.1:8000/new-todo/${userId}`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        }

        try {
            const res = await fetch(url, options);
            if (res.status !== 201) {
                const data = await res.json();
                alert(data.message);
            } else {
                closeNewModal();
            }
        } catch (e) {
            console.log('An error occured ')
        }
    }
    
    return (
       <form>
        <h2 id="ntd-header">Create A New To-Do</h2>
        <div className="ntd-input">
            <label className="ntd-labels">Title: </label>
            <input
                className="ntd-inputs"
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div className="ntd-input">
            <label className="ntd-labels">Description: </label>
            <input
                className="ntd-inputs"
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <div className="ntd-input">
            <label className="ntd-labels">Due Date: </label>
            <DatePicker selected={dateDue} onChange={(date) => setDateDue(date)}/>
        </div>
       <button id="ntd-create-btn" onClick={onSubmit}>Create</button>
       </form>
    )
}

export default CreateTodo;