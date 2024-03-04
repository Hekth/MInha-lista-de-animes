import { useContext } from 'react';
import CamposFormAddAnime from './CamposFormAddAnime';
import styles from './FormAdicionarAnime.module.css';
import { AdicionaAnimeContexto } from 'contextos/adicionaAnimeContexto';
import useAdicionarAnimeNaLista from 'Hooks/adicionarAnimeNaLista';
import useVerificacoes from 'Hooks/verificacoes';
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { idiomas } from 'utils/idiomas';

export default function FormAdicionarAnime({ episodios }) {
    const { verificaCadastroDoAnime, verificaTipoDaObra } = useVerificacoes();
    const { handleInputChange, campo } = useContext(AdicionaAnimeContexto);
    const { adicionaAnime } = useAdicionarAnimeNaLista();

    function geraSelect(id) {
        return (
            <select key={id} value={campo[id]} onChange={({ target }) => handleInputChange(target)} name={id} className={styles.inputsForm} id={id}>
                {idiomas.map((idioma) => <option key={idioma} value={idioma}> {idioma} </option>)}
            </select>
        );
    }

    return(
        <form 
            onSubmit={(e) => adicionaAnime(e)} 
            className={styles.formulario}
        >
            <h2>
                Adicionar anime na minha lista
            </h2>
            <div className={styles.containerCampos}>
                {!verificaTipoDaObra() 
                &&
                <div>
                    <CamposFormAddAnime key='episodio' id='episodio' msgLabel='Episódio em que você está: ' >
                        <input
                            value={campo['episodio']}
                            onChange={({ target }) => handleInputChange(target)}
                            name='episodio'
                            className={styles.inputsForm}
                            type='number'
                            id='episodio'
                            min='0'
                            max={episodios}
                        />
                    </CamposFormAddAnime>
                    <CamposFormAddAnime key='temporada' id='temporada' msgLabel='Temporada: ' >
                        <input
                            value={campo['temporada']}
                            onChange={({ target }) => handleInputChange(target)} 
                            name='temporada' 
                            className={styles.inputsForm} 
                            type='number' 
                            id='temporada'
                            min='1'
                        />
                    </CamposFormAddAnime>
                </div>
                }
                <div>
                    <CamposFormAddAnime key='idiomaOriginal' id='idiomaOriginal' msgLabel='Idioma original da obra: ' >
                        {geraSelect('idiomaOriginal')}
                    </CamposFormAddAnime>
                    <CamposFormAddAnime key='idiomaLegenda' id='idiomaLegenda' msgLabel='Idioma das legendas: ' >
                        {geraSelect('idiomaLegenda')}
                    </CamposFormAddAnime>
                    <CamposFormAddAnime key='dublagem' id='dublagem' msgLabel='Idioma da dublagem: ' >
                        {geraSelect('dublagem')}
                    </CamposFormAddAnime>
                </div>
                <div>
                    <CamposFormAddAnime key='notas' id='notas' msgLabel='Notas adicionais: ' >
                        {<textarea
                            value={campo['notas']}
                            onChange={({ target }) => handleInputChange(target)} 
                            name='notas' 
                            className={styles.inputsForm} 
                            id='notas'
                            maxLength={100}
                        ></textarea>}
                    </CamposFormAddAnime>
                    <CamposFormAddAnime key='concluido' id='concluido' msgLabel='Marque se você já concluiu a obra:' >
                        {<input
                            checked={campo.concluido}
                            type='checkbox' 
                            id='concluido'
                            name='concluido'
                            onChange={({ target }) => handleInputChange(target)} 
                        />}
                    </CamposFormAddAnime>
                </div>
            </div>
            
            <button 
                className={styles.adicionarAnimeBtn} type='submit' 
                disabled={verificaCadastroDoAnime()}
            >
                {
                    verificaCadastroDoAnime() 
                    ? <span> Já adicionado <AiOutlineCheck /> </span>
                    : <span> Adicionar <AiOutlinePlus /> </span>
                }
            </button>
        </form>
    );
}