// @ts-ignore
import * as React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { EventsQuery, EventsQuery_events } from '../../schemaTypes' 

export const eventsQuery = gql`
query EventsQuery ( $query: String )
    { events ( query: $query) 
    { id title target author { name } date imageURL venue { name placeID } } }
`
export interface WithFindEvents {
    events: EventsQuery_events[]
    loading: boolean
}

export const withEvents = graphql<
                                any, 
                                EventsQuery, 
                                {},
                                WithFindEvents
                            >(eventsQuery, {
                                props: ({ data }) => {
                                    let events: any[] = []
                                    if (data && !data.loading && data.events) {
                                        events = data.events
                                    }
                                    return {
                                        events,
                                        loading: data ? data.loading : false
                                    }
                                }
                            })