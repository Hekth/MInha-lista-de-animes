import { AdicionaAnimeContexto } from "contextos/adicionaAnimeContexto";
import { AnimesContexto } from "contextos/animesContexto";
import { useContext } from "react";

export default function useAdicionarAnimeNaLista() {
    const { campo, setCampo } = useContext(AdicionaAnimeContexto);
    const { meusAnimes, setMeusAnimes, anime } = useContext(AnimesContexto);

    function adicionaAnimesNoLocalStorage(animes) {
        localStorage.setItem('meusAnimes', JSON.stringify(animes));
    }

    function adicionaAnime(e) {
        e.preventDefault();
        const meuAnime = {
            ...campo,
            id: anime.mal_id,
            img: anime.images.jpg.image_url,
            titulos: [anime.title, anime.title_english],
            filme: anime.type === 'Movie',
            duracao: anime.duration,
            totalEp: anime.episodes,
            favorito: false,
            generos: anime.genres
        };

        const meusAnimesAtt = [...meusAnimes, meuAnime]
        adicionaAnimesNoLocalStorage(meusAnimesAtt);
        setMeusAnimes(meusAnimesAtt);
        resetarFormulario();
    }

    function excluiAnime(id) {
        const animeExcluido = meusAnimes.filter((meuAnime) => meuAnime.id !== id);
        adicionaAnimesNoLocalStorage(animeExcluido);
        setMeusAnimes(animeExcluido);
    }

    function favoritaAnime(id) {
        const favoritado = meusAnimes.map((meuAnime) => {
            if (meuAnime.id === id) {
                meuAnime.favorito = !meuAnime.favorito;
                return meuAnime;
            }
            return meuAnime;
        });

        adicionaAnimesNoLocalStorage(favoritado);
        setMeusAnimes(favoritado);
    }
    
    function resetarFormulario() {
        setCampo({
            episodio: '0',
            temporada: '1',
            idiomaOriginal: 'Japonês',
            idiomaLegenda: 'Japonês',
            dublagem: 'Japonês',
            notas: '',
            concluido: false
        });
    }

    function atualizarAnime(e, id, animeAtualizado) {
        e.preventDefault();
        const atualiza = meusAnimes.map((meuAnime) => {
            if (meuAnime.id === id) {
                meuAnime = {...meuAnime, ...animeAtualizado}
                return meuAnime;
            }
            return meuAnime
        });
        adicionaAnimesNoLocalStorage(atualiza);
        setMeusAnimes(atualiza);
        alert('Informações atualizadas com sucesso!');
    }
    return {
        adicionaAnime,
        resetarFormulario,
        excluiAnime,
        favoritaAnime,
        atualizarAnime
    };
}