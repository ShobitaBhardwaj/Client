import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                <Text variant="h5">
                    Reach out to me on
                    <Link href="https://www.instagram.com/s.h.o.b.i.t.a/" color="inherit" target="_blank">
                        <Instagram/>
                    </Link>
                    or send me an Email 
                    <Link href="mailto:bhardwajshobita58@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                    If you are interested, you can view some of my favorite projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/ShobitaBhardwaj" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;