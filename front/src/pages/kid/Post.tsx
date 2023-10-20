import react from "react";
import { Card, Col, Row } from "react-onsenui";
import verySadIcon from '../../assets/feel-like/1_very_sad.png';
import sadIcon from '../../assets/feel-like/2_sad.png';
import neutralIcon from '../../assets/feel-like/3_neutral.png';
import hepiIcon from '../../assets/feel-like/4_hepi.png';
import veryHepiIcon from '../../assets/feel-like/5_very_hepi.png';
import Moment from 'react-moment';
import 'moment-timezone';

const feelLikeList = [
  {img:verySadIcon, value:0},
  {img:sadIcon, value:1},
  {img:neutralIcon, value:2},
  {img:hepiIcon, value:3},
  {img:veryHepiIcon, value:4}
]


const Post = ({post}:Props) =>{
var imgNr;
  return(

    <Card modifier="post">
      <Row>
      <Col size="auto">
        <Row>
          <Col><img src={feelLikeList.find(fll=>fll.value===post.feelLike)?.img} height='64' width='64'></img></Col>
        </Row>
        <Row>
            <Col>
            <Moment date={post.createdAt} format="YYYY/MM/DD hh:mm"></Moment>
            </Col>
        </Row>
      </Col>
      <Col size="auto">{post.comment}</Col>
      </Row>

    </Card>

  )
}

interface Props{
  post:Post;
}

interface Post{
  comment: string;
  feelLike: number;
  emotions: string[];
  images: string[];
  createdAt?: Date;
  objectId?: string;
  updatedAt?: Date;
}

export default Post;
