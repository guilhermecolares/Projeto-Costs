import { useNavigate } from 'react-router-dom'

import styles from './styles/NewProject.module.css'
import ProjectForm from '../project/ProjectForm'

function NewProject() {

    const history = useNavigate()

    function createPost(project) {
        
        // initialize cost and services
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            history('/projects', { state: {text: 'Projeto criado com sucesso!'} })
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>

            <p>Crie seu projeto para depois adicionar os serviços</p>

            <ProjectForm handleSubmit={createPost} btnText='Criar projeto'/>
        </div>
    )
}

export default NewProject