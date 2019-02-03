import * as React from 'react'
import { Redirect } from 'react-router-dom'

interface Props {
    logout: () => void
    onFinish: () => void
}

export class CallLogout extends React.PureComponent<Props> {
    async componentDidMount() {
        await this.props.logout()
        this.props.onFinish()
    }
    render() {
        return <Redirect to='/login' />
}}