import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import style from './LinkButton.module.css'

const LinkButton = ({to, text}) => {
  return (
    <Link className={style.btn} to={ to }>
      { text }
    </Link>
  )
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default LinkButton