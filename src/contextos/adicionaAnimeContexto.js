import { createContext, useState } from "react";

export const AdicionaAnimeContexto = createContext();

export default function AdicionaAnimeProvider({ children }) {
    const [campo, setCampo] = useState({
        episodio: '0',
        temporada: '1',
        idiomaOriginal: 'Japonês',
        idiomaLegenda: 'Japonês',
        dublagem: 'Japonês',
        notas: '',
        concluido: false
    });

    function handleInputChange(target) {
        let { name, value } = target;
        value = target.value === 'on' ? target.checked : value;
        setCampo({
            ...campo,
            [name]: value 
        });
        console.log(campo);
    }   

    function fodase(target) {
        console.log(target.value);
        
        setCampo({
            ...campo,
            concluido: target.checked
        });
    }
    return(
        <AdicionaAnimeContexto.Provider value={{ handleInputChange, campo, setCampo, fodase }}>
            { children }
        </AdicionaAnimeContexto.Provider>
    );
}