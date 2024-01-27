
import { useEffect, useState } from 'react';

import { API } from '../../../service/api.js';

const Posts = () => {
    //There can be multiple posts so an array of objects will be returned
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts();
            console.log('API Response:', response);

            if (response.isSuccess) {
                setPosts(response.data);
            }
        }
        fetchData();
    }, [])

    return (
        <>
            {
                posts && posts.length > 0 ? posts.map(post => (
                    <div>Hello</div>))
                    : <div> No data available to display </div>
            }
        </>
    )
}

export default Posts;