import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import ArticlePreview from './ArticlePreview';
import PostsList from '../postsList';
import { findPostsByUserId, findPostsByFollowing } from '../services/posts-service';
import { findNewsreleases } from '../services/nps-services';


const Feed = () => {

    const { currentUser } = useSelector(state => state.auth);
    const [newsreleases, setNewsreleases] = useState([]);

    useEffect(() => {
        findNewsreleases()
            .then(response => {
                setNewsreleases(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            {currentUser && currentUser.role === 'hikers' && <PostsList postFunction={() => findPostsByFollowing(currentUser.following)} />}
            {currentUser && <PostsList postFunction={() => findPostsByUserId(currentUser._id)} />}
            <ul className="list-group">
                {newsreleases.map(newsrelease =>
                    <ArticlePreview key={newsrelease.id} article={newsrelease} />
                )}
            </ul>
        </div>
    )
}

export default Feed