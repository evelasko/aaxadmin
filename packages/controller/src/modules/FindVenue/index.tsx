// @ts-ignore
import * as React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { VenuesQuery, VenuesQuery_venues } from '../../schemaTypes' 

export const venuesQuery = gql`
query VenuesQuery ( $query: String )
    { venues (query: $query)
    { id name address placeID } }
`

export interface WithFindVenue {
    venues: VenuesQuery_venues[]
    loading: boolean
}

export const withAllVenues = graphql<
                                any, 
                                VenuesQuery, 
                                {},
                                WithFindVenue
                            >(venuesQuery, {
                                props: ({ data }) => {
                                    let venues: any[] = []
                                    if (data && !data.loading && data.venues) {
                                        venues = data.venues
                                    }
                                    return {
                                        venues,
                                        loading: data ? data.loading : false
                                    }
                                }
                            })