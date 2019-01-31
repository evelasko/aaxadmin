import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthRoute } from '@aaxadmin/controller'

import { RegisterConnector } from '../modules/register/RegisterConnector'
import { LoginConnector } from '../modules/login/LoginConnector'
import { ForgotPasswordConnector } from '../modules/ForgotPassword/ForgotPasswordConnector'
import { ChangePasswordConnector } from '../modules/ChangePassword/ChangePasswordConnector'
import { ConfirmEmailConnector } from '../modules/ConfirmEmail/ConfirmEmailConnector'
import { CreateNewsConnector } from '../modules/news/create/CreateNewsConnector'
import { CreateEventConnector } from '../modules/events/create/CreateEventConnector'
import { FindNewsConnector } from '../modules/news/find/FindNewsConnector'
import { FindEventConnector } from '../modules/events/find/FindEventConnector'
import { TextPage } from '../modules/TextPage'
import { Logout } from '../modules/Logout';
import { CreateVenueConnector } from '../modules/venues/create/CreateVenueConnector'
import { FindVenueConnector } from '../modules/venues/find/FindVenueConnector'
import { Main } from '../modules/Layouts/Base'

export class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/register" component={RegisterConnector} />
                    <Route exact path="/login" component={LoginConnector} />
                    <Route exact path="/logout" component={Logout} />
                    <Route exact path="/forgot" component={ForgotPasswordConnector} />
                    <Route exact path="/change-password/:key" component={ChangePasswordConnector} />
                    <Route exact path="/confirm-email/:key" component={ConfirmEmailConnector} />
                    <Route path="/m" component={TextPage} />
                    <AuthRoute path="/create-news" component={CreateNewsConnector} />
                    <AuthRoute path="/create-event" component={CreateEventConnector} />
                    <Route path="/create-venue" component={CreateVenueConnector} />
                    <Route path="/news" component={FindNewsConnector} />
                    <Route path="/events" component={FindEventConnector} />
                    <Route path="/venues" component={FindVenueConnector} />
                </Switch>
            </BrowserRouter>
        )
    }
}
