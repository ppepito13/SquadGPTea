import React, { useEffect, useState } from 'react';
import { LazyList, ListItem } from 'react-onsenui';
import { useSelector } from 'react-redux';
import { requestPosts } from '../../redux/PostSlice';
import store, { RootState } from '../../redux/store';
import NewPost from './NewPost/NewPost';
import Post from './Post';

const HomeWork = () =>{
  const dispatch = store.dispatch;


  return(
    <section>
tu wpisuj

    </section>
  )
}

export default HomeWork;
