import * as React from 'react'
import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'
import { SignUpUserMutation, SignUpUserMutationVariables } from '../../schemaTypes';

interface Props {
    children: ( 
        data: {submit: (values: SignUpUserMutationVariables) => Promise<null>}
    ) => JSX.Element | null
}

export class C extends React.PureComponent<ChildMutateProps<Props, SignUpUserMutation, SignUpUserMutationVariables>> {
    submit = async (values: SignUpUserMutationVariables) => {
        console.log(values)
        const response = await this.props.mutate({
            variables: values
        })
        console.log('response: ', response)
        return null
    }

    render() {
        return this.props.children({ submit: this.submit })
    }
}

const signUpUserMutation = gql`
    mutation SignUpUserMutation 
            ( 	$email: String!, 
                $password: String!
            ) {
    signUpUser(
        data: {
        email: $email,
        password: $password,
        }
    ) { user { id } token error } 
    }   
`

export const RegisterController = graphql<Props, SignUpUserMutation, SignUpUserMutationVariables>(signUpUserMutation)(C)