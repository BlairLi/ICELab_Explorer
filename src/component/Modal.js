const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000
  }
  
  const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
  }


export default function Modal({open, children, onClose, onCancel, action}) {
  if (!open) return null
    return (
        <>
            <div style={OVERLAY_STYLES} onClick={onCancel}/>
            <div style={MODAL_STYLES}>
                {children}
                <button onClick={onClose} className="SaveButton">{action}</button>
            </div>
        </>
  )
}
