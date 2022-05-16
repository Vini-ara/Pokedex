import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import { BsArrowRight, BsX } from "react-icons/bs";
import Theme from "../../Themes/TypesThemes/TypesThemes";

function EvolutionChainModal({nodes, toggle, active, evolutions, isComplex}) {
  const [columns, setColumns] = useState(4)
  const [threeRows, setThreeRows] = useState(0)

  useEffect(() => {
    if(nodes[0][0]?.evolves_to <= 3) setColumns(0)
    else if(nodes[0][0]?.evolves_to <= 6) setColumns(2)

    if(nodes[0][0]?.evolves_to % 3 === 0) setThreeRows(1)
  }, [nodes])

  return (
    <>
      <section className={`${styles.overlay} ${active ? styles.active : ''}`}>
        <div className={styles.closeBtn}>
          <BsX color="white" size="3rem" onClick={toggle}/>
        </div>

        <div className={`${styles.modal} ${isComplex ? '' : styles.simple}`} style={{
              gridTemplateColumns: `repeat(${evolutions}, 1fr)`,
              color: nodes[0][0]?.species.types[0] === "dark" ? "white" : "black"
            }}
        >
          <div className={styles.chainNode} style={{display: "flex", justifyContent: "center"}}>
            <div className={styles.card} style={{backgroundColor: Theme[nodes[0][0]?.species.types[0]]?.main}}>
              <img src={nodes[0][0]?.species?.img} alt={nodes[0][0]?.species?.name} style={{background: Theme[nodes[0][0]?.species.types[0]]?.secondary}}/>

              <span>#{nodes[0][0]?.species?.id}</span>

              <p className={styles.name}>{nodes[0][0]?.species?.name}</p>

              <div className={styles.types}>
              {nodes[0][0]?.species?.types?.map((type, index) =>{
                return <p style={{backgroundColor: Theme[type]?.secondary}} key={index}>{type}</p>
              })}</div>
            </div>
          </div>

          <div 
            className={`${styles.chainNode} ${threeRows ? styles.threeRows : ''}`} 
            style={!columns ? 
              {
                gridTemplateColumns: "1fr",
                gridTemplateRows: `repeat(${nodes[1]?.length}, minmax(0, 15.25rem))`
              } : {
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
              }}
          >
            <div className={styles.arrow}>
              <BsArrowRight /> 
            </div>

            {nodes[1]?.map((e, index) => (
              <div 
                className={styles.card}  
                style={
                  {
                    background: Theme[e.species.types[0]]?.main, 
                    color: `${e.species.types[0] === "dark" ? "white" : "black"}`,
                }} 
                key={index}
              >
                <img src={e?.species?.img} alt={e?.species?.name} style={{background: Theme[e.species.types[0]]?.secondary}}/>

                <span>#{e?.species?.id}</span>
                
                <p className={styles.name}>{e?.species?.name}</p>

                <div className={styles.types}>
                  {e?.species?.types?.map((type, index) =>{
                    return <p style={{background: Theme[type]?.secondary}} key={index}>{type}</p>
                  })}
                </div>

                <div className={styles.evolutionInfo}>
                  <p>trigger: {e.evolution_details.trigger}</p>
                  {Object.keys(e.evolution_details).map((a, index) => (
                    a !== "trigger" && 
                    <p key={index} style={!index % 2 ? {background: Theme[e.species.types[0]]?.secondary} : null}>
                        {a.replace(/_/g, " ")}: {e.evolution_details[a]}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {evolutions > 2 && 
            <div 
              className={styles.chainNode} 
              style={{
                gridTemplateColumns: "1fr"
              }}
            >
              {nodes[2]?.map(e => {
                return e.map((a, index) => (
                  <div className={styles.thirdNode} key={index}>
                    <div className={styles.arrow}>
                      <BsArrowRight /> 
                    </div>

                    <div 
                      className={styles.card}  
                      style={
                        {
                          background: Theme[a.species.types[0]]?.main, 
                          color: `${a.species.types[0] === "dark" ? "white" : "black"}`
                        }} 
                      key={index}
                    >
                      <img src={a?.species?.img} alt={a?.species?.name} style={{background: Theme[a.species.types[0]]?.secondary}}/>

                      <span>#{a?.species?.id}</span>

                      <p className={styles.name}>{a?.species?.name}</p>

                      <div className={styles.types}>
                      {a?.species?.types?.map((type, index) =>{
                        return <p style={{backgroundColor: Theme[type]?.secondary}} key={index}>{type}</p>
                      })}</div>

                      <div className={styles.evolutionInfo}>
                        <p>trigger: {a.evolution_details.trigger}</p>

                        {Object.keys(a.evolution_details).map((j, index) => (
                          j !== "trigger" &&
                          <p key={index} style={!index % 2 ? {background: Theme[a.species.types[0]]?.secondary} : null}>
                              {j.replace(/_/g, " ")}: {a.evolution_details[j]}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              )}
          </div>}
        </div>
      </section>
    </>
  );
}

export { EvolutionChainModal }
