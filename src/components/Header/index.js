import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
    return(
        <header className={styles.cabecalho}>
            <h1 className={styles.tituloCabecalho}>
                Minha Lista de Animes
            </h1>
            <nav className={styles.menu}>
                <Link to='/'>
                    Buscar
                </Link>
                <Link to='/meusAnimes'>
                    Meus Animes
                </Link>
            </nav>
        </header>
    );
}