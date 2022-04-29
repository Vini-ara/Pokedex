import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/api";

const PokemonContext = createContext()

function PokemonContextProvider(props) {
  const [pokemonList, setPokemonList] = useState([])
  const [next, setNext] = useState("")
  const [cardPosition, setCardPosition] = useState(0)
  const [typeFilters, setTypeFilters] = useState([])
  const [generationFilters, setGenerationFilters] = useState([])
  const [typeFilterOption, setTypeFilterOption] = useState(false)

  useEffect(() => {
    async function load() {
      const { list, next } = await initialFetch()

      setPokemonList(list)
      setNext(next)
    }
    load()

  }, [])

  useEffect(() => {
    async function load() {
      const { list, next } = await initialFetch()
  
      setPokemonList(list)
      setNext(next)
    }

    let list = typeFilterFetch(typeFilters)

    let list2 = generationFilterFetch(generationFilters)

    Promise.all([list, list2]).then(e => {
      if(!e[0] && !e[1]) {
        return load()
      }
      
      for(let i = 0; i < e.length; i++) {
        if(e[i] === undefined) e.splice(i, 1)
        else {
          e[i].sort((a, b) => {
            return a.id - b.id
          });
        }
      }

      if(typeFilterOption)
        e[0] = getDuplicates(e[0]);
      else 
        e[0] = deleteDuplicates(e[0]);

      let all = [];

      e.forEach(a => all = [...all, ...a])

      all.sort((a, b) => {
        return a.id - b.id;
      })

      if(generationFilters.length && typeFilters.length) all = getDuplicates(all)

      setPokemonList(all)
    })
  }, [typeFilters, typeFilterOption, generationFilters])

  async function initialFetch() {
    const { data } = await api.get("/pokemon?limit=20&offset=0")

    const list = data.results.map(pokemon => {
      const id = pokemon.url.split('/')
      const index = id[id.length - 2]

      const name = pokemon.name

      return { name: name, id: index }
    })

    const info = {
      list,
      next: data.next
    }

    return info
  }

  async function nextFetch() {
    const { data } = await api.get(next)

    const list = data.results.map(pokemon => {
      const id = pokemon.url.split('/')
      const index = id[id.length - 2]

      const name = pokemon.name

      return { name: name, id: index }
    })

    setPokemonList((currentList) => {
      return [...currentList, ...list]
    })

    setNext(data.next)
  }

  async function redoList(ratio) {
    const listSize = Math.ceil(ratio) * 20

    const { data } = await api.get(`/pokemon?limit=${listSize}&offset=0`)

    const list = data.results.map(pokemon => {
      const id = pokemon.url.split('/')
      const index = id[id.length - 2]

      const name = pokemon.name

      return { name: name, id: index }
    })

    setPokemonList(list)
    setNext(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${listSize}`)

    return list
  }

  async function typeFilterFetch(filters) {
    if (!filters.length) return

    let list = [];

    for(let i = 0; i < filters.length; i++) {
      const { data } = await api.get(`/type/${filters[i]}`)

      let pokemons = data.pokemon.map(node => {
        const id = node.pokemon.url.split('/')
        const PokemonIndex = id[id.length - 2]
  
        const name = node.pokemon.name
  
        return { name: name, id: PokemonIndex }
      });

      list = [...list, ...pokemons]
    }

    return list;  
  }

  async function generationFilterFetch(filter) {
    if (!filter.length) return;

    let list = [];

    for(let i = 0; i < filter.length; i++) {
      const { data } = await api.get(`/generation/${filter[i]}`);

      let pokemons = data["pokemon_species"].map(node => {
        const id = node.url.split('/')
        const PokemonIndex = id[id.length - 2]
  
        const name = node.name
  
        return { name: name, id: PokemonIndex }
      });
      
      list = [...list, ...pokemons]
    }

    return list;
  }

  function getDuplicates(list) {
    let doubledPokemons = [];

    list.forEach((e, index) => {
      if (index === list.length - 1) return

      if (e.name === list[index + 1].name) {
        doubledPokemons.push(e)
        return
      }
    })
    return doubledPokemons;
  }

  function deleteDuplicates(list) {
    let noDuplicates = list.map((e, index) => {
      if (index === list.length - 1) return e;

      if (e.name !== list[index + 1].name) {
        return e;
      }
    })
    
    var filtered = noDuplicates.filter((x) => (x !== undefined));

    return filtered;
  }

  function typeFilterSet(filter, action) {
    if (action) {

      setTypeFilters([...typeFilters, filter])
      setNext(null)

    } else {
      const index = typeFilters.indexOf(filter)

      const list = typeFilters

      list.splice(index, 1)

      if (list.length < 2) setTypeFilterOption(false)

      setTypeFilters([...list])
    }
  }

  function typeFilterOptionSet(checked) {
    setTypeFilterOption(checked)
  }

  function generationFiltersSet(filter, action) {
    if (action) {
      setGenerationFilters([...generationFilters, filter])
      setNext(null)
    } else {
      const index = generationFilters.indexOf(filter)

      const list = generationFilters

      list.splice(index, 1)

      setGenerationFilters([...list])
    }
  }

  function cardClick(pos) {
    setCardPosition(pos)
  }

  return (
    <PokemonContext.Provider value={{
      initialFetch,
      nextFetch,
      pokemonList,
      redoList,
      cardPosition,
      cardClick,
      next,
      typeFilters,
      typeFilterSet,
      typeFilterOptionSet,
      typeFilterOption,
      generationFilters,
      generationFiltersSet
    }}>
      {props.children}
    </PokemonContext.Provider>
  );
}

export function usePokedexContext() {
  const context = useContext(PokemonContext)

  return context
}

export { PokemonContextProvider }
