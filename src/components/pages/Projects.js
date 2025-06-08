import { useLocation } from "react-router-dom"

import { useState, useEffect } from "react"

import Message from "../layout/Message"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import Loader from "../layout/Loader"
import ProjectCard from "../project/ProjectCard"


import styles from "./styles/Projects.module.css"

function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let msg = ''
    if (location.state) {
        msg = location.state.text
    }

    useEffect(() => {

        fetch('http://localhost:5000/projects', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            return new Promise((resolve) => {

                const timer = (Math.random() * (1 - 0) + 0) * 1000

                setTimeout(() => {
                    console.log(data)
                    setProjects(data)
                    setRemoveLoading(true)
                    resolve(data)

                     
                }, timer)
            })
        })
        .catch((err) => console.log(err))

    }, [])

    function removeProject(id) {
        setProjectMessage('')

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>

            {msg && 
                <Message text={msg} type='success' />
            }

            {projectMessage && 
                <Message text={projectMessage} type='success' />
            }

            <Container customClass='start'>
                {projects.length > 0 && 
                    projects.map((project) => (
                        <ProjectCard 
                        key={project.id} 
                        id={project.id} 
                        name={project.name}
                        budget={project.budget}
                        category={project.categorias.name}
                        handleRemove={removeProject}
                        />
                    ))
                }

                {!removeLoading && <Loader />}
                {removeLoading && projects.length === 0 &&
                    <p>Não há projetos cadastrados!</p>
                }
            </Container>
        </div>
    )
}

export default Projects