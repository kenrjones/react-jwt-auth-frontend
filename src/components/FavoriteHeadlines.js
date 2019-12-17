import React from 'react'


const FavoriteHeadlines = (props) => {
    if (props.favoriteHeadlines) {
        let favoritenews = props.featuredHeadlines.map( (headline, index) => {
            if (props.user) {
                return (
                    <div key={index} id="favorite-articles">
                        <img src={headline.urlToImage} alt={headline.title}></img>
                        <p className="favorite-source">{headline.source.name}</p>
                        <h1 className="favorite-title">{headline.title}</h1>
                        <p>{headline.description}</p>
                        <a className="link" href = {headline.url} target="_blank">READ MORE</a>
                        <button onClick={() => props.saveFavorite(headline)}>Save</button>
                    </div>
                )
            }
            else {
                return (
                    <div key={index} id="favorite-articles">
                        <img src={headline.urlToImage} alt={headline.title}></img>
                        <p className="favorite-source">{headline.source.name}</p>
                        <h1 className="favorite-title">{headline.title}</h1>
                        <p>{headline.description}</p>
                        <a className="link" href = {headline.url} target="_blank">READ MORE</a>
                    </div>
                )
            }
        })
        return (
            <div id="favorite-container">
                {favoritenews}
            </div>
        )
    } else {
        return (
            <div>Page is loading...</div>
        )
    }
}

export default FavoriteHeadlines
