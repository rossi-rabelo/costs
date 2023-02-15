import styles from './Input.module.css'

const Input = (
    { type,
      label,
      name,
      placeholder,
      handleOnChange,
      value
    }
) => {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        id={name}
        name={name}
        onChange={handleOnChange}
        value={value}
      />
    </div>
  )
}

export default Input