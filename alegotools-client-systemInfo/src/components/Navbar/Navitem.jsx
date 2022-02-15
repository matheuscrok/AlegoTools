import './Navitem.scss';
import { AiOutlineHome, AiFillWindows, AiOutlinePrinter } from 'react-icons/ai';
import { GoDesktopDownload } from 'react-icons/go';

const Navitem = (props) => {
  function icon (number) {
    if (number === '1') return (<AiOutlineHome className='navitem__icon' />)
    else if (number === '2') return (<GoDesktopDownload className='navitem__icon' />)
    else if (number === '3') return (<AiOutlinePrinter className='navitem__icon' />)
    else if (number === '4') return (<AiFillWindows className='navitem__icon' />)
  }

  return (
    <div className="navitem">
      {icon(props.icon)}
      <p className="navitem__text">{props.title}</p>
    </div>
  );
}

export default Navitem;