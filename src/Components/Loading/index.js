import styles from "./loading.module.scss";

function Loading(props) {

  return (
  <div className={styles.loading} style={{transform: `scale(${props.scale})`}}>
    <div className={styles.loadingBall1}>
      <div className={styles.whiteBall}>
        <div className={styles.centerBall} style={{background: `var(--dark-green)`}}></div>
      </div>
      <div className={styles.rectangle} ></div>
    </div>

    <div className={styles.loadingBall2}>
      <div className={styles.whiteBall}>
        <div className={styles.centerBall} style={{background: "var(--dark-red)"}}></div>
      </div>
      <div className={styles.rectangle}></div>  
    </div>

    <div className={styles.loadingBall3}>
      <div className={styles.whiteBall}>
        <div className={styles.centerBall} style={{background: "var(--dark-yellow)"}}></div>
      </div>
      <div className={styles.rectangle}></div>
    </div>
  </div>
  );
}

export { Loading }