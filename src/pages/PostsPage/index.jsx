import React, {useContext} from "react";
import { PostContext } from "../../contexts";
// import { BrowserRouter as useParams } from "react-router-dom";

export default function PostsPage() {
    const { id } = useContext(PostContext)
    console.log(id)
  return (
    <div>
        {/* {currentPost} */}
    </div>
  );
}
