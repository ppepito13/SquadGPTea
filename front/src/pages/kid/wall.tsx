import React, { useEffect, useState } from 'react';
import { BackButton, Card, Input, LazyList, ListItem, Tab, Tabbar, Toolbar, ToolbarButton } from 'react-onsenui';
import { useSelector } from 'react-redux';
import { requestPosts } from '../../redux/PostSlice';
import store, { RootState } from '../../redux/store';
import NewPost from './NewPost';
import Post from './Post';

const Wall = () =>{
  const dispatch = store.dispatch;
  let posts:Post[] = useSelector((root:RootState)=>root.postSlice.postStore.posts);
// console.log(posts?.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1))
console.log(posts)

  useEffect(()=>{
    dispatch(requestPosts())
  },[])

  return(
    <section>

      <NewPost/>
      <div style={{height: 100}}>
        <LazyList
          length={posts?.length || 0}
          renderRow={(index) =>
            <ListItem key={index} modifier="nodivider">
              <Post post={posts[index]}/>
            </ListItem>
          }
          calculateItemHeight={() => 44}
        />
      </div>

    </section>
  )
}

export default Wall;
