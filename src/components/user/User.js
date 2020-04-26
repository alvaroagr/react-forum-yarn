import React, { Component } from 'react';

export default class User extends Component {

    handleDelete() {
        let user = this.props.user
        this.props.handleDelete(user)
    }

    render() {
        let user = this.props.user;
        return (
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.activo}</td>
                <td><button className="btn btn-sm btn-success"><div className="fas fa-user" /></button></td>
                <td><button className="btn btn-sm btn-warning"><div className="fas fa-pencil-alt" /></button></td>
                <td><button className="btn btn-sm btn-danger" onClick={this.handleDelete.bind(this)}><div className="fas fa-trash" /></button></td>
            </tr>
        )
    }
}
