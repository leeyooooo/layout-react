import React, {useEffect, useState} from "react";
import { getPosts } from "../../WebAPI";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const PostContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    padding: 50px 0;
`
const PostTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    p {
        color: #555;
    }
`

const Post = ({ post }) => {
    const {title, body, createdAt} = post
    return (
        <PostContainer>
            <PostTitle>
                <h1>{title}</h1>
                <p>{new Date(createdAt).toLocaleString()}</p>
            </PostTitle>
            <p>{body}</p>
        </PostContainer>
    )
}

export default function PostsPage() {
    const [posts, setPosts] = useState([])
    const { userId } = useParams();
    useEffect(() => {
        getPosts().then((post) => {
            post && setPosts(post)
        });
      }, []);
    const currentPost = posts && posts.filter(current => current.id === parseInt(userId))
  return (
    currentPost.map(current => {
        return (
            <Post key={current.id} post={current} />
        )
    })
  );
}
