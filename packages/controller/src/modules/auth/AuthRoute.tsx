import * as React from 'react'
import { graphql, ChildProps } from 'react-apollo'
import { RouteProps, Route, RouteComponentProps, Redirect } from 'react-router' // Redirect
import gql from 'graphql-tag'
import { MeQuery } from '../../schemaTypes'

export const meQuery = gql`
 query MeQuery { me { user { id name lastname email group isAdmin } error } }
`

type Props = RouteProps

export class M extends React.PureComponent<ChildProps<Props, MeQuery>> {
    
    renderRoute = (routeProps: RouteComponentProps<{}>) => {
        const { data, component } = this.props
        if (!data || data.loading) { 
            return null 
        } // loading screen
        if (!data.me) { 
            return <Redirect to={{
                        pathname:"/login", 
                        state: {next: routeProps.location.pathname}
                    }} /> 
        } // user not logged in
        const Component = component as any
        return <Component {...routeProps} />
    }
    render() {
        const {data: _, component: __, ...rest} = this.props
        return ( <Route {...rest} render={this.renderRoute} /> )
}}

export const AuthRoute = graphql<Props, MeQuery>(meQuery)(M)
