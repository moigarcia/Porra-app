import React from "react";
import "./ModalDone.css";

const ModalDone = ({ modal, closeModal, confirm, closeSubmit }) => {
  return (
    <div className="modal bounceInDown animated" tabIndex="-1" id="modalBet" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{modal.message}</p>
          </div>
          {confirm && (
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal">
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={closeSubmit}
              >
                Aceptar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalDone;
