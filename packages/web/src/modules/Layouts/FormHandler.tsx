import * as React from 'react'
import * as _ from 'lodash'

import { CreateNews } from '../news/create/CreateNews'
import { CreateCall } from '../news/create/CreateCall'
import { CreateAlert } from '../news/create/CreateAlert'
import { CreateEventConnector } from '../events/create/CreateEventConnector'
import { CreateVenueConnector } from '../venues/create/CreateVenueConnector'

interface Props {
    onFinish: any
    page: string
    user?: any
}

export const FormHandler: React.SFC<Props> = ({...props}) => {
    const { onFinish, page } = props
    const content = {
        Noticias: <CreateNews onFinish={onFinish} /> ,
        Convocatorias: <CreateCall onFinish={onFinish} /> ,
        Alertas: <CreateAlert onFinish={onFinish} /> ,
        Eventos: <CreateEventConnector onFinish={onFinish} /> ,
        Recintos: <CreateVenueConnector onFinish={onFinish} />
    }
    return _.has(content, page) ? content[page] : <p>Invalid content request...</p>
}
