import * as React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Alert } from 'antd'

export class TextPage extends React.PureComponent <RouteComponentProps<{}>> {
    render() {
        const { location: { state } } = this.props
        console.log(this.props)
        return (
            <div style={{width: '100%', marginTop: 50, padding: 50}}>
                <Alert
                    message={state && state.title ? state.title : "Información"}
                    description={state && state.message ? state.message : <div>El contenido al que intenta acceder está disponible solo para usuarios registrados, por favor <Link to="/login">inicie sesión</Link> o <Link to="/register">regístrese</Link>.</div>}
                    type={state && state.type ? state.type : "info"}
                    showIcon
                />
            </div>
        )
}}