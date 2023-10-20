import react from "react";
import { Card } from "react-onsenui";

const Post = ({post}:Props) =>{

  return(
    <Card>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </Card>
  )
}

interface Props{
  post:Post;
}

interface Post{
  comment: string;
  createdAt: Date;
  objectId: string;
  updatedAt: Date;
}

export default Post;
