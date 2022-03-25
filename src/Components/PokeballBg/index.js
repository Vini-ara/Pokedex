import styles from "./pokeballbg.module.scss";

export default function PokeballBg(props) {
  return(
      <div className={styles.outerBall}  style={{width:  props.size, height: props.size, background: props.MainColor}}>
        <div className={styles.midBall} style={{background: props.subColor}}>
          <div className={styles.centerBall} style={{background: props.MainColor}}></div>
        </div>
       
        <div className={styles.rectangle} style={{background: props.subColor, }}></div>
               
      </div>
  )
}