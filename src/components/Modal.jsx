
import React from "react";

export function Modal(props) {
    const { onClosed, onApproved, children } = props; 
    return (
        <div className="modal d-block">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header d-flex justify-content-between">
                        <h5 className="modal-title">Figyelem!</h5>
                        <button type="button" className="close btn btn-secondary" onClick={onClosed}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>


                    <div className="modal-body">{children}</div>


                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger " onClick={onApproved}>
                            Megerősítés
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClosed}>
                            Vissza
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

