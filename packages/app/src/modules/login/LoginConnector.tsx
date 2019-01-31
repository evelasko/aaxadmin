import * as React from 'react'
// import { SecureStore } from 'expo'
import { LoginController } from '@aaxadmin/controller'
import { RouteComponentProps } from 'react-router-native';

import { LoginView } from './ui/LoginView'
// import { SID_KEY } from '../shared/constants'

export class LoginConnector extends React.PureComponent<RouteComponentProps<{}>> {
    // saveSessionId = (sid: string) => {
    //     SecureStore.setItemAsync(SID_KEY, sid)
    // }
    onFinish = () => {
        this.props.history.push('/me')
    }
    render() {
        return ( 
            <LoginController>
                { ({ submit }) => <LoginView onFinish={this.onFinish}  submit={submit}/> }
            </LoginController>
        )
}}