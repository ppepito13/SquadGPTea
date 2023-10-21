import React, { useEffect, useState } from 'react';
import { Button, List, ListItem,} from 'react-onsenui';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { requestHomeworks } from '../../redux/HomeworkSlice';
import { requestPostsById } from '../../redux/PostSlice';
import store, { RootState } from '../../redux/store';
import { HomeworkType, PostType } from '../../types';
import Post from '../kid/Post';

const HomeWork = () =>{
  const dispatch = store.dispatch;
  const navigate = useNavigate();
  const selectedKid = useSelector((root:RootState)=>root.statusSlice.status.selectedKid)
  const [expandedItem, setExpandedItem] = useState();

  const homeworks:HomeworkType[] = useSelector((root:RootState)=>root.homeworkSlice.homeworkStore.homeworks);
  const posts:PostType[] = useSelector((root:RootState)=>root.postSlice.postStore.posts);

  useEffect(()=>{
    dispatch(requestHomeworks(selectedKid)).then((res:any)=>{
      dispatch(requestPostsById(res.results.map(h=>h.objectId)))
    })
  },[])

  return(
    <section>
      <List
        dataSource={homeworks||[]}
        renderRow={(row, idx) => {
          const postsForHomework = posts.filter(p=>p.homework?.objectId===row.objectId)
          return(
            <ListItem expanded={idx === expandedItem } expandable>
              <div>{row.title} {postsForHomework.length>0 && <span className="notification">{postsForHomework.length}</span>}</div>
              <div className="expandable-content">
                {row.descr}
                {postsForHomework.map(pfh=><Post post={pfh} editable={false}/>)}
              </div>
            </ListItem>
        )}}
      />

    <Button onClick={()=>navigate("/newhomework")}>Add new homework</Button>

    </section>
  )
}

// <List
//   dataSource={homeworks||[]}
//   renderRow={(row, idx) => (
//     <ListItem expanded={idx === expandedItem } expandable>
//       <div>{row.title}</div>
//       <div className="expandable-content">{row.descr}</div>
//     </ListItem>
//   )}
// />

export default HomeWork;
