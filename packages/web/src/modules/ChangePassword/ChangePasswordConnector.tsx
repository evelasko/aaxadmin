import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ChangePasswordController } from '@aaxadmin/controller'

import { ChangePasswordView } from './ui/ChangePasswordView'

export class ChangePasswordConnector extends React.PureComponent<RouteComponentProps<{key: string}>> {

    onFinish = () => { this.props.history.push('/login') }

    render() {
        const { match: { params: { key } } } = this.props
        return (
            <ChangePasswordController>
                { 
                    ({submit}) => <ChangePasswordView 
                                        key={key} 
                                        onFinish={this.onFinish}
                                        submit={submit}
                                    />
                } 
            </ChangePasswordController>
        )
    }
}
