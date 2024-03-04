import { createContext, useEffect, useState } from "react";

export const AnimesContexto = createContext();

export default function AnimesProvider({ children }) {
    const [animes, setAnimes] = useState([]);
    const [anime, setAnime] = useState({});
    const [buscando, setBuscando] = useState(false);
    const [meusAnimes, setMeusAnimes] = useState([]);
    const [generosAnimes, setGenerosAnimes] = useState([]);
    
    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('meusAnimes')) || [];
        setMeusAnimes(storage);
    } , []);
    
    return(
        <AnimesContexto.Provider value={{ 
            animes, 
            setAnimes, 
            buscando, 
            setBuscando,
            anime,
            setAnime,
            meusAnimes,
            setMeusAnimes,
            generosAnimes,
            setGenerosAnimes
        }}>
            { children }
        </AnimesContexto.Provider>
    );
}