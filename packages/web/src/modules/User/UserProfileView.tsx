import * as React from 'react'
import { Card, Icon, Tooltip, Drawer } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { ChangePasswordComponent } from '../ChangePassword/ChangePasswordComponent'

interface DataProps {
    user: any
    goLogout: any
}
const ProfileView: React.SFC<DataProps & RouteComponentProps> = ({...props}) => {
    const { user, goLogout } = props
    const changePassword = () => {
        return (
            <Drawer visible={true} closable={true}>
                <ChangePasswordComponent onFinish={goLogout}/>
            </Drawer>
        )
    }
    return (
            <Card
                bordered={false}
                actions={[
                    (<Tooltip title="editar pefil"><Icon key="edit" type="edit" /></Tooltip>),
                    (<Tooltip title="cambiar contraseña"><Icon key="password" type="key" onClick={e => { changePassword() }} /></Tooltip>),
                    (<Tooltip title="cerrar sesión"><Icon   key="logout" 
                                                            type="logout" 
                                                            onClick={e => { 
                                                                goLogout()
                                                                props.history.push('/login')
                                                            }} />
                    </Tooltip>)
                ]}
            >
                <p>{`${user.name} ${user.lastname}`}</p>
                <p>{user.email}</p>
                <p>{user.group}</p>
            </Card> 
    )
} 

export const UserProfileView = withRouter(ProfileView)