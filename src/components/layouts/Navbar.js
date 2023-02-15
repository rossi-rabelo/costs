import { Link } from 'react-router-dom'

import Container from './Container'

import styles from './Navbar.module.css'
import logo from '../../img/costs_logo.png'

const routes = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Projetos',
    path: '/projects'
  },
  {
    name: 'Contato',
    path: '/contact'
  },
  {
    name: 'Empresa',
    path: '/company'
  },
  {
    name: 'Novo Projeto',
    path: '/new-project'
  }
]

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="Costs"/>
        </Link>

        <ul className={styles.list}>
          {
            routes.map((el, index) => (
              <li className={styles.item} key={index}>
                <Link to={el.path}>
                  {el.name}
                </Link>
              </li>
            ))
          }
        </ul>
      </Container>
    </nav>
  )
}

export default Navbar