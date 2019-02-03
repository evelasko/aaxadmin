import * as React from 'react'
import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'
import { ConfirmEmailMutation, ConfirmEmailMutationVariables } from '../../schemaTypes';
import { normalizeResponse } from '../../utils/normalizeResponse'

const confirmEmailMutation = gql`
    mutation ConfirmEmailMutation ( $key: String! ) 
    { confirmEmail( key: $key ) { token error } }   
`
interface Props {
    children: ( 
        data: {
            submit: (values: ConfirmEmailMutationVariables) => 
                Promise<{ [key: string]: string } | null >
        }
    ) => JSX.Element | null
}

export class E extends React.PureComponent<ChildMutateProps<Props, ConfirmEmailMutation, ConfirmEmailMutationVariables>> {
    submit = async (values: ConfirmEmailMutationVariables) => {
        console.log('values: ', values)
        const response = normalizeResponse(await this.props.mutate({ variables: values }))
        console.log('response: ', response)
        if (response.data.confirmEmail.error) {
            console.log('error inside controller...')
            return {error: response.data.confirmEmail.error}
        }
        return null
    }

    render() {
        return this.props.children({ submit: this.submit })
    }
}

export const ConfirmEmailController = graphql<Props, ConfirmEmailMutation, ConfirmEmailMutationVariables>(confirmEmailMutation)(E)
