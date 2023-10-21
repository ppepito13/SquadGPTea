import React, { useEffect, useState } from 'react';
import { LazyList, ListItem } from 'react-onsenui';
import { useSelector } from 'react-redux';
import { requestPosts } from '../../redux/PostSlice';
import store, { RootState } from '../../redux/store';
import { PostType, UserType } from '../../types';
import NewPost from './NewPost/NewPost';
import Post from './Post';

const Wall = ({selectedKid}:Props) =>{
  const dispatch = store.dispatch;
  const user = useSelector((root:RootState)=>root.userSlice.api.user)
  let posts:PostType[] = useSelector((root:RootState)=>root.postSlice.postStore.posts);

  const editable = user.type==='kid';

  useEffect(()=>{
    dispatch(requestPosts(selectedKid))
  },[])

  return(
    <section>
      {editable && <NewPost/>}

      <div style={{height: 100}}>
        <LazyList
          length={posts?.length || 0}
          renderRow={(index) =>
            <ListItem key={index} modifier="nodivider">
              <Post post={posts[index]} editable={editable}/>
            </ListItem>
          }
          calculateItemHeight={() => 44}
        />
      </div>

    </section>
  )
}

interface Props{
  selectedKid: UserType;
}

export default Wall;
