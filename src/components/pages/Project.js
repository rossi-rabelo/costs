import styles from './Project.module.css'

import { parse, v4 as uuidv4 } from 'uuid'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../layouts/Loading'
import Container from '../layouts/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layouts/Message'
import ServiceForm from '../services/ServiceForm'
import ServiceCard from '../services/ServiceCard'

const Project = () => {
  const { id } = useParams()

  const [project, setProject] = useState({})
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()
  const [showServiceForm, setShowServiceForm] = useState()

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then((data) => {
      setProject(data)
    })
    .catch(err => console.error(err))
  }, [id])

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm)
  }

  const getButtonTitle = () => {
    return !showProjectForm ? 'Editar projeto' : 'Fechar'
  }

  /*Related to Project Editioning*/

  const editPost = (project) => {
    setMessage('')

    if (project.budget < project.cost) {
      setMessage('O orçamento não pode ser menor que o custo do projeto!')
      setType('error')

      return false
    }

    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
    .then(resp => resp.json())
    .then((data) => {
      setProject(data)
      setShowProjectForm(false)
      setMessage('Projeto atualizado!')
      setType('success')
    })
    .catch(err => console.error(err))
  }

  /* Related to Service Form */
  
  const toggleServiceForm = () => {
    setShowServiceForm(!showServiceForm)
  }

  const createService = (service) => {
    setMessage('')
    // last service
    const newCost = parseFloat(project.cost) + parseFloat(service.cost)

    if (newCost > parseFloat(project.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço')
      setType('error')

      return false
    }

    project.services.push(service)
    const lastService = project.services[project.services.length - 1]

    lastService.id = uuidv4()
    project.cost = newCost

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
    .then(resp => resp.json())
    .then(() => {
      setMessage('Serviço adicionado com sucesso');
      setType('success')
      setShowServiceForm(false)
    })
    .catch(error => console.error(error))
  }

  const removeService = (id, cost) => {
    const servicesUpdated = project.services.filter(el => el.id !== id)

    const projectUpdated = project
    projectUpdated.services = servicesUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectUpdated)
    })
    .then(resp => resp.json())
    .then((data) => {
      setProject(data)
      setMessage('Serviço removido com sucesso');
      setType('success')
      setShowServiceForm(false)
    })
    .catch(error => console.error(error))
  }
  
  return (
    <>
      {
        project.name ? (
          <div className={styles.project_details}>
            <Container customClass="column">
              {
              message &&
                <Message
                  type={type}
                  message={message}
                />
              }
              <div className={styles.details_container}>
                <h1>Projeto: {project.name}</h1>

                <button className={styles.btn} onClick={toggleProjectForm}>
                  {getButtonTitle()}
                </button>

                {
                  !showProjectForm ? (
                    <div className={styles.project_info}>
                      <p>
                        <span>Categoria: </span> {project.category.name}
                      </p>

                      <p>
                        <span>Total de orçamento: </span> R${project.budget}
                      </p>

                      <p>
                        <span>Total utilizado: </span> R${project.cost}
                      </p>
                    </div>
                  ) : (
                    <div className={styles.project_info}>
                      <ProjectForm 
                        btnText="Concluir edição"
                        handleSubmit={editPost}
                        projectData={project}
                      />
                    </div>
                  )
                }
              </div>

              <div className={styles.service_form_container}>
                <h2>Adicione um serviço:</h2>

                <button className={styles.btn} onClick={toggleServiceForm}>
                  { !showServiceForm ? 'Adicionar serviço' : 'Fechar' }
                </button>

                <div className={styles.project_info}>
                  {
                    showServiceForm && (
                      <ServiceForm
                        handleSubmit={createService}
                        textBtn="Adicionar serviço"
                        projectData={project}
                      />
                    )
                  }
                </div>
              </div>

              <h2>Serviços</h2>

              <Container customClass="start">
                {
                  project.services.length > 0 &&
                  project.services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      handleRemove={removeService}  
                    />
                  ))
                }

                {
                  project.services.length === 0 &&
                  (
                    <p>Não há serviços cadastrados</p>
                  )
                }
              </Container>
            </Container>
          </div>
        ) : (
          <Loading />
        )
      }
    </>
  )
}

export default Project