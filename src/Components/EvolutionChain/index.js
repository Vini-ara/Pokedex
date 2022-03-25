import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./evolutionChain.module.scss";
import { BsArrowRight } from "react-icons/bs";
import Theme from "../../Themes/TypesThemes/TypesThemes";
import { Link } from "react-router-dom";

import { Loading } from "../Loading";

function EvolutionChain(props) {
  const [evolves, setEvolves] = useState(false)
  const [firstNode, setFirstNode] = useState([])
  const [secondNode, setSecondNode] = useState([])
  const [thirdNode, setThirdNode] = useState([])

  const [loading, setLoading] = useState(true)

  const url = props.url

  useEffect(() => {
    setLoading(true)

    axios.get(url)
      .then(response => {
        const data = response.data.chain

        data.evolves_to[0] ? setEvolves(true) : setEvolves(false)

        pokemonInfo(data.species.url)
          .then(response=>{
            setFirstNode(response)
          })
        
        if(data.evolves_to[0]) {
          data.evolves_to.forEach(e =>{
            const details = detailFilter(e.evolution_details[0])
            pokemonInfo(e.species.url)
              .then(response =>{
                setSecondNode([...secondNode, {info: response, details: details}])
              })

            if(e.evolves_to[0]) {

              return e.evolves_to.map((i)=>{
                const details2 = detailFilter(i.evolution_details[0])

                return pokemonInfo(i.species.url)
                  .then(response2 =>{
                    setThirdNode([...thirdNode, {info: response2, details: details2}])  
                  })
              })
            }
          })
        }
        setLoading(false)
      })
  }, [])

  function pokemonInfo(url) {
    const info = axios.get(url)
      .then(response =>{

      const id = response.data.id

      var idString = response.data.id
      if(idString < 10) {
        idString = `00${id}`
      } else if(idString > 10 & id < 100) {
        idString = `0${id}`
      } else {
        idString = `${id}`
      }

      const Info = axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(response=>{
          const data = response.data

          const name = data.name
          const img = data.sprites.other["official-artwork"].front_default

          
          const typesArray = data.types.map((type)=>{
            return type.type.name
          })

          const obj = {
            id: idString,
            img: img,
            types: typesArray,
            name: name
          }
          return obj
        })
      return Info 
      })
    return info
  }

  function detailFilter(e) {
    let triggerName
    let conditions

    for(var condition in e) {
      if(e[condition] ) {
        if(condition === 'trigger') {
          triggerName = e[condition].name
        } else {
          conditions = e[condition]
        }
      }
    }
    
    const details = {
      condition: conditions,
      trigger: triggerName
    }
    return details 
  }

  return (
    loading ? (
      <Loading />
    ) : (
      <>
        {evolves ? (
          <div className={styles.chainNode}>
            <Link to={`/pokedex/${firstNode.name}`}>
              <img src={firstNode?.img} alt={firstNode?.name}/>
            </Link>
            <span>#{firstNode?.id}</span>
            <p>{firstNode?.name}</p>
            <div className={styles.types}>
            {firstNode?.types?.map((type, index) =>{
              return <p style={{backgroundColor: Theme[type]?.secondary}} key={index}>{type}</p>
            })}</div>
          </div>
        ) : (
          <h3>No evolution chain</h3>
        )}
    
        {secondNode[0] ? (
          secondNode.map((e, index) => {
            return (
              <div className={styles.chainNode} key={index}>
                <Link to={`/pokedex/${e?.info?.name}`}>
                  <img src={e?.info?.img} alt={e?.info?.name}/>
                </Link>
                <span>#{e?.info?.id}</span>
                <p>{e?.info?.name}</p>
                <div className={styles.types}>
                {e?.info?.types?.map((type, index) =>{
                  return <p style={{backgroundColor: Theme[type]?.secondary}} key={index}>{type}</p>
                })}</div>
                <div className={styles.evolutionInfo}>
                  <BsArrowRight className={styles.evolutionIcon}/>
                  
                </div>
              </div>
            )
          })
        ) : (
          null
        )}
    
        {thirdNode[0] ? (
          thirdNode.map((e, index) => {
              return (
                <div className={styles.chainNode} key={index}>
                  <Link to={`/pokedex/${e?.info?.name}`}>
                    <img src={e?.info?.img} alt={e?.info?.name}/>
                  </Link>
                  <span>#{e?.info?.id}</span>
                  <p>{e?.info?.name}</p>
                  <div className={styles.types}>
                  {e?.info?.types?.map((type, index) =>{
                    return <p style={{backgroundColor: Theme[type]?.secondary}} key={index}>{type}</p>
                  })}</div>
                  <div className={styles.evolutionInfo}>
                    <BsArrowRight className={styles.evolutionIcon}/>
                    
                  </div>
                </div>
              )
          })
        ) : (
          null
        )}
      </>
    )
  );
}

export { EvolutionChain }