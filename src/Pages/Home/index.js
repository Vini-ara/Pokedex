import { useHistory } from 'react-router-dom';
import styles from './home.module.scss';

import icon from '../../assets/Icon.svg';
import { useState } from 'react';


function Home() {
  const [transition, setTransition] = useState(false)
  
  const history = useHistory()

  function redirect(e) {
    e.preventDefault()

    const isSmall = window.innerWidth <= 1023;

    if(isSmall) return history.push("/pokedex")

    setTransition(true)

    setTimeout(()=> history.push("/pokedex"), 1000)
  }

  return ( 
      <section className={`${styles.content} ${transition ? styles.active : ""}`}>
        <div className={styles.container} >
          <header className={styles.header}>
            <h1>
              Pokedex
            </h1>

            <img src={icon} alt="logo" className={styles.logo}/>
          </header>
        </div>

        <div className={styles.container} onClick={redirect}>
          <div className={styles.card}>
            <div className={styles.cardBg1}></div>

            <div className={styles.cardBg2}>
              <div className={styles.circle1}>
                <div className={styles.circle2}></div>
              </div>

              <div className={styles.rectangle}></div>
            </div>

            <p className={styles.cardLabel}>Pokedex</p>

            <h2 className={styles.goToText}> Go! </h2>
          </div>
        </div>
      </section>
  );
}

export default Home;
