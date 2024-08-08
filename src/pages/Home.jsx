import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from '../components/Spinner/Spinner'


const Home = () => {
  const [numberOfRecipes, setNumberOfRecipes] = useState(0); // létrehozzuk a állapotot
  const [isPending, setPending] = useState(false);

  function fetchNum() {
    return fetch(process.env.REACT_APP_BACKEND_URL + "/api/recipes")
      .then((res) => res.json())
      .then((recipes) => {
        setNumberOfRecipes(recipes.length);
      })
  }

  useEffect(() => {
    setPending(true);
    fetchNum().finally(() => {
      setPending(false);
    });
  }, []);

  if (isPending) {
    return <Spinner />
  }

  return (
    <div className="p-5 mb-4 bg-light rounded-3">
      <div className="container-fluid py-5">
        <h1 className='display-5 fw-bold'>Üdv a recept appban</h1>
        <p className="col-md-8 fs-4">Jelenleg {numberOfRecipes} recept elérhető</p>
        <NavLink to={`/receptek`}>
          <button className="btn btn-primary">
            Tovább <FontAwesomeIcon icon={faArrowCircleRight} />
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default Home