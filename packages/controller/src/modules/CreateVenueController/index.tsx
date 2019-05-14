// @ts-ignore
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { CreateVenueMutation, CreateVenueMutationVariables } from '../../schemaTypes';


export const createVenueMutation = gql`
mutation CreateVenueMutation(
    $name: String!
    $address: String
    $placeID: String
) {
    createVenue(data: {
        name: $name
        address: $address
        placeID: $placeID
    }
    ) { id }
}
`

export interface WithCreateVenue {
    createVenue: (variables: CreateVenueMutationVariables) => any
}

export const withCreateVenue = graphql<
                                any, 
                                CreateVenueMutation, 
                                CreateVenueMutationVariables,
                                WithCreateVenue
                            >(createVenueMutation, {
                                props: ({mutate}) => ({
                                    createVenue: async variables => {
                                        if (!mutate) { return }
                                        const response = await mutate({variables, refetchQueries:['VenuesQuery']})
                                                                .catch(err => {throw new Error(`@createVenue: ${err}`)})
                                        if (response) { return response } else { return }
                                    }
                                })
                            })