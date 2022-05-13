import styles from './styles.module.scss';
import Icon from "../../assets/Icon.svg"

import { Link, useHistory } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { usePokedexContext } from '../../Hooks/usePokemonContext';


function Header({clickFunction, color, bgColor, index}) {
  const { cardPosition, cardClick } = usePokedexContext()

  const history = useHistory()

  const path = history.location.pathname.split("/")

  function handleBackButtonClick() {
    if(cardPosition === 0) {
      const row = Math.floor(index / 2) * 320
      const pos = 240 + row
      cardClick(-pos) 
    } 

    history.push("/pokedex")
  }

  return(
    <header className={styles.header} style={{backgroundColor: bgColor}}>
      <Link to="/" >
        <h1 onClick={clickFunction ? clickFunction : null} style={{color: `${color}`}}>
          Pokedex
        </h1>
      </Link>
      <img src={Icon} alt="logo" className={styles.logo}/>

      { path.length >= 3 && <BsArrowLeft className={styles.backButton} onClick={handleBackButtonClick}/>}
    </header>
  )
}

export { Header }
