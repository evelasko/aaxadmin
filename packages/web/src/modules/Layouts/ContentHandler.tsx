import * as React from 'react'
import { Query } from 'react-apollo'
import * as _ from 'lodash'
import { alertsQuery, callsQuery, newsQuery, eventsQuery, venuesQuery } from '@aaxadmin/controller'

import { FindNewsList } from '../news/find/FindNewsList'
import { FindEventList } from '../events/find/FindEventList'
import { FindVenueList } from '../venues/find/FindVenueList'


interface Props {
    search?: string
    page: string
    user?: any
}

export const ContentHandler: React.SFC<Props> = ({...props}) => {
    const { search, page, user } = props
    const content = {
        Noticias: (
                <Query query={newsQuery} variables={search ? {query: search} : {}}>
                {({ loading, data }) => <FindNewsList loading={loading} news={data.newses} user={user||null} /> }
                </Query>
                ),
        Convocatorias: (
                <Query query={callsQuery} variables={search ? {query: search} : {}}>
                {({ loading, data }) => <FindNewsList loading={loading} news={data.calls} user={user||null} />}
                </Query>
                ),
        Alertas: (
                <Query query={alertsQuery} variables={search ? {query: search} : {}}>
                {({ loading, data }) => <FindNewsList loading={loading} news={data.alerts} user={user||null} /> }
                </Query>
                ),
        Eventos: (
                <Query query={eventsQuery} variables={search ? {query: search} : {}}>
                {({ loading, data }) => <FindEventList loading={loading} events={data.events} user={user||null} />}
                </Query>
                ),
        Recintos: (
                <Query query={venuesQuery} variables={search ? {query: search} : {}}>
                {({ loading, data }) => <FindVenueList loading={loading} venues={data.venues} />}
                </Query>
                )
    }
    return _.has(content, page) ? content[page] : <p>Invalid content request...</p>
}
