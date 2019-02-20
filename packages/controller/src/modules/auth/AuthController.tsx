// @ts-ignore
import * as React from 'react'
import { graphql } from 'react-apollo'
import { MeQuery, MeQuery_me } from '../../schemaTypes'
import { meQuery } from './AuthRoute'

export interface WithUser {
    user: MeQuery_me
    loading: boolean
}

export const withUser = graphql<
                                any, 
                                MeQuery, 
                                {},
                                WithUser
                            >(meQuery, {
                                props: ({ data }) => {
                                    let user: any = null
                                    if (data && !data.loading && data.me ) { user = data.me.user }
                                    console.log('USER at controller: ', user)
                                    return { user, loading: data ? data.loading : false }
                                }, options: { fetchPolicy: 'network-only' }
                            })