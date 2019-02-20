// @ts-ignore
import * as React from 'react'
import gql from 'graphql-tag'
// import { graphql } from 'react-apollo'
// import { NewsQuery, NewsQuery_newses } from '../../../schemaTypes' 

export const usersQuery = gql`
query UsersQuery( $query: String, $group: UserGroup )
    { users ( query: $query, group: $group) { id name lastname group isAdmin groupRequest } }
`

// export interface WithNewses {
//     news: NewsQuery_newses[]
//     loading: boolean
//     query?: string
// }

// export const withNewses = graphql<
//                                 any, 
//                                 NewsQuery, 
//                                 {},
//                                 WithNewses
//                             >(newsQuery, {
//                                 props: ({ data }) => {
//                                     let news: any[] = []
//                                     if (data && !data.loading && data.newses) {
//                                         news = data.newses
//                                     }
//                                     return {
//                                         news,
//                                         loading: data ? data.loading : false
//                                     }
//                                 }
//                             })
                            