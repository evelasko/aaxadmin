import * as React from 'react'
import { Icon, List, message } from 'antd'

import { ConfirmRequest, RejectRequest } from '@aaxadmin/controller'

interface ListProps {
    item: {
        id: string
        name: string
        lastname: string
        group: string
        groupRequest: string
    }
}

export const GroupRequestListItem:React.SFC<ListProps> = ({...props}) => {
    const { item: { id, name, lastname, groupRequest } } = props
    const actions: React.ReactNode[] = [
        <a key={`c${id}`}><ConfirmRequest>{({confirmRequest}) => <Icon type="check-circle" theme="filled" style={{color: '#8cc453'}} 
            onClick={() => {
                confirmRequest({variables:{id}})
                message.success('El usuario ha sido transferido exitosamente')
            }}/> }</ConfirmRequest>
        </a>,
        <a key={`r${id}`}><RejectRequest>{({confirmRequest}) => <Icon type="close-circle" theme="filled" style={{color: '#f17a61'}} 
            onClick={() => {
                confirmRequest({variables:{id}})
                message.success('Solicitud rechazada exitosamente')
                message.info('Se ha notificado al usuario sobre el estado de la solicitud')
            }}/> }</RejectRequest>
        </a>
    ]
    return (
        <List.Item actions={actions} >
            <List.Item.Meta
                title={`${name} ${lastname}`}
                description={`solicita ser: ${groupRequest}`}
            />
        </List.Item>
    )
}