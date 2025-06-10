import { useState } from 'react'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

import styles from '../project/styles/ProjectForm.module.css'

function ServiceForm({ handleSubmit, btnText, projectData }) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        const updatedProject = { ...projectData}
        updatedProject.services = [ ...updatedProject.services, service]
        handleSubmit(updatedProject)
        setService({})
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type='text'
                text='Nome do Serviço'
                name='nameService'
                placeholder='Insira o nome do serviço...'
                handleOnChange={handleChange}
                value={service.nameService ? service.nameService : ''}
            />
            <Input
                type='number'
                text='Custo do Serviço'
                name='costService'
                placeholder='Insira o valor do serviço...'
                handleOnChange={handleChange}
                value={service.costService ? service.costService : ''}
            />
            <Input
                type='text'
                text='Descrição do Serviço'
                name='descriptionService'
                placeholder='Insira a descrição do serviço...'
                handleOnChange={handleChange}
                value={service.descriptionService ? service.descriptionService : ''}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ServiceForm