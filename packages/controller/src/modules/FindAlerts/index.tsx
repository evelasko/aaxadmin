// @ts-ignore
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { AlertsQuery, AlertsQuery_alerts } from '../../schemaTypes';

export const alertsQuery = gql`
query AlertsQuery ( $query: String )
    { alerts ( query: $query) 
    { id title published featured target expiration body author { id name } category deleteUpon } }
`

export interface WithAlerts {
    news: AlertsQuery_alerts[]
    loading: boolean
    query?: string
}

export const withAlerts = graphql<
                                any, 
                                AlertsQuery, 
                                {},
                                WithAlerts
                            >(alertsQuery, {
                                props: ({ data }) => {
                                    let news: any[] = []
                                    if (data && !data.loading && data.alerts) {
                                        news = data.alerts
                                    }
                                    return {
                                        news,
                                        loading: data ? data.loading : false
                                    }
                                }
                            })
                            