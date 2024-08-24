import './DeleteModal.css'

function DeleteModal({ currTodo, closeDeleteModal }) {
    const deleteFunc = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/delete/${currTodo.id}`, {method: "DELETE"});
            if (res.status !== 200) {
            const data = await res.json();
            alert(data.message);
            } else {
            closeDeleteModal();
            }
        } catch (e) {
            console.log("beep")
        }
    }
    return (
        <div id="delete-modal">
            <h2>
                Are you sure you want to delete this todo?
            </h2>
            <div id="delete-btns">
                <button id="delete" onClick={deleteFunc}>Yes, delete it.</button>
                <button id="cancel" onClick={closeDeleteModal}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteModal;