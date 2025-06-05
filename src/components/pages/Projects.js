import { useLocation } from "react-router-dom"

import Message from "../layout/Message"

function Projects() {

    const location = useLocation()
    let msg = ''
    if (location.state) {
        msg = location.state.text
    }

    return (
        <div>
            <h1>Meus Projetos</h1>
            {msg && 
                <Message text={msg} type='success' />
            }
        </div>
    )
}

export default Projects