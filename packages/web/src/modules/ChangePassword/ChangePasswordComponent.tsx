import * as React from 'react'
import { ChangePasswordController } from '@aaxadmin/controller'

import { ChangePasswordView } from './ui/ChangePasswordView'

export class ChangePasswordComponent extends React.PureComponent<{key?: string, onFinish: any}> {
    render() {
        const { onFinish } = this.props
        return (
            <ChangePasswordController>
                { 
                    ({submit}) => <ChangePasswordView onFinish={onFinish} submit={submit} />
                } 
            </ChangePasswordController>
        )
    }
}