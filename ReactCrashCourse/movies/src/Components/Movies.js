import React, { Component } from 'react'
// import {movies} from "./getMovies";
import axios from "axios";

export default class Movies extends Component {
    constructor(){
        super();
        this.state = {
            hover : "",
            parr :[1],
            currPage : 1,
            movies:[],
            favorites :[]
        }
    }
    async componentDidMount() {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c46c0ccbe791299e4bb9402e552259a2&language=en-US&page=${this.state.currPage}`)
        let data = res.data.results;
        this.setState({
            movies : [...data]
        })
    }

    changeMovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c46c0ccbe791299e4bb9402e552259a2&language=en-US&page=${this.state.currPage}`)
        let data = res.data.results;
        this.setState({
            movies : [...data]
        })
    }

    handleRight = ()=>{
        this.setState({
            parr : [...this.state.parr, this.state.parr.length + 1],
            currPage : this.state.parr.length + 1
        }, this.changeMovies)
    }

    handleLeft = () =>{
        if( this.state.currPage != 1 ){
            this.setState({
                currPage : this.state.currPage - 1
            }, this.changeMovies)
        }
    }

    handleClick = (val) =>{
        if( val != this.state.currPage){
            this.setState({
                currPage: val
            }, this.changeMovies)
        }

    }
    handleFavorites = (movie) => {
        let oldData = JSON.parse(localStorage.getItem("movies")||"[]" );

        if( this.state.favorites.includes(movie.id) ){
            oldData = oldData.filter((movieObj) => { return movieObj.id != movie.id });

        }else{
            oldData.push(movie);
        }

        
        localStorage.setItem("movies", JSON.stringify(oldData));
        console.log(oldData);
        let temp = oldData.map((movie) => movie.id);
        this.setState({
            favorites: [...temp]
        })


    }

    render() {
        console.log("render");
        return (
            <>
                {
                    this.state.movies.length == 0 ?
                        <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </div>
                    :
                    <div>
                    <h3 className='text-center'><strong>Trending</strong></h3>
                    <div className='movies-list'>
                    {
                        
                        this.state.movies.map( (movieObj) => (
                            <div className="card movies-card" onMouseEnter={()=>this.setState({ hover : movieObj.id })}
                            onMouseLeave={()=> this.setState({hover : ""})}>
                                <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movies-img" alt={movieObj.title}/>
                                
                                    <h5 className ="card-title movies-title">{movieObj.original_title}</h5>
                                    {/* <p className="card-text movies-text">{movieObj.overview}</p> */}
                                    <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>
                                               { this.state.hover == movieObj.id &&                                           
                                                <a className="btn btn-primary movies-button" onClick={()=> this.handleFavorites(movieObj)}>{this.state.favorites.includes(movieObj.id)?"Remove from favourites":"Add to Favorites"}</a>
                                               }
                                    </div>
                                
                            </div>
                        ))
                        
                    }
                    
                    </div>

                    </div>
                    

                }
                <div style={{display :"flex", justifyContent: "center"}}>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                        {
                            this.state.parr.map( (val) =>(
                                <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(val)}>{val}</a></li>
                            ))
                        }
                        <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                    </ul>
                </nav>


                </div>
            </>
            
        )
    }
}
