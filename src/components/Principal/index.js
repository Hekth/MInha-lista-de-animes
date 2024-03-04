import CampoBusca from "components/CampoBusca";
import CardsLista from "components/CardsLista";
import styles from "./Principal.module.css";

export default function Principal() {
    return(
        <section className={styles.secaoPrincipal}>
            <h2 className={styles.tituloFormulario}>
                Insira uma obra
            </h2>
            <CampoBusca placeholder="Ex: Naruto" />
            <CardsLista />
        </section>
    );
}