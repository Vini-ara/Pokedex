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
    if (!typeFilters[0]) {
      async function load() {
        const { list, next } = await initialFetch()

        setPokemonList(list)
        setNext(next)
      }

      if (generationFilters.length) {
        let list = generationFilters.map(e => {
          return generationFilterFetch(e)
        })

        Promise.all(list).then(e => {
          let all = [];
          e.forEach(a => all = [...all, ...a])

          setPokemonList(all)
        })
        console.log(pokemonList)
      } else {
        load();
      }

      return
    }

    let list = typeFilters.map(e => {
      return typeFilterFetch(e)
    })

    let list2 = generationFilters.map(e => {
      return generationFilterFetch(e)
    })

    Promise.all([...list, ...list2]).then(e => {
      let all = [];
      e.forEach(a => all = [...all, ...a])

      all.sort((a, b) => {
        return a.id - b.id;
      })

      generationFilters.length ? setPokemonList(getDuplicates(all)) : setPokemonList(deleteDuplicates(all));
    })
  }, [typeFilters])

  useEffect(() => {
    if (!generationFilters[0]) {
      async function load() {
        const { list, next } = await initialFetch()

        setPokemonList(list)
        setNext(next)
      }

      async function typeFetch() {
        let list = typeFilters.map(e => {
          return typeFilterFetch(e)
        })

        Promise.all(list).then(e => {
          let all = [];
          e.forEach(a => all = [...all, ...a])

          setPokemonList(all)
        })
      }

      typeFilters[0] ? typeFetch() : load();
      return;
    }

    let list = typeFilters.map(e => {
      return typeFilterFetch(e)
    })

    let list2 = generationFilters.map(e => {
      return generationFilterFetch(e)
    })

    Promise.all([...list, ...list2]).then(e => {
      let all = [];
      e.forEach(a => all = [...all, ...a])

      all.sort((a, b) => {
        return a.id - b.id;
      })

      typeFilters.length ? setPokemonList(getDuplicates(all)) : setPokemonList(all);
    })
  }, [generationFilters])

  useEffect(() => {
    let list = pokemonList

    let doubledPokemons = []

    list.sort((a, b) => {
      return a.id - b.id
    })

    if (typeFilters.length >= 2) {

      list.forEach((e, index) => {
        if (index === list.length - 1) return

        if (typeFilterOption && e.name === list[index + 1].name) {
          doubledPokemons = [...doubledPokemons, e]
          return
        }

        if (e.id === list[index + 1].id) list.splice(index, 1)
      })

      if (typeFilterOption) {
        setPokemonList(doubledPokemons)
      } else {
        setPokemonList(list)
      }
    }

    if (!typeFilterOption) {
      typeFilterFetch(typeFilters)
    }
  }, [typeFilterOption])

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

  async function typeFilterFetch(filter) {
    if (!typeFilters.length) return

    const { data } = await api.get(`/type/${filter}`)

    let pokemons = data.pokemon.map(node => {
      const id = node.pokemon.url.split('/')
      const PokemonIndex = id[id.length - 2]

      const name = node.pokemon.name

      return { name: name, id: PokemonIndex }
    });

    return pokemons;
  }

  async function generationFilterFetch(filter) {
    if (!generationFilters.length) return;

    const { data } = await api.get(`/generation/${filter}`);

    let pokemons = data["pokemon_species"].map(node => {
      const id = node.url.split('/')
      const PokemonIndex = id[id.length - 2]

      const name = node.name

      return { name: name, id: PokemonIndex }
    });

    return pokemons;
  }

    function getDuplicates(list) {
       let doubledPokemons = [];

       list.forEach((e, index) => {
       if(index === list.length - 1) return 

       if(e.name === list[index + 1].name) {
         doubledPokemons.push(e)
         return 
       }
     })

     return doubledPokemons;
   }

  function deleteDuplicates(list) {
    console.log(list)
    let finishedList = list.map((e, index) => {
      if (index === list.lenght - 1) return e;

      if (e.name !== list[index + 1].name) {
        return e;
      }
    })

    return finishedList;
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
