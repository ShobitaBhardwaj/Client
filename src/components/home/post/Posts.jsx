
import { useEffect, useState } from 'react';

import { Box, Grid } from '@mui/material';
import { useSearchParams, Link } from 'react-router-dom';

import { API } from '../../../service/api.js';

import Post from './Post.jsx';

const Posts = () => {
    //There can be multiple posts so an array of objects will be returned
    const [posts, setPosts] = useState([]);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');


    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts({ category: category || '' });
            console.log('API Response:', response);

            if (response.isSuccess) {
                setPosts(response.data.posts);
            }
        }
        fetchData();
    }, [category])

    return (
        <>
            {
                posts && posts.length > 0 ? posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link to={`details/${post._id}`} style={{ textDecoration:'none', color:'inherit'}} >
                            <Post post={post} />
                        </Link>
                    </Grid>
                ))
                    : <Box style={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}> No data available to display </Box>
            }
        </>
    )
}

export default Posts;