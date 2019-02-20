// @ts-ignore
import * as React from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFn } from 'react-apollo'
import { EditEventMutation, EditEventMutationVariables } from 'src/schemaTypes';

export const editEventMutation = gql`
mutation EditEventMutation($id: ID!, $data:UpdateEventInput! )
    { updateEvent(id: $id, data: $data) { token error } }
`

export interface WithEditEvent {
    editEvent: MutationFn<EditEventMutation, EditEventMutationVariables>
}

interface Props {
    children: (data: WithEditEvent) => JSX.Element | null
}

export class EditEvent extends React.PureComponent<Props> {
    render() {
        const { children } = this.props
        return (
            <Mutation<EditEventMutation, EditEventMutationVariables>
                mutation={editEventMutation}
                refetchQueries={['EventsQuery']}
            >
            {(mutate) => {
                return children({editEvent: mutate})
            }}
            </Mutation>
        )
    }
}