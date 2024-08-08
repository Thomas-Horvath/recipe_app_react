
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export function RecipeCreate() {
  const [ingredientIds, setIngredientIds] = useState([]);

  return (
    <div className="card p-3">
      <h1>Új recept:</h1>
      <hr />
      <form>
        <div className="form-group row pb-3 border-bottom">
          <label className="col-sm-2 col-form-label">Hozzávalók:</label>

          <div className="row w-100">
            <div className="col-md-3 offset-md-9">
              <button
                type="button"
                className="btn btn-success btn-sm float-right"
                onClick={() => {
                  setIngredientIds((prev) => [...prev, uuidv4()]);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

        </div>
        
        <button type="submit" className="btn btn-success btn-sm">
          Küldés <FontAwesomeIcon icon={faCheckCircle} />
        </button>
      </form>
    </div>
  );
}

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
