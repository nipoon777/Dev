import React, { Component } from 'react'
import { getMovies } from './getMovies';

export default class Movies extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies : getMovies(),
            currSearchText :"",
            // filterList : getMovies()
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
    render() {
        let {movies, currSearchText} = this.state;
        let filterList = [];
        if( currSearchText != ""){
            filterList = movies.filter(movie =>{
                let title = movie.title.trim().toLowerCase();
                return title.includes(currSearchText);
            })
        }else{
            filterList = movies
        }
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
                        <th scope="col">
                        <i className="fas fa-sort-up"></i>
                            Stock
                        <i className="fas fa-sort-down"></i>
                        </th>
                        <th scope="col">
                        <i className="fas fa-sort-up"></i>
                            Rate
                        <i className="fas fa-sort-down"></i>
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




                </div>
            </div>
            
            </div>
        )
    }
}

