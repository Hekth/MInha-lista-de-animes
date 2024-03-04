import styles from './CarregandoComponente.module.css';
import iconeCarregando from 'assets/loading2.gif';
export default function CarregandoComponente() {
    return(
        <div className={styles.loadingContainer}>
            <img src={iconeCarregando} alt="Loading icon provided by loading.io" width='82px'/>
        </div>
    );
}