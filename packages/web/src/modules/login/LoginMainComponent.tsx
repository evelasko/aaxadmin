import * as React from 'react'
import { LoginController } from '@aaxadmin/controller'
import { client } from '../../apollo'
import { LoginView } from './ui/LoginView'

export class LoginMainComponent extends React.PureComponent {
    onFinish = async () => {
        await client.resetStore()
        console.log('finished login')
    }
    render() {
        return (
            <LoginController>
               { ({submit}) => <LoginView onFinish={this.onFinish} submit={submit} /> }
            </LoginController>
        )
    }
}
