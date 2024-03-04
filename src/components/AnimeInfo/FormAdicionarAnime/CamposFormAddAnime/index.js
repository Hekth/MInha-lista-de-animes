import styles from './CamposFormAddAnime.module.css';

export default function CamposFormAddAnime({ id, msgLabel, children }) {
    return(
        <div>
            <label className={styles.label} htmlFor={id}>
                { msgLabel }
            </label>
            { children }
        </div>
    );
}