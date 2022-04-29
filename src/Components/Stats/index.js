import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";


function PokemonStats({ stats }) {
  const container = useRef()

  useEffect(()=>{
    stats.forEach((stat, index)=> {
      container.current.style.setProperty(`--stat-bar-width-${index}`, `${stat * 100 / 180}%`)
    })

    console.log(getComputedStyle(container.current).getPropertyValue("--stat-bar-width-0"))
  },[])
 
  return (
    <div className={styles.stats} ref={container}>
      <table className={styles.statsTable}>
        <tbody>
          <tr>
            <th>Hp</th>
            <td>{stats[0]}</td>
            <td className={styles.barCell}>
              <div className={`${styles.statBar} ${styles.bar1}`}  
                style={{background: `var(--stat${Math.ceil(stats[0] / 30)})` }}>
              </div>
            </td>
          </tr>
          <tr>
            <th>Attack</th>
            <td>{stats[1]}</td>
            <td className={styles.barCell}>
              <div className={`${styles.statBar} ${styles.bar2}`} 
                style={{background: `var(--stat${Math.ceil(stats[1] / 30)})` }}>
              </div>
            </td>
          </tr>
          <tr>
            <th>Defense</th>
            <td>{stats[2]}</td>
            <td className={styles.barCell}>
              <div className={`${styles.statBar} ${styles.bar3}`} 
                style={{background: `var(--stat${Math.ceil(stats[2] / 30)})`}}>
              </div>
            </td>
          </tr>
          <tr>
            <th>Sp. Attack</th>
            <td>{stats[3]}</td>
            <td className={styles.barCell}>
              <div className={`${styles.statBar} ${styles.bar4}`} 
                style={{background: `var(--stat${Math.ceil(stats[3] / 30)})` }}>
              </div>
            </td>
          </tr>
          <tr>
            <th>Sp. Defense</th>
            <td>{stats[4]}</td>
            <td className={styles.barCell}>
              <div className={`${styles.statBar} ${styles.bar5}`} 
                style={{background: `var(--stat${Math.ceil(stats[4] / 30)})` }}>
              </div>
            </td>
          </tr>
          <tr>
            <th>speed</th>
            <td>{stats[5]}</td>
            <td className={styles.barCell}>
              <div className={`${styles.statBar} ${styles.bar6}`} 
                style={{background: `var(--stat${Math.ceil(stats[5] / 30)})`}}>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <td>
              {`${stats[0] + stats[1] + stats[2] + stats[3] + stats[4] + stats[5]}`}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export { PokemonStats }