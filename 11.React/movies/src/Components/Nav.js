import React from 'react';
import {Link} from "react-router-dom";

export default function Nav() {
    return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                    <h3 className="display-6"><img src="https://www.freeiconspng.com/uploads/movie-icon-27.png" alt="" width="40" height="34" className="d-inline-block align-text-top"/>
                     Movies</h3>
                    </a>
                    <div className="collapse navbar-collapse ">
                    <ul className="navbar-nav d-flex">
                        <Link className ="nav-link" to ="/">
                        <li className="nav-item ">
                        Home
                        </li>
                        </Link>
                        <Link  className ="nav-link" to = "/about">
                        <li className="nav-item ">
                        About
                        </li>
                        </Link>
                        <Link  className ="nav-link" to ="/movies">
                        <li className="nav-item ">
                        Movies
                        </li>
                        </Link>
                    </ul>
                    </div>
                </div>
                </nav>
            </div>
        
    )
}
