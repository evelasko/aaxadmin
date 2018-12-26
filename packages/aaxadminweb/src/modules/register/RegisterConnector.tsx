import * as React from 'react'
import { RegisterController } from '@aaxadmin/controller'
import { RegisterView } from './ui/RegisterView';

export class RegisterConnector extends React.PureComponent {
    render() {
        return (
            <RegisterController>
                {({submit}) => <RegisterView submit={submit} />}
            </RegisterController>
        )
}}
