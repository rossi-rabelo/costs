import styles from '../project/ProjectCard.module.css'

import { BsFillTrashFill } from 'react-icons/bs';


const ServiceCard = ({ service, handleRemove }) => {
  const remove = (e) => {
    e.preventDefault()
    handleRemove(service.id, service.cost)
  }

  return (
    <div className={styles.project_card}>
      <h4>{service.name}</h4>

      <p>
        <span>Custo total:</span> R${service.cost}
      </p>

      <p>{service.description}</p>

      <div className={styles.project_card_actions}>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  )
}

export default ServiceCard