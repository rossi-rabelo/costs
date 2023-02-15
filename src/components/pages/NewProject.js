import ProjectForm from '../project/ProjectForm'

import styles from './NewProject.module.css'

import { useNavigate } from 'react-router-dom'

const NewProject = () => {
  const history = useNavigate()

  const createPost = (project) => {

    // initialize cost and services
    project.cost = 0;
    project.services = []

    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(project)
    })
    .then(resp => resp.json())
    .then(data => {
      history('/projects', {state: { message: 'Projeto criado com sucesso!' }})
    })
    .catch(err => console.error(err))
  }

  return (
    <div className={styles.newProject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar projeto"/>
    </div>
  )
}

export default NewProject