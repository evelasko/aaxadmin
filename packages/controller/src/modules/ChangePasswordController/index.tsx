import * as React from 'react'
import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'
import { ChangePasswordMutation, ChangePasswordMutationVariables } from '../../schemaTypes';
import { normalizeResponse } from '../../utils/normalizeResponse'

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
        console.log('values: ', values)
        const response = normalizeResponse(await this.props.mutate({ variables: values }))
        console.log('response: ', response)
        if (response.data.changePassword.error) {
            console.log('error inside controller...')
            return {password: response.data.changePassword.error}
        }
        return null
    }
    render() {
        return this.props.children({ submit: this.submit })
    }
}

const changePasswordMutation = gql`
    mutation ChangePasswordMutation ( $newPassword: String!) 
    {
        changePassword( newPassword: $newPassword)
        { token error } 
    }   
`

export const ChangePasswordController = graphql<Props, ChangePasswordMutation, ChangePasswordMutationVariables>(changePasswordMutation)(H)