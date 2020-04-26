import React, { Component } from 'react';
import User from './User'

export default class UserList extends Component {

    constructor(){
        super();
    }

    handleDelete(user) {
        this.props.handleDelete(user);
    }

    render() {
        let userList = this.props.users.map(
            (item) =>
                (<User key={item.id} user={item} handleDelete={this.handleDelete.bind(this)} />)
        )

        return (
            <div>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Contraseña</th>
                            <th>Activo</th>
                            <th colSpan="3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList}
                    </tbody>
                </table>
            </div>
        )
    }

}


