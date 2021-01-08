import React from 'react';
import Header from './Header';
import Home from './Home';
import './ShowDetails.css';
import * as API from './Services';
class ShowDetails extends React.Component {
   
    constructor(props){
        super(props);
        this.state = {
            shows:[],
            goToHome:false
        }
        
    }
   
    componentDidMount(){
        var records = [];
        API.onAuthenticate().then((res)=>{
            res.forEach(element => {
                if(element.show.id === this.props.showId){
                    records.push(element);
                } 
            });
            this.setState({ shows: records });
         }) 
    }
    goToHome = () =>{
        this.setState({goToHome:true})
    }

    render(){
        if(this.state.goToHome){
            return (<Home/>);
        }else{
            return (

                <React.Fragment>
                    <div className="App">
                       <Header/>
    
                        <div className="container">
                           <button className="episodeBtn" onClick={this.goToHome}>Back</button><label>Show Details</label>
                            {this.state.shows ? this.state.shows.map(itm => {
                                return (
                                    <div className="detailArea" key={itm.show.id}>
                                        <div className="mainArea">
                                        <div className="showimage">
                                            <img src={itm.show.image.medium} alt="showImg" />
                                        </div>
                                        <div className="showDetail">
                                            <header className="contentHeader">{itm.show.name}</header>
                                            <p className="contentDesc">{itm.show.summary.replace(/<\/?[^>]+>/gi, '')}</p>
                                            
                                        </div>
                                    </div>
                                    <div className="ratingArea">
                                        <div>
                                        <button className="ratingBtn">10</button>
                                        <span>Rating : </span>{itm.show.rating.average} | <span>Premiered On :</span>{itm.show.premiered}
                                            </div>
                                    
                                    </div>
                                    </div>
                                     
                                    )
                            }) : <div>
                                    <p>No Data Found</p></div>}
    
    
                        </div>
                    </div>
    
                </React.Fragment>
            );
        }
   
    }
}
export default ShowDetails;
