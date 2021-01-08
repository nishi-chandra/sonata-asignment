import React from 'react';
import Header from './Header';
import ShowDetails from './ShowDetails';
import './Home.css';
import searchicon from './magnifying-glass.svg';
import * as API from './Services';
class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            filterText: '',
            shows: [],
            displayDetails:false,
            showId:null
        }
    }

    componentDidMount() {
        this.apiCall();
    }

    apiCall = () => {
      
                API.onAuthenticate().then((res)=>{
                    this.setState({ shows: res });
                 }) 
    }
    handleTextChange = (e) => {
        this.setState({ filterText: e.target.value });
        if (e.target.value === "") {
            this.apiCall();
        }
    }
    filterData = (e) => {
        e.preventDefault();
        var filteredRecords = [];
      
        this.state.shows.forEach(itm => {
            if (itm.show.name.toLowerCase().includes(this.state.filterText.toLowerCase())) {
                filteredRecords.push(itm);
            }
        })
      
        this.setState({ shows: filteredRecords });
    }

    loadShowDetails = (index)=>{
        this.setState({displayDetails:true,showId:index});
    }
    render() {
        if (this.state.error) {
            return <p>{this.state.error.message}</p>
        }


        if(this.state.displayDetails){
            return <ShowDetails showId={this.state.showId}/>
        }else{
            return (

                <React.Fragment>
                    <div className="App">
                       <Header/>
                        <div className="container">
                            <div className="search">
                                <form className="search-form" onSubmit={this.filterData}>
                                    <img src={searchicon} className="search-icon" alt="searchicon" />
    
                                    <input type="text" placeholder="search show titles" value={this.state.filterText} onChange={this.handleTextChange} />
                                    <input type="submit" value="Submit" />
                                </form>
                            </div>
                            {this.state.shows ? this.state.shows.map(itm => {
                                return (
                                    <div className="contentArea" key={itm.show.id}>
                                        <div className="showimage">
                                            <img src={itm.show.image.medium} alt="showImg" />
                                        </div>
                                        <div className="showContent">
                                            <header className="contentHeader">{itm.show.name}</header>
                                            <p className="contentDesc">{itm.show.summary.replace(/<\/?[^>]+>/gi, '')}</p>
                                            <button className="episodeBtn" onClick={()=>this.loadShowDetails(itm.show.id)}>Show Episodes</button>
                                        </div>
                                    </div>)
                            }) : <div>
                                    <p>No Data Found</p></div>}
    
    
                        </div>
                    </div>
    
                </React.Fragment>
            );
        }
        
    }
}

export default Home;