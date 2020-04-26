import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Message extends Component {

    render() {
        let message = this.props.msg;
        let replies = 0
        if(message.children !== undefined){
            replies = message.children.length;
        }
        return (
            <tr>
                <td><Link to={`/messages/${message.id}`}>{message.message}</Link></td>
                <td>{message.user}</td>
                <td>{replies}</td>
            </tr>
        )
    }

}