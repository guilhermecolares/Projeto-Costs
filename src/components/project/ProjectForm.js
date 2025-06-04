import { useEffect, useState } from 'react'

import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

function ProjectForm({btnText}) {

    const [categorias, setCategorias] = useState([])

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

    return (
        <form className={styles.form}>
            <Input 
            type='text' 
            text='Nome do Projeto' 
            name='name' 
            placeholder='Insira um nome do projeto'
            />

            <Input 
            type='numer' 
            text='Orçamento do projeto' 
            name='budget' 
            placeholder='Insira o orçamento total'
            />

            <Select 
            name='category_id'
            text='Selecione uma categoria'
            options={categorias}
            />

            <SubmitButton 
            text={btnText}
            />
        </form>
    )
}

export default ProjectForm