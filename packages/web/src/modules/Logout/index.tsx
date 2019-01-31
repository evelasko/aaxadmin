import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { LogoutController, logoutMutation } from '@aaxadmin/controller'
import { CallLogout } from './CallLogout'
import { client } from '../../apollo'


export const logoutUser = async () => {
    await client.mutate({mutation: logoutMutation})
    await client.resetStore()
}




export class Logout extends React.PureComponent<RouteComponentProps<{}>> {
    onFinish = () => { this.props.history.push('/login') }
    render() {
        return <LogoutController>
            {({logout}) => <CallLogout logout={logout} onFinish={this.onFinish}/>}
        </LogoutController>
    }
}