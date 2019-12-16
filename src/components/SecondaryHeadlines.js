import React from 'react'

const SecondaryHeadlines = (props) => {
    if (props) {
        let secondaryNews = props.secondaryHeadlines.map( (headline, index) => {
            return (
                <div key={index} id="secondary-articles">
                    <img src={headline.urlToImage} alt={headline.title}></img>
                    <p className="secondary-source">{headline.source.name}</p>
                    <h1 className="secondary-title">{headline.title}</h1>
                    <p>{headline.description}</p>
                    <a className="link" href = {headline.url} target="_blank">READ MORE</a>
                    <button onClick={props.saveFavorite}></button>
                </div>
            )
        })
        return (
            <div id="secondary-container">
                {secondaryNews}
            </div>
        )
    } else {
        return (
            <div>Page is loading...</div>
        )
    }
}

export default SecondaryHeadlines