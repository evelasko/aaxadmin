import { Alert } from 'antd';
import gql from 'graphql-tag';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { client } from '../../apollo';


const UnsubscribeEmailMutation = gql`
    mutation unsubscribeEmailMutation($email: String!) {
        unsubscribeEmail(email: $email) { token error }
    }
`

const UnsubscribeEmail: React.FC<RouteComponentProps<{email: string}>> = ({match}) => {
    client.mutate({mutation: UnsubscribeEmailMutation, variables: {email: match.params.email}})
    return (
        <div style={{width: '100%', marginTop: 50, padding: 50}}>
                <Alert
                    message={"Su dirección de email ha sido eliminada de nuestro registro"}
                    description={<div>A partir de ahora no recibirá ninguna comunicación de Fundación Alicia Alonso por correo electrónico. Si desea restablecer esta vía de comunicación por favor envíenos un correo solicitándolo a la dirección fundacion@alicialonso.org</div>}
                    type="success"
                    showIcon
                />
            </div>
    )
}

export default UnsubscribeEmail