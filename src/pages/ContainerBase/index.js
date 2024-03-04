import Header from 'components/Header';
import styles from './ContainerBase.module.css';
import { Outlet } from 'react-router-dom';
import Footer from 'components/Footer';

export default function ContainerBase() {
    return(
        <main className={styles.principal}>
            <Header />
            <Outlet />
            <Footer />
        </main>
    );
}