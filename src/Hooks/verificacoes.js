import { AnimesContexto } from "contextos/animesContexto";
import { useContext } from "react";

export default function useVerificacoes() {
    const { anime, meusAnimes } = useContext(AnimesContexto);
    
    function verificaIntegridadeDoObjetoAnime(obj) {
        return !obj || Object.keys(obj).length === 0;
    }

    function verificaCadastroDoAnime() {
        return meusAnimes.some((meuAnime) => anime.mal_id === meuAnime.id);
    }

    function verificaTipoDaObra() {
        return anime.type === "Movie";
    }

    return {
        verificaIntegridadeDoObjetoAnime,
        verificaCadastroDoAnime,
        verificaTipoDaObra
    };
}