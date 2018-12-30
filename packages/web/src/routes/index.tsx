import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { RegisterConnector } from '../modules/register/RegisterConnector'
import { LoginConnector } from '../modules/login/LoginConnector'
import { ForgotPasswordConnector } from '../modules/ForgotPassword/ForgotPasswordConnector'
import { ChangePasswordConnector } from '../modules/ChangePassword/ChangePasswordConnector'
import { ConfirmEmailConnector } from '../modules/ConfirmEmail/ConfirmEmailConnector'

import { TextPage } from '../modules/TextPage'

export const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/register" component={RegisterConnector} />
            <Route exact path="/login" component={LoginConnector} />
            <Route exact path="/forgot" component={ForgotPasswordConnector} />
            <Route exact path="/change-password/:key" component={ChangePasswordConnector} />
            <Route exact path="/confirm-email/:key" component={ConfirmEmailConnector} />
            <Route path="/m" component={TextPage} />
        </Switch>
    </BrowserRouter>
)