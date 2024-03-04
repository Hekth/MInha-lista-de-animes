import Card from "components/Card";
import { AnimesContexto } from "contextos/animesContexto";
import { useContext } from "react";
import styles from './CardsLista.module.css';
import CarregandoComponente from "components/CarregandoComponente";

export default function CardsLista() {
    const { animes, buscando } = useContext(AnimesContexto);

    if (buscando) {
        return <CarregandoComponente />
    }

    return(
        <section className={styles.cardsContainer}>
            {animes && animes.length > 0 
                ? 
                animes.map((anime) => (
                    <div className={styles.cardContainer} key={anime.mal_id}>
                        <Card {...anime} />
                    </div>
                ))
                :
                <h2> 
                    Não foi possível encontrar o que você estava procurando.
                    <br/>
                    Evite fazer muitas buscas em um curto espaço de tempo.
                </h2>
            }
        </section>
    );
}