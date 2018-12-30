import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom';

export class TextPage extends React.PureComponent <RouteComponentProps<{}>> {
    render() {
        const { location: { state } } = this.props
        console.log(this.props)
        return (
            <div><h2>{state && state.message ? state.message : 'Please login or register'}</h2></div>
        )
}}