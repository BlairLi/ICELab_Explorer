import '../css/Todo.css'
import { useState } from 'react';
import Modal from './Modal';
import Backdrop from './Backdrop';
import {ImBin} from 'react-icons/im';

function Todo(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function deleteHandler() {
        setModalIsOpen(true);
    }
    function closeModalHandler() {
        setModalIsOpen(false);
    }

    return (
      <div className='card'>
        <h2>{props.text}</h2>
        <div className='actions'>
          <button className = 'btn btnbin' onClick={deleteHandler}><ImBin/></button>
        </div>
        {modalIsOpen && (
        <Modal onCancel={closeModalHandler} onConfirm={closeModalHandler} />
        )}
        {modalIsOpen && <Backdrop onClick={closeModalHandler} />}
      </div>
    );
  }
  
  export default Todo;