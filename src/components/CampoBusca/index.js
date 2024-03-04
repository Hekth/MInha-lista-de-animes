import { useEffect, useState } from 'react';
import styles from './CampoBusca.module.css';
import useGetApiAnime from 'Hooks/getApiAnime';
import { IoSearch } from "react-icons/io5";

export default function CampoBusca({ placeholder }) {
    const opcoes = [5, 10, 15, 20, 25];
    const [qtdExibicao, setQtdExibicao] = useState("5");
    const [pesquisa, setPesquisa] = useState('Naruto');
    const { getApiAnime } = useGetApiAnime();
    
    function buscarAnimes(e) {
        e.preventDefault();
        getApiAnime(pesquisa, qtdExibicao);
    }

    useEffect(() => {
        getApiAnime(pesquisa, qtdExibicao)
    }, []);
    
    return(
        <form className={styles.formulario} onSubmit={(e) => buscarAnimes(e)}>
            <div className={styles.campoForm}>
                <input type='text' placeholder={ placeholder } value={pesquisa} onChange={({target}) => setPesquisa(target.value)} />
                <button type='submit'>
                    <IoSearch size={26} />
                </button>
            </div>
            <div className={styles.opcoes}>
                <select onChange={(e) => {
                    setQtdExibicao(e.target.value);
                    getApiAnime(pesquisa, e.target.value);
                }} value={qtdExibicao}>
                    {opcoes.map((opcao, index) => (
                        <option key={index} value={opcao}>
                            {`Exibir ${opcao} resultados`}
                        </option>
                    ))}
                </select>
            </div>
        </form>
    );
}