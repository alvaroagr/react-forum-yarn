import React, { Component } from 'react';
import firebase from '../../config/firebase.js'
import md5 from "react-native-md5";



class UserAdd extends Component {
    constructor() {
        super();

        this.state = {
            id: '',
            name: '',
            lastname: '',
            email: '',
            password: '',
            activo: ''
        }

        // this.db = firebase.firestore();
        
    }


    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }


    handleSubmit(e) {
        e.preventDefault();
        let id = (this.state.id === "" || this.state.id === undefined) ? Math.floor(Math.random() * 255).toString() : this.state.id;
        let user = {
            id: id,
            name: this.state.name,
            lastname: this.state.lastname,
            email: this.state.email,
            password: md5.hex_md5(this.state.password),
            activo: this.state.activo
        }

        //this.props.onSubmit(user)
        
        // this.db.collection('users').doc(user.id).set(user);
        firebase.submitUser(user);
        // this.refresh();

        const { history } = this.props;
        history.push(`/messages`);

    }


    refresh(){

        this.setState(
            {
                id: '',
                name: '',
                lastname: '',
                email: '',
                password: '',
                activo: ''
            }
        )
    }

   
    render() {
        return (
            <div className="container">

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label>Nombre     :</label>
                        <input type="text" className="form-control" placeholder="nombre" id='name' value={this.state.name} onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label>Apellido     :</label>
                        <input type="text" className="form-control" placeholder="apellido" id='lastname' value={this.state.lastname} onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label>Correo     :</label>
                        <input type="email" className="form-control" placeholder="example@exten.com" id='email' value={this.state.email} onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label>Password     :</label>
                        <input type="password" className="form-control" placeholder="password" id='password' value={this.state.password} onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label>Activo     :</label>
                        <select className="form-control form-control" placeholder="escoge estado" id="activo" value={this.state.activo} onChange={this.handleChange.bind(this)}  >
                            <option></option>
                            <option>Activo</option>
                            <option>No Activo</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Submit</button>

                    </div>
                </form>
            </div>

        )
    }
}

export default UserAdd;