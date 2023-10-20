import react from "react";
import { Card, Col, Row } from "react-onsenui";
import Moment from 'react-moment';
import 'moment-timezone';
import { PostType } from "../../types";
import { feelLikeList } from "../common/const";

const Post = ({post}:Props) =>{
var imgNr;
  return(

    <Card modifier="post">
      <Row>
        <Col size="auto">
          <Row>
            {post.feelLike && post.feelLike>0 &&
              <Col width={20}>
                <img src={feelLikeList.find(fll=>fll.value===post.feelLike)?.img} height='64' width='64'/>
              </Col>}
            <Col size="auto">{post.comment}</Col>
          </Row>
          <Row>
            <Col>
              <Moment date={post.createdAt} format="YYYY/MM/DD hh:mm"></Moment>
            </Col>
          </Row>
        </Col>
      </Row>

    </Card>

  )
}

interface Props{
  post:PostType;
}

export default Post;
