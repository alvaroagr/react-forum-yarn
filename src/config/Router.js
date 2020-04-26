import React from 'react';
import { HashRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Home from '../components/Home';
import Messages from '../components/message/Messages'
import MessageAdd from '../components/message/MessageAdd'
import MessageInfo from '../components/message/MessageInfo'
import MessageEdit from '../components/message/MessageEdit'
import MessageReply from '../components/message/MessageReply'
import Users from '../components/user/Users'
import UserAdd from '../components/user/UserAdd'

const routing = (

    <Router basename='/'>

        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul className="navbar-nav mr-auto my-2 my-lg-0 " >
                    <li className="nav-item">
                        <Link to="/" className="nav-link fas fa-home">   Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/messages" className="nav-link fas">   Mensajes</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/users" className="nav-link fas">   Usuarios</Link>
                    </li>
                </ul>
                <div>
                    <ul className="navbar-nav mr-auto my-5 my-lg-0">
                        <li className="nav-item">
                            <Link to="/register" className="nav-link fas fa-book">    Registrarme</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link fas fa-key">    Acceder</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>



        <Switch>
            <Route path = '/users' component = {Users}/>
            <Route path='/messages/add' component={MessageAdd} />
            <Route path='/messages/:id/reply' component={MessageReply} />
            <Route path='/messages/:id/edit' component={MessageEdit} />
            <Redirect from='/reply/:id' to='/messages/:id' />
            <Route path='/messages/:id' component={MessageInfo} />
            <Route path='/messages' component={Messages} />
            <Route exact path='/' component={Home} />
            <Route path='/register' component={UserAdd} />
        </Switch>
    </Router>

)

export default routing
