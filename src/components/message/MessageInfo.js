import React, { Component } from 'react'
import firebase from '../../config/firebase'
import { Link } from 'react-router-dom'

export default class MessageInfo extends Component {
    constructor() {
        super();

        this.state = {
            message: {
                parent: "",
                id: "",
                user: "",
                message: "",
                content: "",
                children: []
            },
            parent: {},
            children: []
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        // Get Reply Data
        firebase.getChildrenByParent(`${params.id}`).then(
            querySnapshot => querySnapshot.forEach(
                doc => {
                    this.state.children.push(doc.data())
                }
            )
        )

        // Get Parent Data
        firebase.getParentByChildren(`${params.id}`).then(
            querySnapshot => querySnapshot.forEach(
                doc => {
                    this.setState({parent: doc.data()})
                }
            )
        )

        // Get Message Data
        firebase.getMessage(`${params.id}`)
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    // console.log('Message data:', doc.data());
                    this.setState({ message: doc.data() });
                }
            });


        // console.log("Reply data: ", this.state.children)
    }

    handleDelete() {
        const { history } = this.props;
        firebase.deleteMessage(this.state.message)
            .then(() => {
                console.log("message deleted")
                history.push("/messages")
            });
    }

    render() {
        // State made variables.
        let msg = this.state.message;
        let chi = this.state.children;
        let dad = this.state.parent;

        // HTML CONDITIONAL CODE
        let theParent = "";
        let btn = []

        if (msg.parent !== undefined && msg.parent !== null) {
            theParent = 
            <tr key={msg.id} className="table-success text-right">
                <td>
                    <div className="container">
                        <b>{dad.user} • <Link className="text-dark" to={`/reply/${msg.parent}`}>{dad.message}</Link></b>
                        <p>{dad.content}
                        <br></br>
                        Respuestas: {dad.children === undefined ? 0 : dad.children.length}</p>
                    </div>
                </td>
            </tr>
        } else {
            theParent = null
        }

        if (msg.children === undefined || msg.children.length === 0) {
            btn.push(<button key="delete" type="button" className="btn btn-danger btn-sm" onClick={this.handleDelete.bind(this)}>Borrar</button>)
        }
        btn.push(<Link key={msg.id} to={`${msg.id}/edit`}><button type="button" className="btn btn-warning btn-sm">Editar</button></Link>)
        btn.push(<Link key="reply" to={`${msg.id}/reply`}><button type="button" className="btn btn-success btn-sm">Responder</button></Link>)

        // console.log("This message's children are: ", chi)
        let replies = chi.map(
            (item) =>
                <tr key={item.id} className="text-right">
                    <td>
                         <div className="container">
                            <b>{item.user} • <Link className="text-dark" to={`/reply/${item.id}`}>{item.message}</Link></b>
                            <p>{item.content}
                            <br></br>
                            Respuestas: {item.children === undefined ? 0 : item.children.length}</p>
                        </div>
                    </td>
                </tr>

        )
        // console.log(replies)

        return (
            <div className="container">
                <table className="table"><tbody>{theParent}</tbody></table>
                <div className="card border">
                    <div className="card-body">
                    <h5 className="card-title">{msg.user} • {msg.message}</h5>
                        <p className="card-text">{msg.content}</p>
                    </div>
                    <div className="card-footer text-muted text-right">
                        {btn}
                    </div>
                </div>
                    <table className="table table-success">
                        <tbody>{replies}</tbody>
                    </table>
            </div>
        )

    }
}