import React, { useEffect } from 'react';
import { FaArchive, FaRegCommentAlt, FaPlus, FaStar } from 'react-icons/fa';
import { Button, Fab, List, ListItem, Select,} from 'react-onsenui';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { requestHomeworks, updateHomeworks } from '../../redux/HomeworkSlice';
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
      dispatch(requestPostsById(res.results.map(h=>h.objectId)))
    })
  },[]);

  const updateHomework = (row, archived, rating) =>{
    dispatch(updateHomeworks(row.objectId, archived, rating))
  }

  return(
    <section>
      <List
        modifier="no-backgroud border"
        dataSource={homeworks||[]}
        renderRow={(row, idx) => {
          const postsForHomework = posts.filter(p=>p.homework?.objectId===row.objectId)
          return(
            <ListItem expandable>
              <div className="list-homework-title">{row.title}
                {postsForHomework.length>0 && <span className="notification">{postsForHomework.length}<FaRegCommentAlt/></span>}
                {row.rating>0 && <span className="notification">{row.rating}<FaStar/></span>}
              </div>
              <div className="expandable-content">
                <p className="list-descr">{row.descr}</p>
                <div>
                  {user.type==='terap' &&
                    <Button modifier='fund' onClick={()=>updateHomework(row, true, row.rating)}><FaArchive/>Archive</Button>}
                  {user.type==='terap' &&
                    <>
                      Rate:
                      <Select modifier="material"
                        value={row.rating}
                        onChange={(event) => updateHomework(row, false, event.target.value)}>
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Select>
                    </>}
                </div>
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
