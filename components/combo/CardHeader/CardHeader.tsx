import styles from './cardHeader.module.scss'

type Props = {
  title?: string
  subtitle?: string
  cardsArt?: string[]
}

const CardHeader = ({title = '', subtitle = '', cardsArt = []}: Props) => {



  return (
    <header className={`hidden sm:flex ${styles.header}`}>
      <div className="flex w-full h-64">
        {cardsArt.map((cardArt, index) => (
          <div key={index} className={styles.cardWrapper} style={{backgroundImage: `url(${cardArt})`}}/>
        ))}
      </div>
      <div className={styles.mask}/>
      <div className={styles.comboTitleWrapper}>
        <h1 className={`${styles.headingTitle} ${styles.comboTitle}`}>{title}</h1>
        <h2 className={`${styles.headingTitle} ${styles.comboSubtitle}`}>{subtitle}</h2>
      </div>
    </header>
  );
};

export default CardHeader