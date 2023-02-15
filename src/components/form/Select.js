import styles from './Select.module.css'

const Select = (
  { 
    label,
    name,
    options,
    handleOnChange,
    value
  }
) => {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        onChange={handleOnChange}
        value={value || ''}
      >
        <option>Selecione a categoria</option>
        {
          options.map((option) => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))
        }
      </select>
    </div>
  )
}

export default Select