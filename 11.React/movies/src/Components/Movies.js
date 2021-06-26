import React, { Component } from 'react';
// import { getMovies } from './getMovies';
import axios from "axios";

export default class Movies extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies : [],
            currSearchText :"",
            limit : 4,
            currPage : 1,
            cGenre : "All Genres",
            genres : [{"_id" :"acbd", "name": "All Genres" }]
            // filterList : getMovies()
        }

    }
    async componentDidMount(){
        console.log("Component Did Mount");
        let promise = await axios.get("https://backend-react-movie.herokuapp.com/movies");
        let genreRes = await axios.get("https://backend-react-movie.herokuapp.com/genres");
        this.setState({
            movies : promise.data.movies,
            genres : [...this.state.genres, ...genreRes.data.genres]
        })
    }
    handleDelete = (id) =>{
        let nmoviesList = this.state.movies.filter((movie) =>{
            return movie._id != id;
        })
        this.setState ({
            movies : nmoviesList,
            
        })

    }
    // Ye vala chis kaam karega par phir delete kaam nahi karega
    // Jo bhi temporary kaam hota hai na usse state se na karke render mai hi manipulate karna chahiye
    // Taki phir vo implementation mai aasaani ho toh handle change function mai filter array manipulate karne ki koi zaruarat nahi
    handleChange = (e) =>{
        let task = e.target.value;
        // if( task == ""){
        //     this.setState({
        //         filterList : this.state.movies,
        //         currSearchText :""
        //     })
        // }else{
        //     let nfilteredList = this.state.movies.filter((movie) =>{
        //         let title = movie.title.trim().toLowerCase();
        //         console.log(title);
        //         return title.includes(task.toLowerCase());
        //     })
        //     this.setState({
        //         filterList: nfilteredList,
        //         currSearchText : task
        //     })
        this.setState({
            currSearchText : task
        })        
    }
    handleRate = (e) =>{
        let order = e.target.className;
        let sortedArr = [];
        if( order == "fas fa-sort-up"){
            sortedArr = this.state.movies.sort((movieA, movieB) =>{
                return movieA.dailyRentalRate - movieB.dailyRentalRate;
            })

        }else if( order == "fas fa-sort-down"){
            sortedArr = this.state.movies.sort((movieA, movieB) =>{
                return movieB.dailyRentalRate - movieA.dailyRentalRate;
            })
        }
        this.setState({
            movies : sortedArr
        }
        )
    }
    handleStock = (e) => {
        let order = e.target.className;
        let sortedArr = [];
        if( order == "fas fa-sort-up"){
            sortedArr = this.state.movies.sort((movieA, movieB) =>{
                return movieA.numberInStock - movieB.numberInStock;
            })

        }else if( order == "fas fa-sort-down"){
            sortedArr = this.state.movies.sort((movieA, movieB) =>{
                return movieB.numberInStock - movieA.numberInStock;
            })
        }
        this.setState({
            movies : sortedArr
        })
    }
    handleLimit = (e) =>{
        let num = Number(e.target.value);
        this.setState({
            limit : num
        });
    }
    handlePageNumber = (pageNumber) =>{
        this.setState({
            currPage : pageNumber
        })
    }

    handleGenres = (genre) =>{
        this.setState({
            cGenre : genre
        })
    }
    render() {
        let {movies, currSearchText, currPage, limit, cGenre,genres} = this.state;
        let filterList = [];
        
        if( currSearchText != ""){
            filterList = movies.filter(movie =>{
                let title = movie.title.trim().toLowerCase();
                return title.includes(currSearchText);
            })
        }else{
            filterList = movies;
        }


        if(cGenre!='All Genres')
        {
            filterList = filterList.filter(function(movieObj){
                return movieObj.genre.name==cGenre
            })
        }
        /* 
            Pagination ka Code yaha pe Likhenge..
            Sabse pehle JSX mai Map Function hi kaam karta hai sirf toh Hame Sares Pages Array Mai lena Padega
        */
        let totalPages = Math.ceil(filterList.length / limit);
        let pageNumberArr = [];
        for( let i = 0 ; i < totalPages ; i++ ){
            pageNumberArr[i] = i + 1;
        }


        let startIndex = limit*(currPage - 1);
        let endIndex = limit + startIndex;
        filterList = filterList.slice(startIndex, endIndex);
        
        
        
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
            <div className="container">
            <div className = "row mt-3">
                <div className = "col-3">
                        {genres.length > 1 ? 
                        <>
                        <ul className="list-group list-group-flush">
                            {
                                genres.map((genre) =>{
                                    return (
                                        <li className = "list-group-item" key = {genre._id} onClick = {() => this.handleGenres(genre.name)}> {genre.name} </li>
                                    )
                                })
                            }
                        </ul>
                        <div> Curr Genre : {cGenre}</div>
                        </>
                        :
                        <div className="d-flex justify-content-center mt-3">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        </div>
                    }

                </div>
                <div className = "col-9 table-responsive">
                    <input type = "text" className= "form-control col-3" placeholder ="Enter here" value = {this.state.currSearchText} onChange = {this.handleChange}></input>
                    <input type = "number" className= "form-control col-3 mt-3" placeholder ="Limit" value = {this.state.limit > filterList.length ? filterList.length : this.state.limit}
                     onChange = {this.handleLimit} min ="1" max = {movies.length}></input>
                { movies.length > 0 ?
                    <table className="mt-3 table table-striped table-hover md-3 sd-6">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">
                        <i className="fas fa-sort-up" onClick = {this.handleStock}></i>
                            Stock
                        <i className="fas fa-sort-down" onClick = {this.handleStock}></i>
                        </th>
                        <th scope="col">
                        <i className="fas fa-sort-up" onClick = {this.handleRate}></i>
                            Rate
                        <i className="fas fa-sort-down" onClick = {this.handleRate}></i>
                            </th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                    {
                       
                        filterList.map( (movie) => {
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
                    : 
                    <div className="d-flex justify-content-center mt-3">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }
                    <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                        {/* <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                        
                        </li> */}
                        { pageNumberArr.map( (pageNumber) => {
                            let classStyle = pageNumber == currPage ? "page-item active" : "page-item";

                            return (
                                <li className = {classStyle} key = {pageNumber} onClick = {()=>this.handlePageNumber(pageNumber)}>
                                    <span className = "page-link">{pageNumber}</span></li>
                            )
                        })
                        
                        
                        }


                    </ul>
                    </nav>



                </div>
                </div>
            </div>
            
            </div>
        )
    }
}

