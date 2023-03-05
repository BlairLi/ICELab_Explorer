
function Modal(props) {
    function cancelHandler() {
      props.onCancel();
    }
  
    function confirmHandler() {
      props.onConfirm();
    }
  
    return (
      <div className='modal'>
        <p>Are you sure?</p>
        <div className="modal-2nd">
            <button className='btn btn--alt' onClick={cancelHandler}>
                Cancel
            </button>
            <button className='btn' onClick={confirmHandler}>
                Confirm
            </button>
        </div>
      </div>
    );
  }
  
  export default Modal;