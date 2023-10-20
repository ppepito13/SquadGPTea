import react from "react";
import { Card, Col, Row } from "react-onsenui";
import Moment from 'react-moment';
import 'moment-timezone';
import { PostType } from "../../types";
import { emotionsList, feelLikeList } from "../common/const";

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
              {post.emotions?.map(e=><span class="notification" style = {{'background-color':emotionsList.find(el=>el.value===e)?.color}}>{emotionsList.find(el=>el.value===e)?.label}</span>)}
            </Col>
          </Row>
          <Row>
            
              {post.images?.map(e=><Col><img src={e} height='64' width='64'/></Col>)}
            
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
