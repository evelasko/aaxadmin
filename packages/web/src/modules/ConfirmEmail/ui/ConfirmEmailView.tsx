import * as React from 'react'
import { ConfirmEmailMutationVariables } from '@aaxadmin/controller'

interface Props {
    onFinish: () => void
    key: string
    cl: string
    submit: (values: ConfirmEmailMutationVariables) => Promise< { [key: string]: string } | null >
}

export class F extends React.PureComponent<Props> {
    async componentDidMount() {
        const res = await this.props.submit({key: this.props.cl})
        if (!res) { this.props.onFinish() }
    }
    render() {
        return (
            <div style={{width: 400, margin: 'auto'}}>
                invalid token...
            </div>
        )
  }
}

export const ConfirmEmailView = (F)