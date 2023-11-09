import React from 'react';
import './index.css';

const ArticlePreview = ({ article }) => {
    const {
        url,
        title,
        abstract,
        image,
        relatedParks,
        releaseDate
    } = article;

    return (
        <div className="card w-100 mb-3 card-bg">
            <div className="card-body">
                <h2 className="card-title green2">{title}</h2>
                <div className="card-text">
                    {abstract}
                </div>
                <div className="card-text">
                    <small className="text-muted">
                        Release Date: {new Date(releaseDate).toLocaleDateString()}
                    </small>
                </div>
                {relatedParks.length > 0 && (
                    <div className="card-text">
                        Related Park: <a className ="green1" href={relatedParks[0].url} target="_blank" rel="noopener noreferrer">{relatedParks[0].name}</a>
                    </div>
                )}
                <a href={url} className="btn parkour-btn green-btn mt-2 m-0" target="_blank" rel="noopener noreferrer">
                    Read More
                </a>
            </div>
            <img className="card-img-bottom border-0 " src={image.url} alt={image.altText} />
        </div>
    );
};

export default ArticlePreview;
