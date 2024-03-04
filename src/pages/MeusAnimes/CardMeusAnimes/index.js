import { useNavigate } from 'react-router-dom';
import styles from './CardMeusAnimes.module.css';
import { AiOutlineCloseCircle, AiOutlineCheck } from "react-icons/ai";
import { MdOutlineFavoriteBorder, MdOutlineFavorite, MdModeEditOutline } from "react-icons/md";
import useAdicionarAnimeNaLista from 'Hooks/adicionarAnimeNaLista';
import { idiomas } from 'utils/idiomas';
import classNames from 'classnames';
import { useState } from 'react';

export default function CardMeusAnimes({ meuAnime }) {
    const { episodio, temporada, idiomaOriginal, idiomaLegenda, dublagem, notas, concluido } = meuAnime;
    const [attAnime, setAttAnime] = useState({
        episodio,
        temporada,
        idiomaOriginal,
        idiomaLegenda,
        dublagem,
        notas,
        concluido
    });

    const navigate = useNavigate();
    const { excluiAnime, favoritaAnime, atualizarAnime } = useAdicionarAnimeNaLista();
 
    function handleInputChange(target) {
        let { name, value } = target;
        value = target.value === 'on' ? target.checked : value;
        setAttAnime({
            ...attAnime,
            [name]: value
        });
    }   

    function fecharModalAtualizarAnime() {
        document.getElementById(`atualizar-${meuAnime.id}`).close();
        setAttAnime({episodio, temporada, idiomaLegenda, idiomaOriginal, dublagem, notas, concluido});
    }

    if (meuAnime.concluido) meuAnime.episodio = meuAnime.totalEp;

    if (meuAnime.episodio === meuAnime.totalEp.toString()) meuAnime.concluido = true;

    return(
        <div className={classNames({
            [styles.cardContainer]: true,
        })}>
            <div onClick={() => navigate(`/adicionar/${meuAnime.id}`)}>
                <img 
                    className={classNames({
                        [styles.imgContainer]: true,
                        [styles.concluidoBorda]: concluido
                    })} 
                    src={meuAnime.img} 
                    alt={`Imagem do anime ${meuAnime.titulos[0]}`}
                />
            </div>
            <div className={styles.cardOpcoes}>
                <AiOutlineCloseCircle 
                    className={styles.opcao} 
                    onClick={() => excluiAnime(meuAnime.id)} 
                    size={22}
                />
                <MdModeEditOutline 
                    className={styles.opcao} 
                    size={22} 
                    onClick={() => document.getElementById(`atualizar-${meuAnime.id}`).showModal()} 
                />
                {meuAnime.favorito 
                    ? <MdOutlineFavorite 
                        className={styles.opcao} 
                        onClick={() => favoritaAnime(meuAnime.id)}
                        size={22}
                        color='darkred'
                        /> 
                    : <MdOutlineFavoriteBorder 
                        className={styles.opcao} 
                        onClick={() => favoritaAnime(meuAnime.id)} 
                        size={22} 
                        color='darkred'
                    />}
            </div>
            <div className={concluido ? styles.concluido : styles.naoConcluido}>
                <AiOutlineCheck size={20}/>
            </div>
            <button 
                className={styles.verMaisBtn} 
                onClick={() => document.getElementById(`mostrar-${meuAnime.id}`).showModal()}
            >
                Ver mais
            </button>
            <dialog id={`mostrar-${meuAnime.id}`} className={styles.modal}>
                <div className={styles.modalContainer}>
                    <div 
                        className={styles.fechaModal} 
                        onClick={() => document.getElementById(`mostrar-${meuAnime.id}`).close()}>
                        <AiOutlineCloseCircle size={32} />
                    </div>
                    <img
                        src={meuAnime.img}
                        alt={`Imagem do anime ${meuAnime.titulos[0]}`}
                    />
                    <div className={styles.modalContainerInfos}>
                        <div>
                            <h2>Títulos:</h2>
                            <p>{meuAnime.titulos.join(', ')}</p>
                        </div>
                        <div>
                            <h2>
                                Idiomas:
                            </h2>
                            <p>
                                Original - {meuAnime.idiomaOriginal}
                            </p>
                            <p>
                                Dublagem - {meuAnime.dublagem}
                            </p>
                            <p>
                                Legendas - {meuAnime.idiomaLegenda}
                            </p>
                        </div>
                        {meuAnime.filme 
                            ? 
                            (
                                <div>
                                    <h2>
                                        Duração do filme:
                                    </h2>
                                    <p>
                                       {meuAnime.duracao}
                                    </p>
                                </div>
                            )
                            :
                            (
                                <div> 
                                    <h2> Episódio/Temporada: </h2>
                                    <p>Episódio: {meuAnime.episodio}/{meuAnime.totalEp}</p>
                                    <p>Temporada: {meuAnime.temporada} </p>
                                </div>
                            )
                        }
                            
                        <div>
                            <h2>
                                Notas:
                            </h2>
                            <p>{meuAnime.notas ? meuAnime.notas : 'Nenhuma nota adicionada.'}</p>
                        </div>
                        
                        <div>
                            <h2>
                                Concluído:
                            </h2>
                            <p> {meuAnime.concluido ? 'Sim' : 'Não'} </p>
                        </div>
                    </div>
                </div>
            </dialog>
            <dialog id={`atualizar-${meuAnime.id}`} className={styles.modalAtualizarAnime}>
                <div 
                    className={styles.fechaModal} 
                    onClick={() => fecharModalAtualizarAnime()}
                >
                    <AiOutlineCloseCircle size={32} />
                </div>
                <form 
                    onSubmit={(e) => atualizarAnime(e, meuAnime.id, attAnime)} 
                    className={styles.formAtualizarAnime}>
                    <h2>
                        Atualizar Obra: {meuAnime.titulos[0]}
                    </h2>
                    <div key='ep'>
                        <label htmlFor='episodio'>Episódio:</label>
                        <input
                            key='ep'
                            id='episodio'
                            name='episodio'
                            type='number'
                            min={0}
                            max={meuAnime.totalEp}
                            value={attAnime.episodio}
                            onChange={({ target }) => handleInputChange(target)}
                        />
                    </div>
                    <div key='temp' >
                        <label htmlFor='temp'>Temporada:</label>
                        <input
                            key='temp' 
                            id='temp' 
                            name='temporada' 
                            type='number' 
                            min={1} 
                            value={attAnime.temporada} 
                            onChange={({ target }) => handleInputChange(target)} 
                        />
                    </div>
                    <div key='origninal'>
                        <label htmlFor='original'>Idioma Original:</label>
                        <select
                            key='origninal'
                            id='original'
                            name='idiomaOriginal'
                            onChange={({ target }) => handleInputChange(target)} 
                            value={attAnime.idiomaOriginal}
                        >
                            {idiomas.map((idioma) => <option key={idioma}>{idioma}</option>)}
                        </select>
                    </div>
                    <div key='legenda'>
                        <label htmlFor='legenda'>Idioma das legendas:</label>
                        <select
                            key='legenda'
                            id='legenda'
                            name='idiomaLegenda'
                            onChange={({ target }) => handleInputChange(target)} 
                            value={attAnime.idiomaLegenda}>{idiomas.map((idioma) => <option key={idioma}>{idioma}</option>)}
                        </select>
                    </div>
                    <div key='dub'>
                        <label htmlFor='dub'>Idioma da Dublagem:</label>
                        <select
                            key='dub'
                            id='dub'
                            name='dublagem'
                            onChange={({ target }) => handleInputChange(target)} 
                            value={attAnime.dublagem}>{idiomas.map((idioma) => <option key={idioma}>{idioma}</option>)}
                        </select>
                    </div>
                    <div key='notas'>
                        <label htmlFor='notas'>Notas adicionais</label>
                        <textarea
                            key='notas'
                            id='notas'
                            name='notas'
                            onChange={({ target }) => handleInputChange(target)} 
                            value={attAnime.notas}
                            maxLength={100} 
                        />
                    </div>
                    <div key='concluido'>
                        <label htmlFor='concluido' >Marque se a obra já foi concluída:</label>
                        <input
                            checked={attAnime.concluido} 
                            name='concluido' 
                            type='checkbox' 
                            onChange={({ target }) => handleInputChange(target)}
                            id='concluido'
                        />
                    </div>
                    <button type='submit' className={styles.atualizarAnimeBtn}>
                        Atualizar
                    </button>
                </form>
            </dialog>
        </div>
    );
}