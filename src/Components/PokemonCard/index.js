import React, { useEffect, useState } from 'react';

import axios from 'axios';

import PokeballBg from '../PokeballBg';
import Theme from '../../Themes/TypesThemes/TypesThemes';

import { useWindowDimensions } from '../../Hooks/useWindowDimensions'

import styles from './pokemoncard.module.scss';


const PokemonCard = React.forwardRef((props, ref)=>{
  const [isLoading, setIsLoading] = useState(true)
  const [types, setTypes] = useState([])
  const [imageUrl, setImageUrl] = useState('')
  const [name, setName] = useState('')
  const [pokeballSize, setPokeballSize] = useState('17rem');

  const { width } = useWindowDimensions(); 

  const url = `https://pokeapi.co/api/v2/pokemon/${props?.name}`
  
  useEffect(()=>{
    axios.get(url)
      .then((response)=>{

        setIsLoading(true)

        const data = response.data

        const imgUrl = data.sprites.other["official-artwork"].front_default

        const type = data.types
        
        const typesArray = type.map((e)=>{
          return e.type.name
        })

        const name = data.name

        setName(name)
        setTypes(typesArray)
        setImageUrl(imgUrl)
        setIsLoading(false)
      })
  },[url]);


  useEffect(() => {
    setPokeballSize(width <= 644 ? '10rem' : '17rem');
  }, [width]);


  return(
    <>
      { !isLoading ? (
        <div className={styles.card} ref={ref} style={{background: Theme[types[0]]?.main, boxShadow: `0px 25px 25px -17.5px ${Theme[types[0]]?.main}`}}>
          <img src={imageUrl} alt="Pokemon" />

          <h3 className={styles.header}>{name}</h3>
          {types.map((type, index)=>{
            return ( Theme[types[0]]?.secondary === "var(--light-gray)" ? (<span className={styles.types} key={index} style={{background: Theme[types[0]]?.secondary, color: "black"}}>{type}</span>) 
            : (<span className={styles.types} key={index} style={{background: Theme[types[0]]?.secondary}}>{type}</span>))
          })}
          <div className={styles.background}>
            <PokeballBg size={pokeballSize} hover={true} MainColor={Theme[types[0]]?.secondary} subColor={Theme[types[0]]?.main}/>
          </div>
        </div>
      ) : (
        <div className={styles.loading}>
          <div className={styles.loadingBall1}>
            <div className={styles.whiteBall}>
              <div className={styles.centerBall} style={{background: `var(--dark-green)`}}></div>
            </div>
            <div className={styles.rectangle} ></div>
          </div>

          <div className={styles.loadingBall2}>
            <div className={styles.whiteBall}>
              <div className={styles.centerBall} style={{background: "var(--dark-red)"}}></div>
            </div>
            <div className={styles.rectangle}></div>  
          </div>

          <div className={styles.loadingBall3}>
            <div className={styles.whiteBall}>
              <div className={styles.centerBall} style={{background: "var(--dark-yellow)"}}></div>
            </div>
            <div className={styles.rectangle}></div>
          </div>
        </div>
      ) }
    </>
  );
})

export default PokemonCard
