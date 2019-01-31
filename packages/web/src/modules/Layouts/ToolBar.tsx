import * as React from 'react'
import { Icon, Popover, Row, Col } from 'antd'

import { LoginComponent } from '../login/LoginComponent'
import { UserProfileView } from '../User/UserProfileView'

interface Props {
    showDrawer: any
    user?: any
    goLogout: any
}

export const ToolBar:React.SFC<Props> = ({ ...props }) => {
    const { showDrawer, user, goLogout } = props
    const iconStyle = {padding: 10, marginRight: 15}
    return (
        <Row type="flex" justify="end" align="top" style={{ marginRight: 20, height: 64 }}>
            { user && user.isAdmin ? (
                <Col span={4}>
                    <Icon type="plus" style={iconStyle} onClick={showDrawer} />
                </Col>
            ) : '' 
            }
            <Col span={4}>
                <Popover    content={user ? <UserProfileView user={user} goLogout={goLogout}/> : <LoginComponent /> } 
                            title={user ? "Tu perfil" : "Login"}
                            trigger="hover"
                >
                    <Icon type={user ? "user" : "login"} style={iconStyle}/>
                </Popover>
            </Col>
        </Row>
    )
}