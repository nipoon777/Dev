import React, { Component } from 'react'
import { getMovies } from './getMovies';

export default class Movies extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies : getMovies()
        }

    }
    handleDelete = (id) =>{
        let nmoviesList = this.state.movies.filter((movie) =>{
            return movie._id != id;
        })
        this.setState ({
            movies : nmoviesList
        })

    }
    render() {
        let {movies} = this.state;
        return (
            <div>
                {
                    movies.map( (movie) => {
                        return (
                            <div className = "movie_item" key = {movie._id}> 
                            <span>Title : {movie.title}</span> 
                            <span>Genre : {movie.genre.name} </span>
                            <span>NumberInStock : {movie.numberInStock}</span>
                            <button onClick = {()=>this.handleDelete(movie._id)}>Delete</button>
                            </div>
                        )
                    })
                } 
            </div>
        )
    }
}
