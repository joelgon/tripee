import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import login from './pages/login/login';
import Main from './pages/main/main';

export default function Routes(){
    return(
        <BrowserRouter>
            <Route path='/' exact component={login}/>
            <Route path='/main' component={Main} />
        </BrowserRouter>
    );
}