// @ts-ignore
import * as React from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFn } from 'react-apollo'
import { ConfirmGroupRequest, ConfirmGroupRequestVariables } from 'src/schemaTypes';

export const confirmGroupRequest = gql`
mutation ConfirmGroupRequest( $id: String! )
    { confirmGroupRequest(id: $id, confirm: true) { token error } }
`
export const rejectGroupRequest = gql`
mutation ConfirmGroupRequest( $id: String! )
    { confirmGroupRequest(id: $id, confirm: false) { token error } }
`

export interface WithConfirmGroupRequest {
    confirmRequest: MutationFn<ConfirmGroupRequest, ConfirmGroupRequestVariables>
}

interface Props {
    children: (data: WithConfirmGroupRequest) => JSX.Element | null
}

export class ConfirmRequest extends React.PureComponent<Props> {
    render() {
        const { children } = this.props
        return (
            <Mutation<ConfirmGroupRequest, ConfirmGroupRequestVariables>
                mutation={confirmGroupRequest} refetchQueries={['userGroupRequest']}
            >
            {(mutate) => { return children({confirmRequest: mutate}) }}
            </Mutation>
        )
    }
}

export class RejectRequest extends React.PureComponent<Props> {
    render() {
        const { children } = this.props
        return (
            <Mutation<ConfirmGroupRequest, ConfirmGroupRequestVariables>
                mutation={rejectGroupRequest} refetchQueries={['userGroupRequest']}
            >
            {(mutate) => { return children({confirmRequest: mutate}) }}
            </Mutation>
        )
    }
}