import { Col, Icon, Popover, Row } from 'antd';
import * as React from 'react';
import { LoginComponent } from '../login/LoginComponent';
import { UserProfileView } from '../user/UserProfileView';


interface Props {
    showDrawer: any
    user?: any
    goLogout: any
    page: string
}

export const ToolBar:React.SFC<Props> = ({ ...props }) => {
    const { showDrawer, user, goLogout, page } = props
    const iconStyle = {padding: 10, marginRight: 15}
    return (
        <Row type="flex" justify="end" align="top" style={{ marginRight: 20, height: 64 }}>
            { user && user.isAdmin ? (
                <Col span={12}>
                    {
                    (page === 'Usuarios' || page === 'General' || page === 'Staff' || page === 'Alumnos') ?
                    <div />
                    : <Icon type="plus" style={iconStyle} onClick={showDrawer} />
                    }
                </Col>
            ) : <div /> 
            }
            <Col span={2}>
                <Popover    content={user ? <UserProfileView user={user} goLogout={goLogout}/> : <LoginComponent /> } 
                            title={user ? "Tu perfil" : "Iniciar Sesión"}
                            trigger="hover"
                >
                    <Icon type={user ? "user" : "login"} style={iconStyle}/>
                </Popover>
            </Col>
        </Row>
    )
}