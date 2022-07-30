import React, { Component } from 'react'

export class Newsitem extends Component { 
  render() {
    let {title,description,imageUrl,newsUrl,author,publishedAt,source} = this.props;
    
    return (
      <div >
       <div className="card" style={{width: "18rem"}}>
       <div style={{display:'flex', justifyContent:'flex-end',position:'absolute',right:'0'}} >
       <span className="badge rounded-pill bg-danger">{source}123</span>
       </div>
  <img src={imageUrl}  style={{height: "200px"}} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}... </h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By {author? author : "Unknown"} on {new Date(publishedAt).toGMTString()}</small></p>
    <a href= {newsUrl} target = "blank" className="btn btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem
