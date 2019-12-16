import React from 'react'

const SecondaryHeadlines = (props) => {
    if(props.moreHeadlines){
        return (
            <div id="secondary-headlines">
                <div>
                    <p className="secondary-source">{props.secondaryHeadlines.source.name}</p>
                    <h1 className="secondary-title">{props.secondaryHeadlines.title}</h1>
                    <p className="secondary-description">{props.secondaryHeadlines.description}</p>
                    <a className="link" href = {props.secondaryHeadlines.url} target="_blank">READ MORE</a>
                    {/* <p classname="featured-author">{props.featuredHeadline.author}</p> */}
                </div>
                <div>
                    <img className="secondary-image" src={props.secondaryHeadlines.urlToImage} alt={props.seconaryHeadlines.title}></img>
                </div>
            </div>
        ) 
    } else {
        return (
            <div>Page is loading...</div>
        )
    }
}

export default SecondaryHeadlines