// @ts-ignore
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { DeleteVenueMutation, DeleteVenueMutationVariables } from 'src/schemaTypes';

export const deleteVenueMutation = gql`
mutation DeleteVenueMutation( $id: ID! ) { deleteVenue(id: $id) { token error } }
`

export interface WithDeleteVenue {
    deleteVenue: MutationFn<DeleteVenueMutation, DeleteVenueMutationVariables>
}

interface Props { children: (data: WithDeleteVenue) => JSX.Element | null }

export class DeleteVenue extends React.PureComponent<Props> {
    render() {
        const { children } = this.props
        return (
            <Mutation<DeleteVenueMutation, DeleteVenueMutationVariables>
                mutation={deleteVenueMutation}
                refetchQueries={['VenuesQuery']}
            >
            {(mutate) => { return children({deleteVenue: mutate}) }}
            </Mutation>
        )
    }
}