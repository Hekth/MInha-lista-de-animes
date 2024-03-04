import styles from './AnimeInfo.module.css';
import DivInfoComponente from './DivInfoComponente';
import FormAdicionarAnime from './FormAdicionarAnime';
export default function AnimeInfo({ anime }) {
    const { 
        images, 
        title, 
        title_english, 
        episodes, 
        genres, 
        studios,
        producers,
        aired,
        season,
        duration,
        synopsis,
        type,
        broadcast
    } = anime;
    
    function formataData(dataEstreia) {
        const data = new Date(dataEstreia);
        return data.toLocaleDateString('pt-BR');
    }

    function formatarString(array) {
        return array.map((item) => item.name).join(' - ');
    }

    function traduzDiaDaSemana(dia, horario) {
        if (!dia) return false;
        const dias = {
            'saturdays': 'Sábados',
            'mondays': 'Segundas',
            'sundays': 'Domingos',
            'tuesdays':'Terças',
            'wednesdays': 'Quartas',
            'thursdays': 'Quintas',
            'fridays': 'Sextas'
        };

        return `${dias[dia.toLowerCase()]} - ${horario}`;
    }
    
    return(
        <>
            <div className={styles.containerPrincipal}>
                <aside className={styles.asideAnimeImg}>
                    <figure className={styles.containerAnimeImg}>
                        <img className={styles.animeImg} src={images.jpg.large_image_url} alt={`Capa do anime ${title}`} />
                        <figcaption className={styles.animeImgSubtitle}>
                            <p>
                                {title}
                            </p>
                        </figcaption>
                    </figure>
                </aside>
                <article className={styles.animeInfosComplementares}>
                    <h2>
                        Informações Complementares
                    </h2>
                    
                    <DivInfoComponente titulo={"Título em Roomaji: "} conteudo={title} />
                    <DivInfoComponente titulo={"Título em Inglês: "} conteudo={title_english} />
                    <DivInfoComponente titulo={"Número de episódios: "} conteudo={episodes} />
                    <DivInfoComponente titulo={"Duração do episódio: "} conteudo={duration} />
                    <DivInfoComponente titulo={"Dia de exibição: "} conteudo={traduzDiaDaSemana(broadcast.day, broadcast.time)} />
                    <DivInfoComponente titulo={"Gêneros: "} conteudo={formatarString(genres)} />
                    <DivInfoComponente titulo={"Estúdios: "} conteudo={formatarString(studios)} />
                    <DivInfoComponente titulo={"Produtores: "} conteudo={formatarString(producers)} />
                    <DivInfoComponente titulo={"Data de estreia: "} conteudo={formataData(aired.from)} />
                    <DivInfoComponente titulo={"Temporada: "} conteudo={season} />
                    <DivInfoComponente titulo={"Tipo: "} conteudo={type} />
                    <DivInfoComponente titulo={"Sinopse: "} conteudo={synopsis} />
                </article>
            </div>

            <FormAdicionarAnime episodios={episodes} />
        </>
    );
}