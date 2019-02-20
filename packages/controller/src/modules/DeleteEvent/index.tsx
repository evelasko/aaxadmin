// @ts-ignore
import * as React from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFn } from 'react-apollo'
import { DeleteEventMutation, DeleteEventMutationVariables } from 'src/schemaTypes';

export const deleteEventMutation = gql`
mutation DeleteEventMutation( $id: ID! ) { deleteEvent(id: $id) { id } }
`

export interface WithDeleteEvent {
    deleteEvent: MutationFn<DeleteEventMutation, DeleteEventMutationVariables>
}

interface Props {
    children: (data: WithDeleteEvent) => JSX.Element | null
}

export class DeleteEvent extends React.PureComponent<Props> {
    render() {
        const { children } = this.props
        return (
            <Mutation<DeleteEventMutation, DeleteEventMutationVariables>
                mutation={deleteEventMutation}
                refetchQueries={['EventsQuery']}
            >
            {(mutate) => {
                return children({deleteEvent: mutate})
            }}
            </Mutation>
        )
    }
}