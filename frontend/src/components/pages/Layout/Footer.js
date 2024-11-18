import styles from './Footer.module.css'


function Footer() {
    const currentYear = new Date().getFullYear(); 

    return (
        <footer className={styles.footer}>
            <p>
                <span className="bold">Get a Pet</span> &copy; {currentYear}
            </p>
        </footer>
    )
}

export default Footer;
