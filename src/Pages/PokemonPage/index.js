import { usePokedexContext } from "../../Hooks/usePokemonContext";
import { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import { BsChevronLeft, BsChevronRight} from "react-icons/bs"

import { EvolutionChain } from "../../Components/EvolutionChain/";
import { DamageRelations } from "../../Components/DamageRelations";

import Theme from "../../Themes/TypesThemes/TypesThemes";
import styles from "./pokemonPage.module.scss";
import { Loading } from "../../Components/Loading";
import { Header } from "../../Components/Header";
import { PokemonStats } from "../../Components/Stats";

function PokemonPage() {
  const [name, setName] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [genera, setGenera] = useState('')
  const [id, setId] = useState('')
  const [types, setTypes] = useState([])
  const [flavorText, setFlavourText] = useState([])
  const [height, setHeight] = useState(0)
  const [weight, setWeight] = useState(0)
  const [abilities, setAbilities] = useState([])
  const [baseExperience, setBaseExperience] = useState(0)
  const [growthRate, setGrowthRate] = useState('')
  const [eggGroups, setEggGroups] = useState([])
  const [eggCycles, setEggCycles] = useState(0)
  const [genderRatio, setGenderRatio] = useState(0)
  const [habitat, setHabitat] = useState('')
  const [catchRate, setCatchRate] = useState(0)
  const [baseHappiness, setBaseHappiness] = useState(0)
  const [stats, setStats] = useState([])
  const [evolutionChain, setEvolutionChain] = useState(null)

  const [evolutionModal, setEvolutionModal] = useState(false)

  const [loading, setLoading] = useState(true)
  
  let { pokemon } = useParams();
  
  const {
    typeFilters,
    pokemonList,
    typeFilterSet,
    cardClick,
    redoList
  } = usePokedexContext()
  
  const history = useHistory()

  const PokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
  
  //cleaning states
  useEffect(() => {
    setEvolutionModal(false) 
    console.log('heloo')
  }, [])
  
  useEffect(()=>{
    setLoading(true)

    axios.get(PokemonUrl)
      .then((response)=>{
        let data = response.data

        const abilitiesArray = data.abilities.map((item)=>{
          if(!item.is_hidden) {
            return item.ability.name
          } else {
            return `${item.ability.name}*`
          }
        })
        setAbilities(abilitiesArray)

        const typesArray = data.types.map((type)=>{
          return type.type.name
        })
        setTypes(typesArray)

       
        const statsArray = data.stats.map((stat)=>{
          return stat.base_stat
        })
        setStats(statsArray)

        let id = data.id
        if(id < 10) {
          setId(`00${id}`)
        } else if(id > 10 & id < 100) {
          setId(`0${id}`)
        } else{
          setId(`${id}`)
        }

        let weight = data.weight/10
        let height = data.height/10

        setName(data.name)
        setImgUrl(data.sprites.other["official-artwork"].front_default)
        setBaseExperience(data.base_experience)
        setHeight(height)
        setWeight(weight)

        let speciesUrl = data.species.url

        axios.get(speciesUrl)
          .then((response)=>{
            let data = response.data
 
            const eggGroupArray = data?.egg_groups.map((group)=>{
              return group?.name
            })

            setEggGroups(eggGroupArray)
            setFlavourText(data.flavor_text_entries)
            setGenera(data.genera[7].genus)
            setGenderRatio(data.gender_rate*100/8)
            setCatchRate(data.capture_rate)
            setBaseHappiness(data.base_happiness)
            setGrowthRate(data.growth_rate?.name)
            setHabitat(data.habitat?.name)
            setEggCycles(data.hatch_counter)
            setEvolutionChain(data.evolution_chain.url)

            setLoading(false)
          })
      })  

    document.title = `${name} | Pokedexer`
  }, [PokemonUrl, name])

  function filterFlavorText(array) {
    let validTexts = []

    for(let {flavor_text, language: {name}, version: {name: versionName}} of array) {
      if(name === 'en') validTexts.push({flavor_text, versionName})
    }
    
    const randomIndex = Math.random() * (validTexts.length - 1)
    
    return validTexts[Math.floor(randomIndex)]
  }

  function handleTypeClick(type) {
    typeFilters.forEach(filter => {
      typeFilterSet(filter, false)
    })

    typeFilterSet(type, true)
    cardClick(0)
    
    history.push("/pokedex")
  }

  async function NextPokemon() {
    if(typeFilters[0]) {
      for(let [i, {name: n}] of pokemonList.entries()) {
        if(name === n) {
          if(i === pokemonList.length - 1) return

          return history.push(`/pokedex/${pokemonList[i + 1]?.name}`)
        }
      }
    } else {
      const isOnList = pokemonList.length > Number(id)

      if(!isOnList) {  
        const ratio = id / 20 + 1
        const list = await redoList(ratio)

        return history.push(`/pokedex/${list[Number(id)]?.name}`)
      }

      history.push(`/pokedex/${pokemonList[Number(id)]?.name}`)
    }
  }

  async function PrevPokemon() {
    if(typeFilters[0]) {
      for(let [i, {name: n}] of pokemonList.entries()) {
        if(name === n) {
          if(i === 0) return

          return history.push(`/pokedex/${pokemonList[i - 1]?.name}`)
        }
      }
    } else {
      const isOnList = pokemonList.length >= Number(id)

      if(!isOnList) {  
        const ratio = id / 20 + 1
        const list = await redoList(ratio)

        return history.push(`/pokedex/${list[Number(id) - 1 >= 0 ? Number(id) - 1 : 0]?.name}`)
      }

      history.push(`/pokedex/${pokemonList[Number(id) - 2 >= 0 ? Number(id) - 2 : 0]?.name}`)
    }
  }

  function toggleModal() {
    setEvolutionModal(!evolutionModal)
  }

  return(
    loading ? (
      <div className={styles.loadingWrapper}>
        <Loading scale="2.5"/>
      </div>
      ) : (
      <div className={styles.wrapper}  style={{backgroundColor: Theme[types[0]]?.main}}>
        <Header color={`${types[0] === 'dark' ? "white" : ''}`} bgColor={Theme[types[0]]?.main} index={Number(id)} isShowing={true}/>
        
        <section className={styles.container} >
          {/* General info container */}
          <div className={styles.headers}>
            <h2 className={styles.name}> {name} <i>{genera}</i></h2>
            <span className={styles.id}>#{id}</span>

            <div className={styles.types}>
              {types.map((type, index)=>{
                return <p style={{backgroundColor: Theme[type]?.secondary}} key={index} onClick={() => handleTypeClick(type)}>{type}</p>
              })}
            </div>

            <div className={styles.damageRelations}>
              <DamageRelations types={types} handleTypeClick={handleTypeClick}/>
            </div>

            <div className={styles.flavourText}>
              <p>"{filterFlavorText(flavorText).flavor_text}" <i> - {filterFlavorText(flavorText).versionName}</i></p>
            </div>

            <img className={styles.pokemon} src={imgUrl} alt="pokemon" />

            <table className={styles.subInfo}>
              <tbody>
                <tr style={{backgroundColor: Theme[types[0]]?.secondary}}>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>Abilities</th>
                  <th>Base Happiness</th>
                  <th>Base Exp.</th>
                  <th>Growth Rate</th>
                </tr>

                <tr>
                  <td>{height}m</td>
                  <td>{weight}kg</td>
                  <td>{abilities.map((item ,index)=>{
                    return <p key={index}>{item}</p>
                  })}</td>
                  <td>{baseHappiness}</td>
                  <td>{baseExperience}</td>
                  <td>{growthRate}</td>
                </tr>

                <tr style={{backgroundColor: Theme[types[0]]?.secondary}}>
                  <th>Egg-Groups</th>
                  <th>Egg <br/> cycles</th>
                  <th>Gender</th>
                  <th>Habitat</th>
                  <th>Catch Rate</th>
                </tr>

                <tr>
                  <td>{eggGroups.map((e, index)=>{
                    return <p key={index}>{e}</p>
                  })}</td>
                  <td>{255 * (eggCycles + 1)} <br /> steps</td>
                  <td>Male {100 - genderRatio}% Female {genderRatio}%</td>
                  <td>{habitat}</td>
                  <td>{catchRate}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Specific info container */}
          <div className={styles.content}>
            <BsChevronLeft className={styles.prevPokemon} onClick={PrevPokemon}/>
            <BsChevronRight className={styles.nextPokemon} onClick={NextPokemon}/>

            <PokemonStats stats={stats} />

            <div className={styles.evolutionChain}>
              <EvolutionChain url={evolutionChain} evolutionModal={evolutionModal} modalToggle={toggleModal} />
            </div>
          </div>
        </section>
      </div>
    )   
  );
}

export default PokemonPage 
