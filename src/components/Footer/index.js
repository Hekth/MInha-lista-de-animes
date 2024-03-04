import styles from './Footer.module.css';

export default function Footer() {
    return(
        <footer className={styles.footer}>
            <span>
                Feitor por Heitor da Costa Cândido
            </span>
            <span>
                <a href='https://github.com/Hekth' target='_blank' rel='external'>
                    Github
                </a>
            </span>
            <span>
                <a href='https://www.linkedin.com/in/heitor-candido/' target='_blank' rel='external'>
                    Linkedin
                </a>
            </span>
            <span>
                Loading icons provided by {' '}
                <a href='https://loading.io' target='_blank' rel='external'>
                    Loading.io
                </a>
            </span>
        </footer>
    );
}