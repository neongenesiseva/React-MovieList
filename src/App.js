import React, { Component } from 'react';
// import ReactNative from 'react-native';
// import {
//   Platform,
//   Switch,
//   Text,
//   View
// } from 'react-native';
import './App.css';
import ListOpt from './ListOpt';
import Header from './header';
import $ from 'jquery';

class App extends Component {

  constructor(props){
  	super(props);
  	this.state = {
      unChangeList:[],
      likeListKey:[],
      likeList:[],
      json:[],
      page:0,
      total:1
    };
  this.fetchMoviesList=this.fetchMoviesList.bind(this);
  this.handleShift=this.handleShift.bind(this);
  this.sorting=this.sorting.bind(this);
  this.myCallback=this.myCallback.bind(this);
  this.toggleLike=this.toggleLike.bind(this);
  }

  fetchMoviesList(pageNumber=1){
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=4bef8838c2fd078bd13d7127d8dedcd4&language=en-US?&page=${pageNumber}`)
    .then(res=>{res.json().then(jsonfile=>{
                                          let tempArr = jsonfile.results.slice(0);
                                          tempArr.forEach(function(cur){
                                            cur.like=false;
                                          });
                                          this.setState({unChangeList:tempArr});
                                          this.setState({json:tempArr});
                                          this.setState({page:jsonfile.page});
                                          this.setState({total:jsonfile.total_pages});
                                          console.log(this.state.json)
                                          })
                  });
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop >100){
    document.body.scrollTop=0;
    document.documentElement.scrolTop = 0;
    //when locating to another page, automatically go to the top side
    };
  }
  //fetch is native in javascript, does not need additional library.

  // tempFetch(){
  //   $.ajax("https://api.themoviedb.org/3/movie/top_rated?api_key=4bef8838c2fd078bd13d7127d8dedcd4&language=en-US?&page=2")
  //   .done(res=>{console.log(res.results)})
  // }
  //use jquery to ajax call, without json()

  componentDidMount() {
    this.fetchMoviesList();
    // this.tempFetch();
  }


  sorting(e){
    let keyword = e.target.getAttribute('data-id');
    console.log(keyword);//
    console.log(typeof (keyword));//string
    let tempArray = this.state.json.slice(0);
    //let sortedArray =tempArray.sort(function(a,b){return (a.keyword - b.keyword)});
    //this is to sort number rather than string;
    let sortedArray = tempArray.sort(function(a,b){
      if (a[keyword] < b[keyword]){
        return 1;
      }
      if (a[keyword] > b[keyword]){
        return -1;
      }
      return 0;
    })
    this.setState({json:sortedArray});
  };
  //this works for both string and array;
  //use a.keyword will return undefined,but use a[keyword] works
  //because keyword was wrapped in Quotes "", should use a[keyword]


  //shift page, use different method according to using input box or button,
  handleShift(e){
    e.preventDefault();
    let requestPage;
    if(e.target.tagName==="BUTTON"){
    const action = e.target.getAttribute('data-id');
    if (action === "Prev"){
      requestPage=this.state.page-1
    } else {
      requestPage = this.state.page+1
    }} else {
      console.log(this.textInput.value);
      requestPage=parseInt(this.textInput.value,10);
    }

    if (requestPage<1){
      alert('you are in the first page');
    } else if (requestPage < this.state.total+1){
      this.fetchMoviesList(requestPage);
      $('#request').trigger('reset');
      //clear input range;
    } else {
      alert(`this just have ${this.state.total} pages`);
    }
  }


  //Callback function which carries dataFormChild as a parameter from child component
  //Process data
  myCallback(dataFromChild){
    let temp = this.state.likeListKey.slice(0);
    let tempA = this.state.json.slice(0);
    let tempB = this.state.likeList.slice(0);
    if (temp.indexOf(dataFromChild) === -1){

      temp.push(dataFromChild);

      this.setState({likeListKey:temp});

      for (let ele of tempA){
        if (ele.id === dataFromChild){
          tempB.push(ele);
        }
      };

      this.setState({likeList:tempB});

      console.log(this.state.likeList);
  } else {
    let location = temp.indexOf(dataFromChild);
    temp.splice(location,1);
    tempB.splice(location,1);
    this.setState({likeListKey:temp});
    this.setState({likeList:tempB});
    this.setState({json:tempB});
  }
  }

  //get like list and jump back to normal list
  toggleLike(event){
    event.preventDefault();
    let eventName = event.target.getAttribute('data-id');
    if (eventName === "likeList" && this.state.likeList.length === 0){
      $('#text').html("<b>Your Like List Is Empty!</b>");
      this.setState({json:[]});
      } else {
      $('#text').html("");
      let temp = this.state[eventName];
      this.setState({json:temp});
      }
  }

  render() {
    return (
      <div className="container">
      <div className="App">
        <Header/>
        <button data-id="likeList" onClick={this.toggleLike}>Like List</button>
        <button data-id="unChangeList" onClick={this.toggleLike}>Normal List</button>
        <br/>
        <button className="btn btn-primary" onClick={this.sorting} data-id="vote_count">by vote count</button><button className="btn btn-primary" onClick={this.sorting} data-id="title">by title</button><button className="btn btn-primary" onClick={this.sorting} data-id="vote_average">by vote_average</button>
        <p><span><button data-id="Prev" onClick={this.handleShift}>Prev</button></span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{this.state.page} / {this.state.total}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span><button data-id="Next" onClick={this.handleShift}>Next</button></span></p>
        <form id="request">
          <input className="btn btn-primary" type="submit" onClick={this.handleShift} value="GO TO"/><input type="text" ref={(input) => { this.textInput = input; }}/>
        </form>
        <div id="text"></div>
          {
            this.state.json.map((value,i)=>(<ListOpt value={value} key={i} passData={this.myCallback} likeListKey={this.state.likeListKey}/>))
          }
        <button data-id="Prev" onClick={this.handleShift} className="btn btn-primary">Prev</button>
        <button data-id="Next" onClick={this.handleShift} className="btn btn-primary">Next</button>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
      </div>
    );
  }
}

export default App;
