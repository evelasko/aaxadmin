import * as React from 'react'
import { Menu, Icon } from 'antd'

import { GroupRequestView } from '../user/groupRequest/groupRequestView'

const SubMenu = Menu.SubMenu

interface Props {
    onSelect: any
    user?: any
}

export const MenuHandler: React.SFC<Props> = ({...props}) => {
    const { onSelect, user } = props
    let Recintos: any = ''
    let Usuarios: any = ''
    if (user && user.isAdmin) {
         Recintos = (<Menu.Item key="Recintos"><Icon type="environment" /><span>Recintos</span></Menu.Item>)
         Usuarios = (
             <SubMenu key="Usuarios" title={<span><Icon type="team" /><span>Usuarios</span></span>}>
                <Menu.Item key="General"><span>General</span><GroupRequestView useBadge={true} /></Menu.Item>
                <Menu.Item key="Staff"><span>Staff</span></Menu.Item>
                <Menu.Item key="Alumnos"><span>Alumnos</span></Menu.Item>
            </SubMenu>
            )
    }
    const content = (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['Noticias']} onSelect={onSelect}>
                <Menu.Item key="Noticias"><Icon type="read" /><span>Noticias</span></Menu.Item>
                <Menu.Item key="Alertas"><Icon type="notification" /><span>Alertas</span></Menu.Item>
                <Menu.Item key="Convocatorias"><Icon type="schedule" /><span>Convocatorias</span></Menu.Item>
                <Menu.Divider />
                <Menu.Item key="Eventos"><Icon type="calendar" /><span>Eventos</span></Menu.Item>
                {Recintos}
                {Usuarios}
                <Menu.Divider />
        </Menu>
    )
    return content
}
