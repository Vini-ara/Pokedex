import { Route, Switch, useLocation} from 'react-router-dom';
import { TransitionGroup, CSSTransition} from "react-transition-group";

import "./styles/app.scss";
import Home from "./Pages/Home";
import Pokedex from "./Pages/Pokedex";
import PokemonPage from './Pages/PokemonPage';
import { PokemonContextProvider } from './Hooks/usePokemonContext';

function App() {
  const location = useLocation()
  
  return(
    <PokemonContextProvider>
      <TransitionGroup>
        <CSSTransition classNames='fade' timeout={1000} key={location.key}>   
          <Switch location={location}>
            <Route path="/" exact>
              <Home/>
            </Route>
            <Route exact path="/pokedex">
              <Pokedex/>
            </Route>
            <Route path="/pokedex/:pokemon">
              <PokemonPage />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </PokemonContextProvider>
  );
}

export default App; 