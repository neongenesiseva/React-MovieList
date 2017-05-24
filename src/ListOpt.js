import React from 'react';
// import ReactNative from 'react-native';
// import {
//   Platform,
//   Switch,
//   Text,
//   View
// } from 'react-native';

class ListOpt extends React.Component{

  constructor(props){
  	super(props);
  	this.state = {

    };
    // this.imgSrc=this.imgSrc.bind(this);
  }

  // imgSrc(){
  //   let prefix = "https://image.tmdb.org/t/p/w500";
  //   let url1 = {this.props.value.backdrop_path};
  //   let url = prefix + url1;
  //   return url;
  // }


  render(){
    return(
      <div className="row">
          <div className="col-lg-5">
            <img src={`https://image.tmdb.org/t/p/w500${this.props.value.backdrop_path}`} alt={this.props.value.title}/>
          </div>
          <div className="col-lg-7">
            <p>{this.props.value.original_title}</p>
            <p>{this.props.value.release_date}</p>
            <p>{this.props.value.vote_count}</p>
            <p>{this.props.value.vote_average}</p>
            <p>{this.props.value.overview}</p>
            <span onClick={this.props.likeListKey.indexOf(this.props.value.id) === -1?()=>this.props.passData(this.props.value.id):()=>this.props.passData(this.props.value.id)}>
            {this.props.likeListKey.indexOf(this.props.value.id) === -1 ? <span className="glyphicon glyphicon-star-empty">Like</span> : <span className="glyphicon glyphicon-star">Unlike</span>}
            </span>

          </div>
      </div>
    );
  }



}

export default ListOpt;
