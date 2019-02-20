import * as React from 'react'
import { LoginController } from '@aaxadmin/controller'
import { LoginMainView } from './ui/LoginMainView'
import { RouteComponentProps } from 'react-router-dom'

export class LoginConnector extends React.PureComponent<RouteComponentProps<{}>> {
    onFinish = () => {
        const {history, location: {state}} = this.props
        if (state && state.next) {return history.push(state.next)}
        history.push('/')
    }
    render() {
        return (
            <LoginController>
               { ({submit}) => <LoginMainView onFinish={this.onFinish} submit={submit} /> }
            </LoginController>
        )
    }
}
