import { useContext } from "react";
import { AnimesContexto } from "contextos/animesContexto.js";

export default function useGetApiAnime() {
    const { setAnimes, setBuscando, setAnime, setGenerosAnimes } = useContext(AnimesContexto);
    function getApiAnime(busca, qtd) {
        setBuscando(true);
        setTimeout(() => {
            fetch(`https://api.jikan.moe/v4/anime?q=${busca}&limit=${qtd}`)
            .then((response) => response.json())
            .then((json) => {
                setAnimes(json.data);
                setBuscando(false);
            })
            .catch((erro) => {
                console.log(erro);
                setBuscando(false);
            });
        }, 1000);
    }

    function getApiAnimeById(id) {
        setBuscando(true);
        setTimeout(() => {
            fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
            .then((response) => response.json())
            .then((json) => {
                setAnime(json.data);
                setBuscando(false);
            })
            .catch((erro) => {
                console.log(erro);
                setBuscando(false);
            });
        }, 1000);
    }

    function getApiAnimeGenres() {
        setBuscando(true);
        setTimeout(() => {
            fetch('https://api.jikan.moe/v4/genres/anime')
            .then((response) => response.json())
            .then((json) => {
                setGenerosAnimes(json.data);
                setBuscando(false);
            })
            .catch((erro) => {
                console.log(erro);
                setBuscando(false);
            });
        }, 1000)
    }
    return {
        getApiAnime,
        getApiAnimeById,
        getApiAnimeGenres
    };
}