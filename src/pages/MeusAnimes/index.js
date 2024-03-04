import { AnimesContexto } from 'contextos/animesContexto';
import styles from './MeusAnimes.module.css';
import { useContext, useEffect, useState } from 'react';
import CardMeusAnimes from './CardMeusAnimes';
import CarregandoComponente from 'components/CarregandoComponente';
import useGetApiAnime from 'Hooks/getApiAnime';
import VoltarBotao from 'components/VoltarBotao';

export default function MeusAnimes() {
    const [busca, setBusca] = useState('');
    const [genero, setGenero] = useState('todos');
    const [favorito, setFavorito] = useState(false);
    const [status, setStatus] = useState('todos');
    const [ordenado, setOrdenado] = useState('recentes');

    const { meusAnimes, generosAnimes, buscando } = useContext(AnimesContexto);
    const { getApiAnimeGenres } = useGetApiAnime();

    useEffect(() => {
        getApiAnimeGenres();
    }, []);

    function ordenarMeusAnimes(filtro) {
        switch(ordenado) {
            case 'titulo':
                return filtro.sort((a, b) => {
                    if (a.titulos[0] < b.titulos[0]) return -1;
                    if (a.titulos[0] > b.titulos[0]) return 1;
                    return 0;
                });
            default:
                return filtro.sort((a, b) => {
                    a = Number(a[ordenado])
                    b = Number(b[ordenado])
                    if (a < b) return 1;
                    if (a > b) return -1;
                    return 0;
                });
        }
    }

    function verificaStatus(concluido) {
        console.log(status, concluido);
        if (status === 'concluido' && concluido) return concluido;
        if (status === 'naoConcluido' && !concluido) return !concluido;
        return false;
    }

    function filtraMeusAnimes() {
        const filtro = meusAnimes.filter((meuAnime) => {
            const filtraPorTitulos = meuAnime.titulos.some((titulo) => titulo.toLowerCase().includes(busca));
            const filtraPorGenero = meuAnime.generos.some((generoAnime) => {
                if (genero === 'todos') return true;
                return generoAnime.name.toLowerCase() === genero;
            });
            const filtraFavorito = favorito ? meuAnime.favorito : true;
            
            const filtraPorStatus = status === 'todos' ? true : verificaStatus(meuAnime.concluido);
            return filtraPorTitulos && filtraPorGenero && filtraFavorito && filtraPorStatus;
        });
        if (ordenado !== 'recentes') return ordenarMeusAnimes(filtro);
        return filtro.reverse();
    }

    if (buscando) return <CarregandoComponente />

    if (meusAnimes.length === 0) {
        return (
            <div className={styles.msgNenhumAnime}>
                <VoltarBotao />
                <span> 
                    Você não adicionou nenhum anime ainda.
                </span>
            </div>
        )
    }
    return(
        <div className={styles.containerPrincipalMeusAnimes}>
            <VoltarBotao />
            <section className={styles.filtroMeusAnimes}>
                <div className={styles.filtro}>
                    <label htmlFor='busca'>Buscar:</label>
                    <input
                        id='busca'
                        value={busca}
                        name='busca' 
                        onChange={({target}) => setBusca(target.value.toLowerCase())} 
                        type='text' 
                        placeholder='Nome do anime cadastrado' 
                    />
                </div>
                <div className={styles.filtro}>
                    <label htmlFor='genero'>
                        Filtrar por genêro:
                    </label>
                    <select
                        id='genero'
                        name='genero'
                        onChange={({ target }) => setGenero(target.value.toLowerCase())}
                    >
                        <option key={"todos"}>Todos</option>
                        {generosAnimes.map((genero) => <option value={genero.name} key={genero.mal_id}>{genero.name}</option>)}
                    </select>
                </div>
                <div className={styles.filtro}>
                    <label htmlFor='status'>
                        Status:
                    </label>
                    <select
                        name='status' 
                        onChange={({target}) => setStatus(target.value)} 
                        id='status'
                    >
                        <option value='todos'>
                            Todos
                        </option>
                        <option value='concluido'>
                            Concluído
                        </option>
                        <option value='naoConcluido'>
                            Não concluído
                        </option>
                    </select>
                </div>
                <div className={styles.filtro}>
                    <label htmlFor='ordenar'>
                        Ordenar por:
                    </label>
                    <select id='ordenar' onChange={({ target }) => setOrdenado(target.value)}>
                        <option value='recentes'>
                            Recentes
                        </option>
                        <option value='titulo'>
                            Título
                        </option>
                        <option value='favorito'>
                            Favoritados
                        </option>
                        <option value='concluido'>
                            Concluídos
                        </option>
                    </select>
                </div>
                <div className={styles.filtroCheckBox}>
                    <label htmlFor='favoritos'>
                        Animes favoritados:
                    </label>
                    <input
                        id='favoritos'
                        value={favorito}
                        name='favorito' 
                        type='checkbox' 
                        onChange={({target}) => setFavorito(target.checked)}
                    />
                </div>
            </section>
            <section className={styles.meusAnimesContainer}>
                {filtraMeusAnimes().length === 0 
                ? <span> Nenhuma obra encontrada.</span>
                : filtraMeusAnimes().map((meuAnime) => (
                    <CardMeusAnimes key={meuAnime.id} meuAnime={meuAnime} />
                ))}
            </section>
        </div>
    );
}