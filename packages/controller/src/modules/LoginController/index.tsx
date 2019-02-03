import * as React from 'react'
import { graphql, ChildMutateProps, withApollo, WithApolloClient } from 'react-apollo'
import gql from 'graphql-tag'
import { LoginUserMutation, LoginUserMutationVariables } from '../../schemaTypes'
import { normalizeResponse } from '../../utils/normalizeResponse'

const loginUserMutation = gql`
    mutation LoginUserMutation ( $email: String!, $password: String! ) 
    { loginUser( data: { email: $email, password: $password } ) { token error } }   
`

interface Props {
    onSessionId?: (sessionId: string) => void
    children: ( 
        data: {
            submit: (values: LoginUserMutationVariables) => 
                Promise<{ [key: string]: string } | null > 
        }
    ) => JSX.Element | null
}

export class L extends React.PureComponent<
                            ChildMutateProps<
                                WithApolloClient<Props>, 
                                LoginUserMutation, 
                                LoginUserMutationVariables
                            >
                        > {
    submit = async (values: LoginUserMutationVariables) => {
        const response = normalizeResponse(await this.props.mutate({ variables: values }))
        if (response.data.loginUser.error) {
            console.log(response.data.loginUser.error)
            return {email: response.data.loginUser.error}
        }
        if (this.props.onSessionId && response.data.loginUser.token) {
            this.props.onSessionId(response.data.loginUser.token)
        }
        await this.props.client.resetStore()
        return null
    }
    render() { return this.props.children({ submit: this.submit }) }
}

export const LoginController = graphql<
    Props, LoginUserMutation, LoginUserMutationVariables
    >(loginUserMutation)(withApollo<Props>(L as any))