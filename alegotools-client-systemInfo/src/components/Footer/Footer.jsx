import './Footer.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer__group1">
        <p className="footer__group1__content">&copy; AlegoTools</p>
        <p className="footer__group1__content">Versão: 1.0.0</p>
        <p className="footer__group1__content"><a href="https://github.com/lucamartins" target="_blank" rel="noreferrer" className="footer__group1__content__link">Github</a></p>
      </div>

      <div className="footer__group2">
        <p className="footer__group2__content">ALEGO, 2021 - Todos os direitos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;