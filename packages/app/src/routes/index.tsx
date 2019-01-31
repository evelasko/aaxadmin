import * as React from 'react'
import { NativeRouter, Route, Switch } from 'react-router-native'
import { RegisterConnector } from '../modules/register/RegisterConnector'
import { LoginConnector } from '../modules/login/LoginConnector'
import { Me } from '../modules/Me';
import { CreateNewsConnector } from '../modules/News/Create/CreateNewsConnector'
import { FindNewsConnector } from '../modules/News/Find/FindNewsConnector';

export const Routes = () => (
    <NativeRouter initialEntries={["/find"]}>
        <Switch>
            <Route exact={true} path="/register" component={RegisterConnector} />
            <Route exact={true} path="/login" component={LoginConnector} />
            <Route exact={true} path="/me" component={Me} />
            <Route exact={true} path="/create" component={CreateNewsConnector} />
            <Route exact={true} path="/find" component={FindNewsConnector} />
        </Switch>
    </NativeRouter>
)