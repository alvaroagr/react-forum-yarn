import React, { Component } from 'react';
import UserList from './UserList'
import firebase from '../../config/firebase.js'
import { Link } from 'react-router-dom'

export default class Users extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
        }
    }

    handleDelete(user) {
        const { history } = this.props;
        console.log("list:",user)
        firebase.deleteUser(user)
            .then(() => {
                console.log("user deleted")
                this.refresh()
            });
    }

    refresh() {
        let users = [];
        firebase.getUsers().then(
            (querySnapshot) => {
                querySnapshot.forEach(
                    doc => users.push(doc.data())
                );
                this.setState(
                    { users }
            )
            }
        )
    }

    componentDidMount() {
        let users = [];
        firebase.getUsers().then(
            (querySnapshot) => {
                querySnapshot.forEach(
                    doc => users.push(doc.data())
                );
                this.setState(
                    { users }
                );
            }
        )
    }



    render() {
        return (
            <div>
                <UserList users={this.state.users} handleDelete={this.handleDelete.bind(this)}/>
            </div>
        )
    }
}