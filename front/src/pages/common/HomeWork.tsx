import React, { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Fab, List, ListItem,} from 'react-onsenui';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { requestHomeworks } from '../../redux/HomeworkSlice';
import { requestPostsById } from '../../redux/PostSlice';
import store, { RootState } from '../../redux/store';
import { HomeworkType, PostType, UserType } from '../../types';
import Post from '../kid/Post';

const HomeWork = () =>{
  const dispatch = store.dispatch;
  const navigate = useNavigate();
  const selectedKid = useSelector((root:RootState)=>root.statusSlice.status.selectedKid);

  const homeworks:HomeworkType[] = useSelector((root:RootState)=>root.homeworkSlice.homeworkStore.homeworks);
  const posts:PostType[] = useSelector((root:RootState)=>root.postSlice.postStore.posts);
  const user:UserType = useSelector((root:RootState)=>root.userSlice.api.user);

  useEffect(()=>{
    dispatch(requestHomeworks(selectedKid)).then((res:any)=>{
      console.log(res.results)
      dispatch(requestPostsById(res.results.map(h=>h.objectId)))
    })
  },[])

  return(
    <section>
      <List
        modifier="no-backgroud border"
        dataSource={homeworks||[]}
        renderRow={(row, idx) => {
          const postsForHomework = posts.filter(p=>p.homework?.objectId===row.objectId)
          return(
            <ListItem expandable>
              <div className="list-homework-title">{row.title} {postsForHomework.length>0 && <span className="notification">{postsForHomework.length}</span>}</div>
              <div className="expandable-content">
                <p className="list-descr">{row.descr}</p>
                {postsForHomework.map(pfh=><Post post={pfh} editable={false}/>)}
              </div>
            </ListItem>
        )}}
      />

      {user?.type==='terap' && <Fab onClick={()=>navigate("/newhomework")}><FaPlus/>Add new homework</Fab>}

    </section>
  )
}


export default HomeWork;
