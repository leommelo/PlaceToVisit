import Logo from '../../assets/Lugares 1.svg'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <img src={Logo} alt="Logo" className='logo-header'/>
    </div>
  )
}

export default Header