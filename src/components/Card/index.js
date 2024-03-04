import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';

export default function Card(props) {
    const { images, mal_id, title} = props;
    const navigate = useNavigate();

    return(
        <>
            <div 
                style={{backgroundImage: `url(${images.jpg.large_image_url})`}}
                className={styles.imgContainer}
            >
            </div>
            <h3 className={styles.tituloObra}>
                {title}
            </h3>
            <button onClick={() => navigate(`/adicionar/${mal_id}`)} className={styles.adicionatBtn} type='button'>
                Adicionar
            </button>
        </>
    );
}