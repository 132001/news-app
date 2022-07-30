import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country : 'in',
    pageSize : 8,
    category :'general'
  }
  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }
  articles = []
  cl = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
  }
 
        constructor(props){
    super(props);
    this.state = {
      articles : this.articles,
      loading : false,
      page : 1,
      totalResults : 0
    }
    document.title = `${this.cl(this.props.category)} - NewsStatus`
  }
    updateNews = async()=>{
      this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading : true
    });
    let data = await fetch(url);
    this.props.setProgress(30)
    let personalData = await data.json()
    this.props.setProgress(70)
   //  console.log(personalData);
    this.setState ({
     articles : personalData.articles,
     totalResults: personalData.totalResults,
     loading : false
    });
    this.props.setProgress(100)
   }
 async componentDidMount(){
    this.updateNews();
  }
 fetchMoreData = async ()=> { 
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
 
  this.setState({
    page: this.state.page+1,
    loading : true
  });
  let data = await fetch(url);
  let personalData = await data.json()
 //  console.log(personalData);
  this.setState ({
   articles :  this.state.articles.concat(personalData.articles),
   totalResults: personalData.totalResults,
   loading : false
  });
};

  render() {
    return (
      <>
    
     
      <h1 className="text-center " style={{marginTop:'64px'}}>NewsStatus - Top {this.cl(this.props.category)} Headlines </h1><hr/>
      {this.state.loading && <Spinner/>}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader= {this.state.loading && <Spinner/>}>
          <div className="container">
      <div className="row my-3">
        {this.state.articles.map((element)=>{
          return  <div className="col-md-3 my-3" key={element.url}>
          <Newsitem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,60):""} author ={element.author} publishedAt={element.publishedAt} source = {element.source.name} imageUrl = {element.urlToImage?element.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpRuieYS5jQrPQega_O-B1LgCCLft85hgExg&usqp=CAU"} newsUrl={element.url}/>
          </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News
