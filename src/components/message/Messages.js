import React, { Component } from 'react';
import Message from './Message'
import firebase from '../../config/firebase.js'
import { Link } from 'react-router-dom'

export default class Messages extends Component {

    constructor() {
        super();
        this.state = {
            messages: [],
        }
    }

    refresh() {
        let messages = [];
        firebase.getMessages().then(
            (querySnapshot) => {
                querySnapshot.forEach(
                    doc => messages.push(doc.data())
                );
                this.setState(
                    { messages }
                );
            }
        )
    }

    componentDidMount() {
        let messages = [];
        firebase.getMessages().then(
            (querySnapshot) => {
                querySnapshot.forEach(
                    doc => messages.push(doc.data())
                );
                this.setState(
                    { messages }
                );
            }
        )
    }

    render() {
        let msgList = this.state.messages.map(
            (item) =>
                (<Message key={item.id} msg={item} />)
        )

        return (
            <div>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>Mensaje</th>
                            <th>Autor</th>
                            <th>Respuestas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {msgList}
                    </tbody>
                </table>
                <Link to="/messages/add"><button type="button" className="btn btn-success">Nuevo Mensaje</button></Link>
            </div>


            // <div>
            //     <MessageList msgs={this.state.messages} />

            //     <Link to="/messages/add"><button type="button" className="btn btn-success">Nuevo Mensaje</button></Link>

            // </div>
        )
    }
}