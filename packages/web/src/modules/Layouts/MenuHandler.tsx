import * as React from 'react'
import { Menu, Icon } from 'antd'

interface Props {
    onSelect: any
    user?: any
}

export const MenuHandler: React.SFC<Props> = ({...props}) => {
    const { onSelect, user } = props
    let Recintos: any = ''
    if (user && user.isAdmin) {
         Recintos = (<Menu.Item key="Recintos"><Icon type="environment" /><span>Recintos</span></Menu.Item>)
    }
    const content = (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['Noticias']} onSelect={onSelect}>
                    <Menu.Item key="Noticias"><Icon type="read" /><span>Noticias</span></Menu.Item>
                    <Menu.Item key="Alertas"><Icon type="notification" /><span>Alertas</span></Menu.Item>
                    <Menu.Item key="Convocatorias"><Icon type="schedule" /><span>Convocatorias</span></Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="Eventos"><Icon type="calendar" /><span>Eventos</span></Menu.Item>
                    {Recintos}
                    <Menu.Divider />
                </Menu>
    )
    return content
}
