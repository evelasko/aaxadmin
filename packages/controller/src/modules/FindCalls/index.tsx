// @ts-ignore
import * as React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { CallsQuery, CallsQuery_calls } from '../../schemaTypes' 

export const callsQuery = gql`
query CallsQuery( $query: String )
    { calls ( query: $query) 
    { id title published featured target expiration body author { id name } category imageURL deleteUpon } }
`

export interface WithCalls {
    news: CallsQuery_calls[]
    loading: boolean
    query?: string
}

export const withCalls = graphql<
                                any, 
                                CallsQuery, 
                                {},
                                WithCalls
                            >(callsQuery, {
                                props: ({ data }) => {
                                    let news: any[] = []
                                    if (data && !data.loading && data.calls) {
                                        news = data.calls
                                    }
                                    return {
                                        news,
                                        loading: data ? data.loading : false
                                    }
                                }
                            })
                            