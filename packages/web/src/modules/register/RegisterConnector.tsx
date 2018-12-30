import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { RegisterController } from '@aaxadmin/controller'

import { RegisterView } from './ui/RegisterView';

export class RegisterConnector extends React.PureComponent<RouteComponentProps<{}>> {
    onFinish = () => {
        this.props.history.push("/m/confirm-email", {message: "Please check your email to confirm your account"})
    }
    render() {
        return (
            <RegisterController>
                {({submit}: {submit: any}) => <RegisterView onFinish={this.onFinish} submit={submit} />}
            </RegisterController>
        )
    }
}
