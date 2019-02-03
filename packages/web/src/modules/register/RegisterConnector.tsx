import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { RegisterController } from '@aaxadmin/controller'

import { RegisterView } from './ui/RegisterView';

export class RegisterConnector extends React.PureComponent<RouteComponentProps<{}>> {
    onFinish = () => {
        this.props.history.push("/m/confirm-email", {
            title:"Tu cuenta ha sido creada",
            message: "Por favor, sigue las instrucciones del email que te hemos enviado para confirmarla y acceder al contenido.",
            type: "success"
        })
    }
    render() {
        return (
            <RegisterController>
                {({submit}: {submit: any}) => <RegisterView onFinish={this.onFinish} submit={submit} />}
            </RegisterController>
        )
    }
}
