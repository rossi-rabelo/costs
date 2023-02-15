import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import React from 'react'

import style from './Footer.module.css'

const icons = [
  FaFacebook,
  FaInstagram,
  FaLinkedin
]

const Footer = () => {
  return (
    <footer className={style.footer}>
      <ul className={style.social_list}>
        {
          icons.map((el, index) => {
            return <li key={index}>{React.createElement(el)}</li>
          })
        }
      </ul>

      <p className={style.copy_right}>
        <span>Costs</span>
        &copy; 2021
      </p>
    </footer>
  )
}

export default Footer;
