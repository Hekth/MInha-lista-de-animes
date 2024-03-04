import VoltarBotao from 'components/VoltarBotao';
import styles from './NaoEncontrado.module.css';

export default function NaoEncontrado() {
    return (
        <section className={styles.containerNaoEncontrado}>
            <VoltarBotao />
            <span className={styles.msgNaoEncontrado}>
                O que você procura não foi encontrado.
            </span>
        </section>
    );
}