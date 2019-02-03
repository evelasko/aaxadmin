import * as React from 'react'
import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'
import { ChangePasswordMutation, ChangePasswordMutationVariables } from '../../schemaTypes';
import { normalizeResponse } from '../../utils/normalizeResponse'

const changePasswordMutation = gql`
    mutation ChangePasswordMutation ( $key: String, $newPassword: String!) 
    {
        changePassword( key: $key, newPassword: $newPassword)
        { token error } 
    }   
`

interface Props {
    children: ( 
        data: {
            submit: (values: ChangePasswordMutationVariables) => 
                Promise<{ [key: string]: string } | null >
        }
    ) => JSX.Element | null
}

export class H extends React.PureComponent<ChildMutateProps<Props, ChangePasswordMutation, ChangePasswordMutationVariables>> {
    submit = async (values: ChangePasswordMutationVariables) => {
        const response = normalizeResponse(await this.props.mutate({ variables: values }))
        console.log('response: ', response)
        if (response.data.changePassword.error) {
            console.log(response.data.changePassword.error)
            return {password: response.data.changePassword.error}
        }
        return null
    }
    render() {
        return this.props.children({ submit: this.submit })
    }
}

export const ChangePasswordController = graphql<Props, ChangePasswordMutation, ChangePasswordMutationVariables>(changePasswordMutation)(H)