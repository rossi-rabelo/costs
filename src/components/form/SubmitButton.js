import styles from './SubmitButton.module.css'

const SubmitButton = ({ label }) => {
  return (
    <div>
      <button className={styles.btn}>{label}</button>
    </div>
  )
}

export default SubmitButton