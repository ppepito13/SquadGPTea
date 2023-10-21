import react from "react";
import { Button, Card, Col, Row } from "react-onsenui";
import Moment from 'react-moment';
import 'moment-timezone';
import { PostType } from "../../types";
import { feelLikeList } from "../common/const";
import store from "../../redux/store";
import { sharePost } from "../../redux/PostSlice";
import emotionsList from '../common/emocje.json';

const Post = ({post, editable}:Props) =>{
  const dispatch = store.dispatch;

  const shared = post.ACL && post.ACL["hzcEe6itaG"];

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
              {post.emotions?.map((e,i)=><span className="notification" style={{'background-color':emotionsList.find(el=>el.name===e)?.color}}>{e}</span>)}
            </Col>
          </Row>
          <Row>
              {post.images?.map(e=><Col><img src={e} height='64' width='64'/></Col>)}
          </Row>
          <Row>
            {editable &&
              <Col>
                {!shared && <Button onCLick={()=>dispatch(sharePost(post, true))}>Share</Button>}
                {shared && <Button onCLick={()=>dispatch(sharePost(post, false))}>Unshare</Button>}
              </Col>
            }
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
  editable: boolean;
}

export default Post;
