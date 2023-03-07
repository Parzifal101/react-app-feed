import React, { useState, useMemo, useEffect } from "react";
import Counter from '../components/Counter';
import Post from "../components/Post";
import "../styles/style.css";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import { useRef } from "react";
import MyInput from "../components/UI/input/MyInput";
import MyForm from "../components/MyForm";
import MySelect from "../components/UI/select/MySelect";
import PostFilter from "../components/PostFilter";
import axios from 'axios';
import { usePosts } from "../hooks/usePost";
import Loader from "../components/UI/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchId } from "../API/fetchId";
// import { loadPosts } from "../API/loadPosts";

function Feed() {

  //К сожалению, не хватило времени оптимизировать запрос серверу. Остался черновой вариант. 
  //Постарался разнообразить варианты запросов, как через обычный fetch, так и с помощью либы axios


  // async function refreshPosts(){
  //   const posts = loadPosts(postsArr).then(res => {
  //     console.log(res);
  //     for (const value of res) {
  //       console.log(value);
  //     }
      
  //   })
  // }

  // const anyFetch = async (url = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty') => {
  //   return fetch(url)
  //       .then(res => res.json())
  //       .then(arr => arr.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)))
  //       .then(res => res)
  //   }

  //  async function generateId(){
  //       const allData = anyFetch()
  //       .then(data => console.log(data))
  //       .then(res => console.log(res))
  //   }


  async function loadPosts() {
    setIsLoading(true)
    const news = []
    let idArr = await fetchId()
    idArr.length -= 400
    news.length = 0
    try {
      if (idArr.length >= 100) {
        console.log("ЗАПРОС СТАТЬЕЙ...");
        for (const value of idArr) {
          if (value) {
            try {
              news.push(fetchId({}, `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`))
            } catch (error) {
             alert(error)
            }
          }
        }
      }
      if (news.length >= 100) {
        postsArr.length = 0
        for (let i = 0; i < news.length; i++) {
          news[i]
            .then((res) => postsArr.push(res))
            .then(() => {
              if (postsArr.length === 100) {
                setPost([...postsArr])
                setIsLoading(false)
              }
            })
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  
  const Timer = ({ timeoutSec }) => {
    const [counter, setCounter] = useState(timeoutSec);
  
    useEffect(() => {
      const timer = counter >= 0 && setInterval(() => setCounter(counter + 1), 1000);
      return () => clearInterval(timer);
    }, [counter]);
  
    if(counter === 60){
      setCounter(counter - 60)
      loadPosts(postsArr)
    }
    return <div>Обновление через: {counter}с</div>;
  };


  const [postsArr, setPost] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const sortedAndSearchedPosts = usePosts(postsArr, filter.sort, filter.query)
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
      loadPosts()    
  },[])

  // const createPost = (newPost) => {
  //   setPost([...postsArr, newPost])
  // }

  const removePost = (post) => {
    console.log(post.id)
    setPost(postsArr.filter(p => p.id !== post.id))
  }

 
  return (
    <div className="App">
      <div className="app-container">
        <span>{Timer({timeoutSec:0})}</span>
        {/* <MyForm create={createPost} /> */}
        <PostFilter onEvent={loadPosts} filter={filter} setFilter={setFilter}></PostFilter>
        {/* {postError &&
          <h1>Произошла ошибка - {postError}</h1>
        } */}
        {isLoading
          ? <Loader></Loader>
          : <PostList remove={removePost} posts={sortedAndSearchedPosts} />
        }
      </div>
    </div>
  );
}

export default Feed;

