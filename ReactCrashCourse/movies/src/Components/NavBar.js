import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (
            <>
            <nav className="navbar navbar-dark bg-dark" style = {{marginBottom:0}}>
            <div className="container-fluid">
                <Link to = "/" style = {{textDecoration:"none"}}> <span className="navbar-brand mb-0 h1">Movie's</span></Link>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link to = "/favorites" style = {{textDecoration:"none"}}><a className="nav-link active" aria-current="page" href="#">Favorites</a></Link>
                     </li>
                </ul>
            </div>
            </nav>
            </>
        )
    }
}
