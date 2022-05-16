import { Route, Switch, useLocation} from 'react-router-dom';

import Home from "./Pages/Home";
import Pokedex from "./Pages/Pokedex";
import PokemonPage from './Pages/PokemonPage';
import { PokemonContextProvider } from './Hooks/usePokemonContext';

function App() {
  const location = useLocation()
  
  return(
    <PokemonContextProvider>
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
    </PokemonContextProvider>
  );
}

export default App; 
