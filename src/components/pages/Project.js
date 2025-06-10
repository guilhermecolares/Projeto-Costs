import styles from './styles/Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loader from '../layout/Loader'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

import { parse, v4 as uuidv4 } from 'uuid'

function Project() {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
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
                setServices(data.services)
            })
            .catch((err) => console.log(err))
            }, (Math.random() * (1 - 0) + 0) * 1000)
    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function removeService(id, costPraRemover) {
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
            )

        const projectUpdated = { ...project}

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated?.cost || 0) - parseFloat(costPraRemover || 0)
        projectUpdated.rest = parseFloat(projectUpdated?.budget || 0) - projectUpdated.cost

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then(response => response.json())
        .then(data => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso!')
            setType('success')
            setTimeout(() => {
                setMessage('')
                setType('')
            }, 3000);
        })
        .catch(err => console.log(err))
    }

    function createService(projectUpdateFromForm) {

        const lastService = projectUpdateFromForm.services[projectUpdateFromForm.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = parseFloat(lastService.costService)

        const newCost = parseFloat(projectUpdateFromForm.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(projectUpdateFromForm.budget)) {
            console.log("createService: IF de ERRO ativado!");
            setMessage('Orçamento de projeto estourado! o valor inserido não pode passar.')
            setType('error')
            projectUpdateFromForm.services.pop()
            setTimeout(() => {
                setMessage('');
                setType('');
                console.log("createService: Mensagem de erro zerada após timeout.");
            }, 3000);
            return false
        }

        projectUpdateFromForm.cost = newCost

        projectUpdateFromForm.rest = parseFloat(projectUpdateFromForm?.budget || 0) - projectUpdateFromForm.cost

        console.log('Budget:', projectUpdateFromForm?.budget);
        console.log('Cost:', projectUpdateFromForm?.Cost);

        fetch(`http://localhost:5000/projects/${projectUpdateFromForm.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdateFromForm)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setProject(data)
            setServices(data.services)
            setShowServiceForm(false)
            setMessage(`Serviço criado com sucesso! (${lastService.nameService}: R$${lastServiceCost})`)
            setType('success')
            setTimeout(() => {
                setMessage('')
                setType('')
            }, 3000)
        })
        .catch(err => {
            console.error("DEBUG: Erro no fetch de adicionar serviço:", err); // Use console.error para destacar
            setMessage('Ocorreu um erro ao adicionar o serviço.')
            setType('error');
            setTimeout(() => {
                setMessage('')
                setType('')
            }, 3000)
        })
    }

    function editPost(project) {
        setMessage('')

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
            setServices(data.services)
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
                                    <p>
                                        <span>Orçamento restante:</span> R${project?.rest}
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
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar Serviço'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                    handleSubmit={createService}
                                    btnText='Adicionar Serviço'
                                    projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                            <h2>Serviços</h2>
                            <Container customClass='start'>
                                {services.length > 0 && 
                                    services.map(service => (
                                        <ServiceCard 
                                            id={service.id}
                                            name={service.nameService}
                                            cost={service.costService}
                                            description={service.descriptionService}
                                            key={service.id}
                                            handleRemove={removeService}
                                        />
                                    ))
                                }

                                {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                            </Container>
                    </Container>
                </div>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default Project