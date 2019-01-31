// @ts-ignore
import * as React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import { CreateNewsMutation, CreateNewsMutationVariables } from '../../schemaTypes'

export const createNewsMutation = gql`
mutation CreateNewsMutation(
    $title: String!
    $subtitle: String
    $body: String!
    $image: Upload
    $expiration: DateTime
    $category: NewsCategory
    $featured: Boolean
    $target: UserGroup
    $deleteUpon: Boolean
) {
    createNews(data: {
        title: $title
        subtitle: $subtitle
        body: $body
        image: $image
        expiration: $expiration
        category: $category
        featured: $featured
        target: $target
        deleteUpon: $deleteUpon
    }
    ) { id }
}
`

export interface WithCreateNews {
    createNews: (variables: CreateNewsMutationVariables) => any
}

export const withCreateNews = graphql<
                                any, 
                                CreateNewsMutation, 
                                CreateNewsMutationVariables,
                                WithCreateNews
                            >(createNewsMutation, {
                                props: ({mutate}) => ({
                                    createNews: async variables => {
                                        if (!mutate) { return }
                                        const response = await mutate({variables, refetchQueries: [
                                                                                        'AllNewsQuery', 
                                                                                        'NewsQuery',
                                                                                        'CallsQuery',
                                                                                        'AlertsQuery'
                                                                                    ]})
                                        if (response) { return response } else { return null}
                                    }
                                })
                            })
                            