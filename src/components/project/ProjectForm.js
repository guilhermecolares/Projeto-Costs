import { useEffect, useState } from 'react'

import styles from './styles/ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

function ProjectForm({ handleSubmit, btnText, projectData}) {

    const [categorias, setCategorias] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch('http://localhost:5000/categorias', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then((response) => response.json())
        .then((data => setCategorias(data)))
        .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        //console.log(project)
        handleSubmit(project)
    }

    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value})
    }

    const handleCategory = (e) => {
        setProject({ ...project, categorias: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
            type='text' 
            text='Nome do Projeto' 
            name='name' 
            placeholder='Insira um nome do projeto'
            handleOnChange={handleChange}
            value={project.name ? project.name : ''}
            />

            <Input 
            type='number' 
            text='Orçamento do projeto' 
            name='budget' 
            placeholder='Insira o orçamento total'
            handleOnChange={handleChange}
            value={project.budget ? project.budget : ''}
            />

            <Select 
            name='category_id'
            text='Selecione uma categoria'
            options={categorias}
            handleOnChange={handleCategory}
            value={project.categorias ? project.categorias.id : ''}
            />

            <SubmitButton 
            text={btnText}
            />
        </form>
    )
}

export default ProjectForm