import React from "react";


const ModalDone = ({ modal, closeModal }) => {
  

  return (
    <div className="modal" tabIndex="-1"  id="modalBet"role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{modal.message}</p>
          </div>
        </div>
      </div>
    </div>
  )

}

export default ModalDone;