
import { Box, Typography, styled } from "@mui/material";
import { addElipsis } from '../../../utils/common-utils.js';

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius:10px;
    margin:10px;
    height:350px;
    display:flex;
    align-items:center;
    flex-direction:column;
    & >p{
        padding:0 5px 5px 5px;
    }
`;
const Image = styled('img')({
    width: '100%',
    borderRadius: '10px 10px 0 0',
    ObjectFit: 'cover',
    height: '150px',

});

const Text = styled(Typography)`
 color:#878787;
 font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size:18px;
    font-weight:600px;
`;

const Details = styled(Typography)`
    font-size:14px;
    word-break:break-word;
`

const Post = ({ post }) => {

    const url = 'https://wallpapers.com/images/high/4d-ultra-hd-floating-lotus-flower-0yulcltv0zt7mvgm.webp';
    return (
        <Container>
            <Image src={url} alt="Blog" />
            <Text>Category : {post.categories}</Text>
            <Heading>Title : {addElipsis(post.title , 20)}</Heading>
            <Text>Username : {post.username}</Text>
            <Details>Description : {addElipsis(post.description , 100)}</Details>

        </Container>
    )
}

export default Post;