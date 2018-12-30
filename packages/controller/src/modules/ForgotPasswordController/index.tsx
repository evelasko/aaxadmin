import * as React from 'react'
import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'
import { ForgotPasswordMutation, ForgotPasswordMutationVariables } from '../../schemaTypes';
import { normalizeResponse } from '../../utils/normalizeResponse'

interface Props {
    children: ( 
        data: {
            submit: (values: ForgotPasswordMutationVariables) => 
                Promise<{ [key: string]: string } | null >
        }
    ) => JSX.Element | null
}

export class F extends React.PureComponent<ChildMutateProps<Props, ForgotPasswordMutation, ForgotPasswordMutationVariables>> {
    submit = async (values: ForgotPasswordMutationVariables) => {
        console.log('values: ', values)
        const response = normalizeResponse(await this.props.mutate({ variables: values }))
        console.log('response: ', response)
        if (response.data.signUpUser.error) {
            console.log('error inside controller...')
            return {email: response.data.signUpUser.error}
        }
        return null
    }

    render() {
        return this.props.children({ submit: this.submit })
    }
}

const forgotPasswordMutation = gql`
    mutation ForgotPasswordMutation ( $email: String! ) 
    {
        sendForgotPasswordEmail( email: $email )
        { token error } 
    }   
`

export const ForgotPasswordController = graphql<Props, ForgotPasswordMutation, ForgotPasswordMutationVariables>(forgotPasswordMutation)(F)