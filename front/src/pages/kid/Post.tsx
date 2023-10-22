import React, { useState } from "react";
import { Button, Card, Col, Row, Switch } from "react-onsenui";
import 'moment-timezone';
import { PostType } from "../../types";
import { feelLikeList } from "../common/const";
import store from "../../redux/store";
import { sharePost } from "../../redux/PostSlice";
import emotionsList from '../common/emocje.json';
import { FaPlay } from "react-icons/fa";
import moment from "moment";

const Post = ({post, editable, terapist}:Props) =>{
  const dispatch = store.dispatch;
  const [showSentiment, setShowSentiment] = useState(false);

  const playRecord = (r) =>{
    console.log(r)
    // const audioRef = new Audio(`data:${record!.value.mimeType};base64,${record!.value.recordDataBase64}`)
    const audioRef = new Audio(r);
    audioRef.oncanplaythrough = () => audioRef.play()
    audioRef.load()
  }

  const shared = post.ACL && post.ACL["hzcEe6itaG"];

  return(
    <Card modifier="post">
      <Row>
        <Col verticalAlign="bottom" width="100">
          <p className="post-date">{moment(post.createdAt).format("YYYY-MM-DD HH:mm")}</p>
        </Col>
      </Row>
      <Row>
        <Col width="25">
          <Row>
            {post.feelLike && <img src={feelLikeList.find(fll=>fll.value===post.feelLike)?.img} height='64' width='64'/>}
          </Row>
          <Row>
            {editable &&
              <Col>
                <Switch checked={shared} onChange={()=>dispatch(sharePost(post, !shared))} />
                <p className="sharedText">{shared? "shared" : ""}</p>
              </Col>
            }

            {terapist && post.sentiment &&
              <Col>
                <Switch checked={showSentiment} onChange={()=>setShowSentiment(!showSentiment)} />
              </Col>
            }
          </Row>
        </Col>
        <Col>
          <Row>
            <p className="post-comment">{post.comment}</p>
          </Row>
          <Row>
            {post.emotions?.map((e,i)=><span className="notification" style={{'background-color':emotionsList.find(el=>el.name===e)?.color}}>{e}</span>)}
          </Row>
          {(post.images?.length>0 || post.records?.length>0) && <hr/>}
          <Row>
            {post.images?.map(e=><Col><img src={e} height='64' width='64'/></Col>)}

            {post.records?.map((r,i)=>
              <Col className="text-center">
                <Button modifier="icon" onClick={()=>playRecord(r)}><FaPlay/></Button>
                <p className="recorTitle">record {i+1}</p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      {showSentiment && <Row>
        <Col>
          <hr/>
          <pre>{post.sentiment}</pre>
        </Col>
      </Row>}
    </Card>

  )
}

interface Props{
  post:PostType;
  editable: boolean;
  terapist?: boolean;
}

export default Post;
