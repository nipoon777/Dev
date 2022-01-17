import React, { Component } from 'react'
import { movies } from './getMovies';

export default class Banner extends Component {
    render() {
        console.log(movies);
        let movie = movies.results[1];
        console.log(movie);
        return (
            <>
            {movie == "" ?
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                :
                <div className="card banner-main banner-card" style = {{marginTop:0, border:"0px"}} >
                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top banner-img" alt={movie.title}/>
                    <div className ="card-body">
                        <h5 className ="card-title banner-title">{movie.original_title}</h5>
                        <p className="card-text banner-text">{movie.overview}</p>
                    </div>
                </div>
            }                        
            </>
        )
    }
}
