
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { uuidv4 } from '../utilities/uuid.js';
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner/Spinner";

export function RecipeCreate() {
  const [ingredientIds, setIngredientIds] = useState([]);
  const [stepIds, setStepIds] = useState([]);
  const [isPending, setPending] = useState(false);
  const navigate = useNavigate();

  if (isPending) {
    return <Spinner />;
  }



  function transformToStructure(elements, type) {
    return Object.values(
      Object.entries(elements)
        .filter(([kulcs, ertek]) => {
          const [dataType] = kulcs.split("-");
          return dataType === type;
        })
        .reduce((acc, [kulcs, ertek]) => {
          const [_, name, index] = kulcs.split("-");
          return {
            ...acc,
            [index]: acc[index]
              ? {
                ...acc[index],
                [name]: ertek.value,
              }
              : { [name]: ertek.value },
          };
        }, {})
    );
  }



  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.elements.name.value);
    formData.append("ingredients", JSON.stringify(transformToStructure(e.target.elements, "ingredient")));
    formData.append("steps", JSON.stringify(transformToStructure(e.target.elements, "step")));
    formData.append("image", e.target.elements["img-url"].files[0]);

    setPending(true);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/recipes`, { method: "POST", body: formData });
    setPending(false);
    navigate("/receptek");
  }

  return (
    <div className="card p-3">
      <h1>Új recept:</h1>
      <hr />
      <form onSubmit={submit}>
        <div className="form-group row pb-3 border-bottom">
          <label className="col-sm-2 col-form-label">Név:</label>
          <div className="col-sm-10">
            <input type="text" name="name" className="form-control" required />
          </div>
        </div>


        {/* Hozzávalók */}
        <div className="form-group row pb-3 border-bottom">
          <label className="col-sm-2 col-form-label">Hozzávalók:</label>
          {ingredientIds.map((ingredientId, i) => (
            <div key={ingredientId} className="col-12 col-sm-10 offset-sm-2">
              <div className="row mb-3 border-bottom">
                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    name={"ingredient-name-" + i}
                    className="form-control d-inline-block me-2 mb-2"
                    placeholder="Név"
                    required
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="text"
                    name={"ingredient-quantity-" + i}
                    className="form-control d-inline-block mr-2 mb-2"
                    placeholder="Mennyiség"
                    required
                  />
                </div>
                <div className="col-md-2">
                  <select
                    defaultValue=""
                    name={"ingredient-type-" + i}
                    className="form-control d-inline-block mr-2 mb-2"
                    required
                  >
                    <option value="" disabled>
                      Típus
                    </option>
                    <option value="meat">Hús</option>
                    <option value="drink">Ital</option>
                    <option value="dairy">Tejtermék</option>
                    <option value="fruit">Gyümölcs</option>
                    <option value="spice">Fűszer</option>
                    <option value="other">Egyéb</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <div className="w-100">
                    <button
                      className="btn btn-danger mb-3"
                      type="button"
                      onClick={() => {
                        setIngredientIds((prevIds) => {
                          const ret = [...prevIds];
                          ret.splice(
                            prevIds.findIndex((id) => id === ingredientId),
                            1
                          );
                          return ret;
                        });
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="row w-100">
            <div className="col-md-3 offset-md-9">
              <button
                type="button"
                className="btn btn-success btn-sm float-end"
                onClick={() => {
                  setIngredientIds((prev) => [...prev, uuidv4()]);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

        </div>



        {/*  lépések */}
        <div className="form-group row pb-3 border-bottom">
          <label className="col-sm-2 col-form-label">Lépések:</label>
          {stepIds.map((stepId, i) => (
            <div key={stepId} className="col-12 col-sm-10 offset-sm-2">
              <div className="row mb-3 border-bottom">
                <div className="col-md-6">
                  <input
                    type="text"
                    name={"step-content-" + i}
                    className="form-control d-inline-block mr-2 mb-2"
                    placeholder={i + 1 + ". lépés"}
                    required
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    name={"step-timer-" + i}
                    className="form-control d-inline-block mr-2 mb-2"
                    placeholder="idő"
                    min={1}
                    required
                  />
                </div>
                <div className="col-md-2">
                  <div className="w-100">
                    <button
                      className="btn btn-danger mb-3"
                      type="button"
                      onClick={() => {
                        setStepIds((prevIds) => {
                          const ret = [...prevIds];
                          ret.splice(
                            prevIds.findIndex((id) => id === stepId),
                            1
                          );
                          return ret;
                        });
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="row w-100">
            <div className="col-md-3 offset-md-9">
              <button
                type="button"
                className="btn btn-success btn-sm float-end"
                onClick={() => {
                  setStepIds((prev) => [...prev, uuidv4()]);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </div>
        <div className="form-group row pb-3 border-bottom">
          <label className="col-sm-2 col-form-label">Kép:</label>
          <div className="col-md-6 offset-md-1">
            <input type="file" name="img-url" className="form-control" />
          </div>
        </div>


        {/* Submit gomb */}
        <button type="submit" className="btn btn-success btn-sm mt-3 mx-auto d-block">
          Küldés <FontAwesomeIcon icon={faCheckCircle} />
        </button>



      </form>


    </div>
  );
}




