import styles from './DivInfoComponente.module.css';

export default function DivInfoComponente({ titulo, conteudo }) {
    return(
        <div className={styles.containerInfo}>
            <h3>
                {titulo}
            </h3>
            <span>
                {!conteudo ? "Não informado" : conteudo}
            </span>
        </div>
    );
}