import React, { useRef, useState } from "react";
import { BsCaretDownFill } from "react-icons/bs";
import { usePokedexContext } from "../../Hooks/usePokemonContext";

import PokeballBg from "../PokeballBg";

import styles from "./styles.module.scss";

function FilterForm({ formActive, toggleForm }) {
  const { 
    typeFilters, 
    typeFilterOption, 
    typeFilterSet, 
    typeFilterOptionSet, 
    generationFilters,
    generationFiltersSet
  } = usePokedexContext()

  const [typesFormActive, setTypesFormActive] = useState(true)
  const [generationFormActive, setGenerationFormActive] = useState(false)

  const filterContainer = useRef()

  function handleOverlayClick(e) {
    const area = filterContainer.current.getBoundingClientRect()
    const click = e.target.getBoundingClientRect()
    if (click.right > area.right) {
      return toggleForm(e)
    }
    return
  }

  function typeFilterChange(e) {
    const type = e.target.value
    const checked = e.target.checked

    typeFilterSet(type, checked)
  }

  function generationFilterChange(e) {
    const generation = e.target.value; 
    const action = e.target.checked; 

    generationFiltersSet(generation, action)
  }

  function handleFilterOption(e) {
    const checked = e.target.checked

    typeFilterOptionSet(checked)
  }

  function handleFormActivation(type) {  
    type == "generation"? setGenerationFormActive(!generationFormActive) : setTypesFormActive(!typesFormActive)
  }

  return (
    <div className={`${styles.filterOverlay} ${formActive ? styles.formActive : ''}`} onClick={handleOverlayClick}>
      <div className={styles.filterContainer} ref={filterContainer}>
        <main>
          <h2>Filter</h2>
          <hr />

          <div className={`${styles.formHeader} ${typesFormActive ? styles.typesFormActive : ''}`}>
            <BsCaretDownFill onClick={() => {handleFormActivation("type")}} />
            <h3>Types</h3>
          </div>

          <form className={typesFormActive ? styles.typesFormActive : ''} style={typesFormActive ? {height: "36rem"} : {}}>
            <p>
              <input type="checkbox" value="normal" onChange={typeFilterChange} checked={typeFilters.includes("normal")} />
              <label>Normal</label>
            </p>
            <p>
              <input type="checkbox" value="fighting" onChange={typeFilterChange} checked={typeFilters.includes("fighting")} />
              <label>Fighting</label>
            </p>
            <p>
              <input type="checkbox" value="flying" onChange={typeFilterChange} checked={typeFilters.includes("flying")} />
              <label>Flying</label>
            </p>
            <p>
              <input type="checkbox" value="poison" onChange={typeFilterChange} checked={typeFilters.includes("poison")} />
              <label>Poison</label>
            </p>
            <p>
              <input type="checkbox" value="ground" onChange={typeFilterChange} checked={typeFilters.includes("ground")} />
              <label>Ground</label>
            </p>
            <p>
              <input type="checkbox" value="rock" onChange={typeFilterChange} checked={typeFilters.includes("rock")} />
              <label>Rock</label>
            </p>
            <p>
              <input type="checkbox" value="bug" onChange={typeFilterChange} checked={typeFilters.includes("bug")} />
              <label>Bug</label>
            </p>
            <p>
              <input type="checkbox" value="ghost" onChange={typeFilterChange} checked={typeFilters.includes("ghost")} />
              <label>Ghost</label>
            </p>
            <p>
              <input type="checkbox" value="steel" onChange={typeFilterChange} checked={typeFilters.includes("steel")} />
              <label>Steel</label>
            </p>
            <p>
              <input type="checkbox" value="fire" onChange={typeFilterChange} checked={typeFilters.includes("fire")} />
              <label>Fire</label>
            </p>
            <p>
              <input type="checkbox" value="water" onChange={typeFilterChange} checked={typeFilters.includes("water")} />
              <label>Water</label>
            </p>
            <p>
              <input type="checkbox" value="grass" onChange={typeFilterChange} checked={typeFilters.includes("grass")} />
              <label>Grass</label>
            </p>
            <p>
              <input type="checkbox" value="electric" onChange={typeFilterChange} checked={typeFilters.includes("electric")} />
              <label>Electric</label>
            </p>
            <p>
              <input type="checkbox" value="psychic" onChange={typeFilterChange} checked={typeFilters.includes("psychic")} />
              <label>Psychic</label>
            </p>
            <p>
              <input type="checkbox" value="ice" onChange={typeFilterChange} checked={typeFilters.includes("ice")} />
              <label>Ice</label>
            </p>
            <p>
              <input type="checkbox" value="dragon" onChange={typeFilterChange} checked={typeFilters.includes("dragon")} />
              <label>Dragon</label>
            </p>
            <p>
              <input type="checkbox" value="dark" onChange={typeFilterChange} checked={typeFilters.includes("dark")} />
              <label>Dark</label>
            </p>
            <p>
              <input type="checkbox" value="fairy" onChange={typeFilterChange} checked={typeFilters.includes("fairy")} />
              <label>Fairy</label>
            </p>
            <h4> Options </h4>
            <p style={{margin: "0.5rem"}}>
              <input type="checkbox" value="simultaneous" onChange={handleFilterOption} checked={typeFilterOption} disabled={typeFilters.length < 2} />
              <label> Pokemon with both Types</label>
            </p>
          </form>

          <div className={`${styles.formHeader} ${generationFormActive ? styles.generationFormActive : ''}`} >
            <BsCaretDownFill onClick={() => {handleFormActivation("generation")}} />
            <h3>Generation</h3>
          </div>

          <form className={styles.generationFormActive ? styles.generationFormActive : ''} style={generationFormActive ? {height: "20rem"} : {}}>
            <p>
              <input type="checkbox" value="1" onChange={generationFilterChange} checked={generationFilters.includes("1")} />
              <label>I</label>
            </p>
            <p>
              <input type="checkbox" value="2" onChange={generationFilterChange} checked={generationFilters.includes("2")} />
              <label>II</label>
            </p>
            <p>
              <input type="checkbox" value="3" onChange={generationFilterChange} checked={generationFilters.includes("3")} />
              <label>III</label>
            </p>
            <p>
              <input type="checkbox" value={4} onChange={generationFilterChange} checked={generationFilters.includes("4")} />
              <label>IV</label>
            </p>
            <p>
              <input type="checkbox" value={5} onChange={generationFilterChange} checked={generationFilters.includes("5")} />
              <label>V</label>
            </p>
            <p>
              <input type="checkbox" value={6} onChange={generationFilterChange} checked={generationFilters.includes("6")} />
              <label>VI</label>
            </p>
            <p>
              <input type="checkbox" value={7} onChange={generationFilterChange} checked={generationFilters.includes("7")} />
              <label>VII</label>
            </p>
            <p>
              <input type="checkbox" value={8} onChange={generationFilterChange} checked={generationFilters.includes("8")} />
              <label>VIII</label>
            </p>
          </form>
        </main>

        <footer className={styles.footer} >
          <button className={styles.closeButton} onClick={toggleForm}>
            Close
            <div className={styles.buttonBg}>
              <PokeballBg size="3rem" MainColor="#f98c7f" subColor="#f7786b" />
            </div>
          </button>
        </footer>
      </div>
    </div>
  );
}

export { FilterForm }