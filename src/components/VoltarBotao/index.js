import { useNavigate } from 'react-router-dom';
import styles from  './VoltarBotao.module.css';
import { FaArrowLeft } from "react-icons/fa";
export default function VoltarBotao() {
    const navigate = useNavigate();
    return(
        <div className={styles.voltarBotaoContainer}>
            <button className={styles.voltarBotao} type='submit' onClick={() => navigate(-1)}>
                <FaArrowLeft />
                Voltar
            </button>
        </div>
    );
}