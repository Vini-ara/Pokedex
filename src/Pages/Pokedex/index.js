import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { useScrollPosition } from "../../Hooks/useScrollPosition";

import PokemonCard from "../../Components/PokemonCard";
import PokeballBg from "../../Components/PokeballBg";
import { BsCaretUpFill, BsList } from "react-icons/bs";

import styles from './pokedex.module.scss';


import { usePokedexContext } from "../../Hooks/usePokemonContext";
import { Header } from "../../Components/Header";
import { FilterForm } from "../../Components/FilterForm";

function Pokedex() {
  const { 
    nextFetch,
    pokemonList, 
    cardPosition,
    cardClick,
    next
  } = usePokedexContext()

  const [windowScroll, setWindowScroll] = useState(0)
  const [transition, setTransition] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const [headerHasBorder, setHeaderHasBorder] = useState(false)
  const [formActive, setFormActive] = useState(false)

  const observer = useRef()
  
  const ball = useRef()

  let { url } = useRouteMatch()
  
  useEffect(()=>{
    setTransition(false)
    
    setTimeout(() => {
      window.scrollTo({
        top: -cardPosition,
        left: 0,
        behavior: 'smooth'
      })
    }, 1000);
  },[cardPosition])

  useEffect(()=>{
    if(window.scrollY === 0) {
      setShowBtn(false)
      setHeaderHasBorder(false)
    } else {
      setHeaderHasBorder(true)
    }
  },[windowScroll])
    
  const lastCard = useCallback((node) => {
    if(observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if(!next) return 

      if(entries[0].isIntersecting) {
        nextFetch()
      }
    })
    
    if(node) observer.current.observe(node)
  },[next, nextFetch])
  
  useScrollPosition(({ prevPos, currPos })=>{
    const isGoingUp = currPos.y > prevPos.y
    if(isGoingUp !== showBtn) {
      setShowHeader(isGoingUp)
      setShowBtn(isGoingUp)
    }

    if(!isGoingUp && showHeader) setShowHeader(false)

    const degrees = currPos.y
    setWindowScroll(degrees > 0 ? 0 : degrees) 
  }, [showBtn])
  
  function headerClick() {
    setTransition(true)
    cardClick(0)
  }

  function handleCardClick() {
    setTransition(true)
    cardClick(windowScroll)
  }

  function scrollUp(e) {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  } 

  function toggleForm(e) {
    e.preventDefault()
    setFormActive(!formActive)
  }
  
  return (
    <div className={styles.wrapper}>
      <Header clickFunction={headerClick} hasBorder={headerHasBorder} isShowing={showHeader}/>

      <section className={styles.container}  > 
        <div className={`${styles.bg1} ${transition ? styles.transition : ''}`} ref={ball} style={{transform: `rotate(${-windowScroll/10}deg)`}}>
          <PokeballBg size="33rem" MainColor="#707070" subColor="#fff"/>
        </div>

        <div className={`${styles.scrollButton} ${showBtn ? styles.showing : ''}`}>
          <BsCaretUpFill className={styles.btn} onClick={scrollUp}/>
        </div>

        <div className={styles.filterBtnContainer} onClick={toggleForm}>
          <BsList className={styles.filterBtn} />
        </div>
        
        {pokemonList[0] ? 
          (pokemonList?.map((pokemon, index)=>{
            if(pokemonList.length === index + 1){
              return (
                <Link 
                  to={`${url}/${pokemon.name}`} 
                  className={`${styles.link} ${index%2 !== 0 ? styles.right : ''} `} 
                  key={index}>
                  <PokemonCard name={pokemon.name} key={index} ref={lastCard} />
                </Link> 
              )} else {
              return(
                <Link 
                  to={`${url}/${pokemon.name}`} 
                  className={`${styles.link} ${index%2 !== 0 ? styles.right : ''} `} 
                  key={index} 
                  onClick={handleCardClick}>
                  <PokemonCard name={pokemon.name} key={index} />
                </Link> 
              )}
          }))
          : 
          <h2>No match results</h2>
        }
      </section>  

      <FilterForm formActive={formActive} toggleForm={toggleForm}/>
    </div>
  );
}

export default Pokedex
