import React, {useEffect,useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {timeConverter} from '../hooks/timeConverter'
import PostFilter from '../components/PostFilter';
import MyButton from '../components/UI/button/MyButton';


const Post = () => {
    async function fetchId(url = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'){
        const response = await axios.get(url)
        return response.data
        // setPost(response.data)
        // console.log(response.data)
      }

    const params = useParams()
    const [post, setPost] = useState('');
    const [comments, setComment] = useState([]);
    const [visible, setVisible] = useState('none')
    const [btnName, setBtnName] = useState('Открыть')

    
    useEffect( () => {
        async function loadPost(){
            const post = await fetchId(`https://hacker-news.firebaseio.com/v0/item/${params.id}.json?print=pretty`)
            await setPost(post)
        }
        loadPost()
    }, []);

    useEffect(() => {
        loadComment()
    },[post])

    // useEffect(() => {
    //     async function loadTreeComm(){
    //         for (const value of comments) {
    //             if(value.kids){
    //                 loadComment(value)
    //             }
    //            }
    //     }
    //     loadTreeComm()
       
    // },[comments])
    
    function hideShow(e){
        if(e.target.nextSibling.style.display === 'block'){
            e.target.nextSibling.style.display = 'none'
            setBtnName('Открыть')
        }else if(e.target.nextSibling.style.display === 'none'){
            console.log(e.target.nextSibling);
            e.target.nextSibling.style.display = 'block'
            setBtnName('Закрыть')
        }
    }

    async function loadComment(){
        const gottenCom = []
        const stack = []
        try {
            if (post.kids) {
                for (let i = 0; i < post.kids.length; i++) {
                    stack[i] = (await fetchId(`https://hacker-news.firebaseio.com/v0/item/${post.kids[i]}.json?print=pretty`))
                    if(!stack[i].deleted && stack[i].type === 'comment'){
                        gottenCom.push(stack[i])
                        if(stack[i].kids){
                           for (let j = 0; j < stack[i].kids.length; j++) {
                            const kid = (await fetchId(`https://hacker-news.firebaseio.com/v0/item/${stack[i].kids[j]}.json?print=pretty`))
                            kid.child = true
                            gottenCom.push(kid)
                           }
                        }
                    }
                }
                if(gottenCom){
                    setComment(gottenCom)
                }
            }
        } catch (error) {
            console.log(error.message);
        }
        
    }

    const navigate = useNavigate()

    return (
        <div className='single-post'>
            
            <div onClick={() => navigate(`/feed`)} className="go__back"></div>
            <div className="single-post__container">
            {post
                    ?<div>
                        <div className="single-post__head">
                            <strong style={{fontSize: 16}} className='single-post__author'>"{post.by}"</strong>
                            <span>{timeConverter(post.time)}</span>
                        </div>
                        <h1 className='single-post__title'>{post.title}</h1>
                        <a target='blank' href={post.url}>{post.url}</a>
                        <p className='single-post__text' dangerouslySetInnerHTML={{__html: post.text}}></p>
                    </div>
                    :<div>
                        <h1 className='single-post__title'>Статья не найдена</h1>
                    </div>
                }
            
            <div>
                {comments
                ?<div className='comments__container'> 
                        <button className='comments__load-btn' onClick={loadComment}></button>
                        <h3 className='comments__length'>Комментарии: <span className='comments__length-count'>{comments.length}</span></h3>
                        <div className="comments__content">
                        {comments.map((com) =>
                        !com.child
                            ?<div className='comment' key={com.id}>
                                <h3>{com.by}</h3>
                                <p className='comments__text' dangerouslySetInnerHTML={{__html: com.text}}></p>
                            </div>
                            :<div className='comment' key={com.id}>
                                <h3>{com.by}</h3>
                                <p className='comments__text'  dangerouslySetInnerHTML={{__html: com.text}}></p>
                                <button className='comments__open-btn' onClick={hideShow}>{btnName}</button>
                                <div className='comment-child' style={{display:'none'}} key={com.id}>
                                <h3>{com.by}</h3>
                                <p className='comments__text' dangerouslySetInnerHTML={{__html: com.text}}></p>
                            </div>
                            </div>
                        )}
                        </div>
                        </div>
                :<h3>Комментарии не найдены</h3>
                }
            </div>
            </div>
        </div>
    );
};

export default Post;