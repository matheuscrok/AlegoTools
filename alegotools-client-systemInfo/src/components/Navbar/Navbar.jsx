import { Link } from 'react-router-dom';
import './Navbar.scss';

import Navitem from './Navitem'




const Navbar = () => {
  const changeFocus = (e) => {
    e.preventDefault();
    const navClicked = e.target.closest('.navbar__nav__link');
    if (!navClicked) return;

    // First -> Remove the previous highlight
    const allNavs = [...navClicked.parentElement.children];
    allNavs.forEach((nav) => {
      nav.classList.remove('navbar__nav__link--active');
    })

    // Second -> Add hightlight to the current nav open
    navClicked.classList.add('navbar__nav__link--active');
  }

  return (
      <div className="navbar">
        <div className="navbar__nav" onClick={changeFocus}>
          <Link to='/' className="navbar__nav__link navbar__nav__link--active"><Navitem title='Home' icon='1' /></Link>
          <Link to='/programs' className="navbar__nav__link"><Navitem title='Programas' icon='2'/></Link>
          <Link to='/drivers' className="navbar__nav__link"><Navitem title='Drivers' icon='3'/></Link>
          <Link to='/system' className="navbar__nav__link"><Navitem title='Sistema' icon='4'/></Link>
        </div>
      </div>
  );
}

export default Navbar;