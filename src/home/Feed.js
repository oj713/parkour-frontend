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
        <div className = "w-100">
            {currentUser && currentUser.role === 'hikers' &&
            <>
            <h4 className = "brown-4 m-2 fst-italic">Following</h4>
            <PostsList postFunction={() => findPostsByFollowing(currentUser.following)} />
            </>}
            {currentUser && <PostsList postFunction={() => findPostsByUserId(currentUser._id)} />}
            <h4 className = "brown-4 m-2 fst-italic"> National Park News </h4>
            <ul className="list-group">
                {newsreleases.map(newsrelease =>
                    <ArticlePreview key={newsrelease.id} article={newsrelease} />
                )}
            </ul>
        </div>
    )
}

export default Feed