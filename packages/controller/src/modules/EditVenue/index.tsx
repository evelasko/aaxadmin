// @ts-ignore
import * as React from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFn } from 'react-apollo'
import { EditVenueMutation, EditVenueMutationVariables } from 'src/schemaTypes';

export const editVenueMutation = gql`
mutation EditVenueMutation($id: ID!, $data:UpdateVenueInput! )
    { updateVenue(id: $id, data: $data) { token error } }
`

export interface WithEditVenue {
    editVenue: MutationFn<EditVenueMutation, EditVenueMutationVariables>
}

interface Props {
    children: (data: WithEditVenue) => JSX.Element | null
}

export class EditVenue extends React.PureComponent<Props> {
    render() {
        const { children } = this.props
        return (
            <Mutation<EditVenueMutation, EditVenueMutationVariables>
                mutation={editVenueMutation}
                refetchQueries={['VenuesQuery']}
            >
            {(mutate) => {
                return children({editVenue: mutate})
            }}
            </Mutation>
        )
    }
}