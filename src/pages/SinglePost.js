import React from "react"
import {Link, useParams} from "react-router-dom"

const SinglePost = ({posts, edit, deletePost}) => {
    // get the params from the url
    const params = useParams()
    const id = parseInt(params.id)

    // find the particular post the user wants to see based on the param
    const post = posts.find((p) => p.id === id)
    console.log(post)

    ////////////////////
    // Style Object
    /////////////////////
    const div = {
        textAlign: "center",
        border: "3px solid green",
        width: "80%",
        margin: "30px auto"
    }


    return <div style={div}>
        <h1>{post?.title}</h1>
        <h2>{post?.author}</h2>
        <article>{post?.article}</article>
        <button onClick={() => deletePost(post)}>Delete</button>
        <button onClick={() => edit(post)}>Edit</button>
        <Link to="/">
            <button>Go Back</button>
        </Link>
    </div>
}

export default SinglePost;