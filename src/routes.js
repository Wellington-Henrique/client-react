import React from 'react';
import { Browser, ReducerWithoutAction, SwitchCase } from 'react-router-dom';
import Login from './pages/Login';

export default function Routes() {
    return (
        <Browser>
            <Switch>
                <Route path="/" exact component={Login}/>
            </Switch>
        </Browser>
    )
}
