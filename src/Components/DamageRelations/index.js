import styles from "./styles.module.scss"; 
import { typeRelations } from "../../TypesRelations/TypesRelations"
import { useEffect, useState } from "react";

import Theme from "../../Themes/TypesThemes/TypesThemes";

function DamageRelations({types, handleTypeClick}) {
  const [weak, setWeak] = useState([]);
  const [resistent, setResistent] = useState([]);

  useEffect(()=>{
    const relation = types.map(e => {
      return typeRelations[e]
    })

    let weakAgainst = [];
    let resistentAgainst = [];

    relation.forEach(relationType => {
      relationType.doubleDamageFrom.forEach(type => {
        let repeated = false;

        resistentAgainst.forEach((rel, index) => {
          if(type === rel.type) {
            resistentAgainst[index].multiplier *= 2;
            if(resistentAgainst[index].multiplier > 1) weakAgainst.push(resistentAgainst[index]);
            repeated = true;
          }
        })

        if(repeated) return

        weakAgainst.forEach((rel, index) => {
          if(type === rel.type) {
            weakAgainst[index].multiplier *= 2; 
            repeated = true;
          }
        })

        if(repeated) return

        weakAgainst.push({type, multiplier: 2});
      })
      
      relationType.halfDamageFrom.forEach(type => {
        let repeated = false;

        weakAgainst.forEach((rel, index) => {
          if(type === rel.type) {
            weakAgainst[index].multiplier /= 2;
            if(weakAgainst[index].multiplier < 1) resistentAgainst.push(weakAgainst[index]);
            repeated = true
          }
        })

        if(repeated) return;

        resistentAgainst.forEach((rel, index) => {
          if(type === rel.type) {
            resistentAgainst[index].multiplier /= 2;
            repeated = true;
          } 
        }) 

        if(repeated) return 

        resistentAgainst.push({type, multiplier: 0.5})
      })
    })

    const filteredWeakAgainst = weakAgainst.filter((relation) => {
      if(relation.multiplier > 1) return true
      else return false 
    })

    const filteredResistentAgainst = resistentAgainst.filter((relation) => {
      if(relation.multiplier < 1) return true
      else return false 
    })

    setWeak(filteredWeakAgainst) 
    setResistent(filteredResistentAgainst)
  }, [types]);

  return (
    <div className={styles.wrapper}> 
      <div className={styles.relation}>
        <h4>Weak Against:</h4>
        <div className={styles.type}>
          {weak.map((rel, index) => (
            <div className={styles.typeCard}>
              <p style={{backgroundColor: Theme[rel.type]?.secondary}} key={index} onClick={handleTypeClick}>{rel.type}</p>
              <span>{rel.multiplier}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.relation}>
        <h4>Resistent Against:</h4>
        <div className={styles.type}>
          {resistent.map((rel, index) => (
            <div className={styles.typeCard}>
              <p style={{backgroundColor: Theme[rel.type]?.secondary}} key={index} onClick={handleTypeClick}>
                {rel.type}
              </p>
              <span>
                {rel.multiplier === 0.5 ? <>&frac12;</> : <>&frac14;</>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div> 
  );
}

export { DamageRelations }; 
