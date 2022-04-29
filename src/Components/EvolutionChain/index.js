import { useState, useEffect } from "react";
import { api } from "../../api/api.js";

import styles from "./evolutionChain.module.scss";
import { BsArrowRight } from "react-icons/bs";
import Theme from "../../Themes/TypesThemes/TypesThemes";
import { Link } from "react-router-dom";

import { Loading } from "../Loading";
import { EvolutionChainModal } from "../EvolutionChainModal/index.js"

function EvolutionChain({ url }) {
  const [id, setId] = useState(0)
  const [evolves, setEvolves] = useState(true)
  const [isComplex, setIsComplex] = useState(false)
  const [nodes, setNodes] = useState([[]])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    const data = getData(url);

    Promise.all([data]).then(e => {
      filterData(e)
    }) 

    setLoading(false)
  }, [])

  async function pokemonInfo(url) {
    const info = api.get(url)
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

      const Info = api.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
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

  async function getData(url) {
    const { data } = await api.get(url)
    setId(data.id)
    
    return data.chain
  }

  async function filterData(data) {
    let chainNodes = [null, null, null];

    const firstPokemon = {
      evolution_details: data[0].evolution_details, 
      species: await pokemonInfo(data[0].species.url), 
      evolves_to: data[0].evolves_to.length,
    }

    if(!firstPokemon.evolves_to) {
      setEvolves(false)
      return
    }

    if(data[0].evolves_to.length > 1) setIsComplex(true)

    if(!firstPokemon.evolves_to) return
    let thirdNode = []

    let secondNode = await Promise.all(data[0].evolves_to.map(async e => {
      const pokemon = {
        evolution_details: getRelevantDetails(e.evolution_details[0]),
        species: await pokemonInfo(e.species.url),
        evolves_to: e.evolves_to.length 
      };

      if(e.evolves_to.length > 1) setIsComplex(true)

      if(e.evolves_to.length) {
        let third_ev = await Promise.all(e.evolves_to.map(async a => {
          const pokemon2 = {
            evolution_details: getRelevantDetails(a.evolution_details[0]),
            species: await pokemonInfo(a.species.url),
            evolves_to: a.evolves_to.length 
          }
          
          return pokemon2
        }))

        thirdNode.push(third_ev)     
      }

      return pokemon
    }))

    chainNodes[0] = [ firstPokemon ];
    chainNodes[1] = secondNode
    chainNodes[2] = thirdNode

    console.log(isComplex)
    console.log(chainNodes)

    setNodes(chainNodes)
  }

  function getRelevantDetails(e) {
    let keys = Object.keys(e);
    let value = Object.values(e); 
    let removed = [];

    const validV = value.filter((v, i)  => {
      if(!v) {
        removed.push(i)
        return false; 
      } else {
        return true; 
      }
    })

    const validK = keys.filter((k, i) => {
      if(removed.includes(i)) return false; 
      else return true; 
    })

    const map = validK.map((key, index) => {
      if(validV[index]?.name) {
        return [key, validV[index].name]
      }
      return [key, validV[index]]
    })

    const relevantDetails = Object.fromEntries(map) 

    

    return relevantDetails
  }
  
  function toggleModal() {
    setIsModalOpen((prev) => (!prev))
  }


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        !isComplex ? (
        <>
          {evolves ? (
            <div className={styles.chainNode}>
              <Link to={`/pokedex/${nodes[0][0]?.species?.name}`}>
                <img src={nodes[0][0]?.species?.img} alt={nodes[0][0]?.species?.name}/>
              </Link>
              <span>#{nodes[0][0]?.species?.id}</span>
              <p>{nodes[0][0]?.species?.name}</p>
              <div className={styles.types}>
              {nodes[0][0]?.species?.types?.map((type, index) =>{
                return <p style={{backgroundColor: Theme[type]?.secondary}} key={index}>{type}</p>
              })}</div>
            </div>
          ) : (
            <h3>No evolution chain</h3>
          )}
      
          {nodes[1] ? (
            nodes[1].map((e, index) => {
              return (
                <div className={styles.chainNode} key={index}>
                  <Link to={`/pokedex/${e?.species?.name}`}>
                    <img src={e?.species?.img} alt={e?.species?.name}/>
                  </Link>
                  <span>#{e?.species?.id}</span>
                  <p>{e?.species?.name}</p>
                  <div className={styles.types}>
                  {e?.species?.types?.map((type, index) =>{
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
      
          {nodes[2] ? (
            nodes[2][0]?.map((e, index) => {
                return (
                  <div className={styles.chainNode} key={index}>
                    <Link to={`/pokedex/${e?.species?.name}`}>
                      <img src={e?.species?.img} alt={e?.species?.name}/>
                    </Link>
                    <span>#{e?.species?.id}</span>
                    <p>{e?.species?.name}</p>
                    <div className={styles.types}>
                    {e?.species?.types?.map((type, index) =>{
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
          <EvolutionChainModal nodes={nodes} toggle={toggleModal} active={isModalOpen}/>
        </>
        ) : (
          <>
            <h3 onClick={() => setIsModalOpen(true)}> Click to see the Evolution Chain </h3>
            <EvolutionChainModal nodes={nodes} toggle={toggleModal} active={isModalOpen}/>
          </>
          )
        )
      }
    </>
  );
}


export { EvolutionChain }
