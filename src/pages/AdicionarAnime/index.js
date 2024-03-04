import { useParams } from "react-router-dom";
import styles from "./AdicionarAnime.module.css";
import useGetApiAnime from "Hooks/getApiAnime";
import { useContext, useEffect } from "react";
import { AnimesContexto } from "contextos/animesContexto";
import CarregandoComponente from "components/CarregandoComponente";
import useVerificacoes from "Hooks/verificacoes";
import AnimeInfo from "components/AnimeInfo";
import VoltarBotao from "components/VoltarBotao";

export default function AdicionarAnime() {
    const { verificaIntegridadeDoObjetoAnime } = useVerificacoes();
    const { getApiAnimeById } = useGetApiAnime();
    const { anime, buscando } = useContext(AnimesContexto);
    const { id } = useParams();
    
    useEffect(() => {
        getApiAnimeById(id);
    } , []);

    if (buscando) {
        return <CarregandoComponente />   
    }

    return(
        <section className={styles.animeInfoContainer}>
            <VoltarBotao />
            {verificaIntegridadeDoObjetoAnime(anime)
            ?
                'Não foi possível encontrar o que você estava procurando.'
            :
                <AnimeInfo anime={anime} />
            }
        </section>
    );
}