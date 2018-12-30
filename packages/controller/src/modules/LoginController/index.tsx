import * as React from 'react'
import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'
import { LoginUserMutation, LoginUserMutationVariables } from '../../schemaTypes'
import { normalizeResponse } from '../../utils/normalizeResponse'

interface Props {
    onSessionId?: (sessionId: string) => void
    children: ( 
        data: {
            submit: (values: LoginUserMutationVariables) => 
                Promise<{ [key: string]: string } | null > 
        }
    ) => JSX.Element | null
}

export class L extends React.PureComponent<ChildMutateProps<Props, LoginUserMutation, LoginUserMutationVariables>> {
    submit = async (values: LoginUserMutationVariables) => {
        console.log('values: ', values)
        // const tresponse:  = await this.props.mutate({ variables: values })
        // query gets normalized from types to access inner objects...
        const response = normalizeResponse(await this.props.mutate({ variables: values }))
        if (response.data.loginUser.error) {
            console.log('error inside controller...')
            return {email: response.data.loginUser.error}
        }
        if (this.props.onSessionId && response.data.loginUser.token) {
            this.props.onSessionId(response.data.loginUser.token)
        }
        return null
    }

    render() { return this.props.children({ submit: this.submit }) }
}

const loginUserMutation = gql`
    mutation LoginUserMutation ( $email: String!, $password: String! ) 
    {
        loginUser( data: { email: $email, password: $password } ) 
        { token error } 
    }   
`
export const LoginController = graphql<
    Props, 
    LoginUserMutation, 
    LoginUserMutationVariables
    >(loginUserMutation)(L)