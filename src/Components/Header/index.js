import styles from './styles.module.scss';
import Icon from "../../assets/Icon.svg"

import { Link, useHistory } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { usePokedexContext } from '../../Hooks/usePokemonContext';


function Header({clickFunction, color, hasBorder, bgColor, index, isShowing}) {
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
    <header className={`${styles.header} ${hasBorder ? styles.border : ''}`} style={{backgroundColor: bgColor, maxHeight: isShowing ? '5rem' : '0rem'}}>
      <Link to="/" >
        <h1 onClick={clickFunction ? clickFunction : null} style={{color: `${color}`, transform: isShowing ? 'translateY(0)' : 'translateY(-5rem)'}}>
          Pokedex
        </h1>
      </Link>
      <img src={Icon} alt="logo" className={styles.logo} style={{transform: isShowing ? 'translateY(0)' : 'translateY(-5rem)'}}/>

      { path.length >= 3 && <BsArrowLeft className={styles.backButton} onClick={handleBackButtonClick}/>}
    </header>
  )
}

export { Header }
