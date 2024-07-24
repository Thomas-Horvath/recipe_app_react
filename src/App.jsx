import './App.css';
import { BrowserRouter as Router, NavLink , Routes , Route , Navigate } from 'react-router-dom';
import  RecipeCreate  from "./pages/RecipeCreate";
import  RecipeEdit  from "./pages/RecipeEdit";
import  RecipeSingle  from "./pages/RecipeSingle";
import  RecipeList  from "./pages/RecipeList";
import Home  from "./pages/Home";

import 'bootstrap/dist/css/bootstrap.min.css'; // így tudom a bootsrapet használni 
import 'bootstrap/dist/js/bootstrap.min.js'; // így tudom a bootsrapet használni 


function App() {
  return (
    <Router>
      <nav className='navbar fixed-top navbar-expand-sm navbar-dark bg-primary mb-3'>
        <div className="" id='navbarNav'>
          <ul className="navbar-nav lead fw-bold">


            <li className='nav-item'>
              <NavLink to={`/`}>
                <span className="nav-link">
                  <img src={`${process.env.REACT_APP_BACKEND_URL}/static/assets/logo.png`} alt="" width="60px" />
                </span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to={`/receptek`} className="nav-link pt-4">
                <span>Receptek</span>
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink to={`/uj-recept`} className="nav-link pt-4">
                <span>Új recept</span>
              </NavLink>
            </li>


          </ul>
        </div>
      </nav>


      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/receptek" element={<RecipeList/>} />
          <Route path="/uj-recept" element={<RecipeCreate/>} />
          <Route path="/recept-szerkesztes/:recipeSlug" element={<RecipeEdit/>} />
          <Route path="/recept/:recipeSlug" element={<RecipeSingle/>} />
          <Route path={"*"} element={<Navigate to="/"/>} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
