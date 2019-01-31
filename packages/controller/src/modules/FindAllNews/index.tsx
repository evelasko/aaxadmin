// @ts-ignore
import * as React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { AllNewsQuery, AllNewsQuery_allNews } from '../../schemaTypes' 

export const allNewsQuery = gql`
query AllNewsQuery( $query: String )
    { allNews ( query: $query) 
    { id title published featured target expiration body author { id name } category imageURL deleteUpon } }
`

export interface WithFindNews {
    news: AllNewsQuery_allNews[]
    loading: boolean
    query?: string
}

export const withAllNews = graphql<
                                any, 
                                AllNewsQuery, 
                                {},
                                WithFindNews
                            >(allNewsQuery, {
                                props: ({ data }) => {
                                    let news: any[] = []
                                    if (data && !data.loading && data.allNews) {
                                        news = data.allNews
                                    }
                                    return {
                                        news,
                                        loading: data ? data.loading : false
                                    }
                                }
                            })
                            