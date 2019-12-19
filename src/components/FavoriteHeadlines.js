import React from 'react'


// const FavoriteHeadlines = (props) => {
class FavoriteHeadlines extends React.Component {

    handleDelete = (e, headline) => {
        e.preventDefault()
        this.props.deleteStory(headline.id)
    }

    render() {
        console.log(this.props)
    if (this.props.stories) {
        let favoritenews = this.props.stories.map( (headline, index) => {
            console.log(headline.data)
            if (this.props.user) {
                return (
                    <div key={index} id="favorite-articles">
                        <img src={headline.source.urlToImage} alt={headline.source.title}></img>
                        <p className="favorite-source">{headline.source.source.name}</p>
                        <h1 className="favorite-title">{headline.source.title}</h1>
                        <p>{headline.source.description}</p>
                        <a className="link" href = {headline.url} target="_blank">READ MORE</a>
                        <button onClick={e => this.handleDelete(e, headline)}>Delete</button>
                    </div>
                )
            }
            else {
                return (
                    <div key={index} id="favorite-articles">
                        <img src={headline.source.urlToImage} alt={headline.source.urlToImage}></img>
                        <p className="favorite-source">{headline.source.source.name}</p>
                        <h1 className="favorite-title">{headline.source.title}</h1>
                        <p>{headline.source.description}</p>
                        <a className="link" href = {headline.url} target="_blank">READ MORE</a>
                        <button onClick={e => this.handleDelete(e, headline)}>Delete</button>
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
}

export default FavoriteHeadlines
