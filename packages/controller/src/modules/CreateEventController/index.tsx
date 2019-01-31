// @ts-ignore
import * as React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import { CreateEventMutation, CreateEventMutationVariables } from '../../schemaTypes'

export const createEventMutation = gql`
mutation CreateEventMutation(
    $title: String!
    $subtitle: String
    $body: String!
    $image: Upload
    $date: DateTime!
    $target: UserGroup
    $deleteUpon: Boolean
    $venue: ID!
) {
    createEvent(data: {
        title: $title
        subtitle: $subtitle
        body: $body
        image: $image
        date: $date
        target: $target
        deleteUpon: $deleteUpon
        venue: $venue
    }
    ) { id }
}
`

export interface WithCreateEvent {
    createEvent: (variables: CreateEventMutationVariables) => any
}

export const withCreateEvent = graphql<
                                any, 
                                CreateEventMutation, 
                                CreateEventMutationVariables,
                                WithCreateEvent
                            >(createEventMutation, {
                                props: ({mutate}) => ({
                                    createEvent: async variables => {
                                        if (!mutate) { return }
                                        const response = await mutate({variables, refetchQueries: ['EventsQuery']})
                                        if (response) { return response } else { return }
                                    }
                                })
                            })