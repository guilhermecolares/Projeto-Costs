import loading from '../../img/loading.svg'

import styles from './styles/Loader.module.css'

function Loader() {
    return (
        <div className={styles.loader_container}>
            <img className={styles.loader} src={loading} alt="loading" />
        </div>
    )
}

export default Loader