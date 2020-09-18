import React from 'react';
import './assets/style/style.scss';
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route,
} from 'react-router-dom';
import { WelcomePage } from '@pages/welcome';
import { Docs } from '@pages/docs';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={WelcomePage}/>
                <Route exact path="/docs" component={Docs}/>
                <Redirect to="/"/>
            </Switch>
        </Router>
    );
}

export default App;
