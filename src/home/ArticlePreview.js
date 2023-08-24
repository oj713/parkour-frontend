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
        <div className="card w-100 my-3 card-bg">
            <img className="card-img-top border-0 " src={image.url} alt={image.altText} />
            <div className="card-body">
                <h4 className="card-title">{title}</h4>
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
                        Related Park: <a href={relatedParks[0].url} target="_blank" rel="noopener noreferrer">{relatedParks[0].name}</a>
                    </div>
                )}
                <a href={url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    Read More
                </a>
            </div>
        </div>
    );
};

export default ArticlePreview;
