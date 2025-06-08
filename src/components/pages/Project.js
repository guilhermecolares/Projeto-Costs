import styles from './styles/Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loader from '../layout/Loader'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'

function Project() {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then((response) => response.json())
            .then((data) => {
                setProject(data)
            })
            .catch((err) => console.log(err))
            }, (Math.random() * (1 - 0) + 0) * 1000)
    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function editPost(project) {
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(response => response.json())
        .then(data => {
            setProject(data)
            setShowProjectForm(!showProjectForm)
            setMessage('Projeto editado com sucesso!')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass='column'>
                     {message && <Message type={type} text={message}/>}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project?.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar Projeto'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project?.categorias?.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R${project?.budget}
                                    </p>
                                    <p>
                                        <span>Total Gasto:</span> R${project?.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm 
                                    handleSubmit={editPost} 
                                    btnText='Concluir Edição'
                                    projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default Project