import { useEffect, useState  } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import styles from './ProjectForm.module.css'

const ProjectForm = ({ handleSubmit, btnText, projectData }) => {
  const [categories, setCategories] = useState([])
  const [project, setProject] = useState(projectData || {
    name: '',
    budget: ''
  })

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        'Content-type': "application/json"
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setCategories(data)
    })
    .catch((err) => console.error(err))
  }, [])

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project)
  }

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value })
  }

  const handleCategory = (e) => {
    setProject({ ...project, category: {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text
    }})
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <div>
        <Input
          type="text"
          label="Nome do projeto"
          placeholder="Insira o nome do projeto"
          name="name"
          handleOnChange={handleChange}
          value={project.name}
        />
      </div>

      <div>
        <Input
          type="Number"
          label="Orçamento do projeto"
          placeholder="Insira o orçamento total"
          name="budget"
          handleOnChange={handleChange}
          value={project.budget}
        />
      </div>

      <div>
        <Select
          name="category_id"
          label="Selecione a categoria"
          options={categories}
          handleOnChange={handleCategory}
          value={project.category ? project.category.id : ''}
        />
      </div>

      <div>
        <SubmitButton label={btnText} />
      </div>
    </form>
  )
}

export default ProjectForm
