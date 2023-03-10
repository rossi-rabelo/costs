import Message from "../layouts/Message";
import Container from '../layouts/Container';
import LinkButton from '../layouts/LinkButton';
import ProjectCard from "../project/ProjectCard";
import Loading from '../layouts/Loading'

import styles from './Projects.module.css';

import { useLocation } from 'react-router-dom'
import { useState, useEffect } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')

  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      setProjectMessage(location.state.message)
    }
  }, [location.state])


  /*Related to get data*/
  useEffect(() => {
    fetch('http://localhost:5000/projects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setProjects(data)
      setRemoveLoading(true)
    })
    .catch((error) => console.error(error))
  }, [])

  /*Related to project removal*/

  const removeProject = (id) => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
    .then(() => {
      setProjects(projects.filter((el) => el.id !== id))
      setProjectMessage('Projeto removido com sucesso!')
    })
    .catch(err => console.error(err))
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
      <LinkButton to="/new-project"  text='Criar Projeto'/>
      </div>  

      {
        projectMessage && (
          <Message type="success" message={projectMessage}/>
        )
      }
      <Container customClass="start">
        {
          projects.length > 0 &&
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                name={project.name}
                id={project.id}
                budget={project.budget}
                category={project.category.name}
                handleRemove={removeProject}
              />
            ))
        }
        {
          !removeLoading && <Loading />
        }
        {
          removeLoading && projects.length === 0 &&
          (
            <p>N??o h?? projetos cadastrados</p>
          )
        }
      </Container>
    </div>
  )
}

export default Projects;
