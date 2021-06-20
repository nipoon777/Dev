import React, { Component } from 'react'
import { getMovies } from './getMovies';

export default class Movies extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies : getMovies(),
            currSearchText :""
        }

    }
    handleDelete = (id) =>{
        let nmoviesList = this.state.movies.filter((movie) =>{
            return movie._id != id;
        })
        this.setState ({
            movies : nmoviesList,
            
        })

    }
    handleChange = (e) =>{
        this.setState({
            currSearchText : e.target.value
        })
    }
    render() {
        let {movies} = this.state;
        return (
            <div>
            <div>
                <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                    <h3 className="display-6"><img src="https://www.freeiconspng.com/uploads/movie-icon-27.png" alt="" width="40" height="34" className="d-inline-block align-text-top"/>
                     Movies</h3>
                    </a>
                </div>
                </nav>
            </div>
            <div className = "row mt-3">
                <div className = "col-3">
                    Hello
                </div>
                <div className = "col-9 table-responsive">
                    <input type = "text" className= "form-control col-3" placeholder ="Enter here" value = {this.state.currSearchText} onChange = {this.handleChange}></input>
                    <table className="mt-3 table table-striped table-hover md-3 sd-6">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        movies.map( (movie) => {
                            return (
                                <tr className = "movie_item" scope = "row" key = {movie._id}>
                                <td></td> 
                                <td>{movie.title}</td> 
                                <td>{movie.genre.name} </td>
                                <td> {movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td><button className = "btn btn-danger"onClick = {()=>this.handleDelete(movie._id)}>Delete</button></td>
                                </tr>
                            )
                        })
                    }    
                        
                    </tbody>
                    </table>   




                </div>
            </div>
            
            </div>
        )
    }
}

