import * as React from 'react'
import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'
import { SignUpUserMutation, SignUpUserMutationVariables } from '../../schemaTypes';
import { normalizeResponse } from '../../utils/normalizeResponse'

const signUpUserMutation = gql`
    mutation SignUpUserMutation (   $email: String!, 
                                    $password: String!, 
                                    $name: String!, 
                                    $lastname: String!,
                                    $groupRequest: UserGroup
                                    $nID: String,
                                    $nIDType: nIdType
                                ) 
    {
        signUpUser( data: { email: $email, 
                            password: $password,
                            name: $name, lastname: $lastname,
                            groupRequest: $groupRequest,
                            nID: $nID, nIDType: $nIDType
                        } 
                    )
        { token error } 
    }   
`

interface Props {
    children: ( 
        data: {
            submit: (values: SignUpUserMutationVariables) => 
                Promise<{ [key: string]: string } | null >
        }
    ) => JSX.Element | null
}

export class C extends React.PureComponent<ChildMutateProps<Props, SignUpUserMutation, SignUpUserMutationVariables>> {
    submit = async (values: SignUpUserMutationVariables) => {
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

export const RegisterController = graphql<Props, SignUpUserMutation, SignUpUserMutationVariables>(signUpUserMutation)(C)