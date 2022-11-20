import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import cl from './Navbar.module.css';
import { useEffect } from 'react';
import { lastIdFetch } from '../../../API/lastIdFetch';

const Navbar = () => {
    function generateId(){
        const allData = lastIdFetch().then(data => {
           dispatch({type:'ADD_URL_ID',payload: data})
        })
    }
    useEffect(() => {
        generateId()
    }, []);
    const  dispatch = useDispatch()
    const lastPost = useSelector(state => state.lastPost.id)
    return (
        <div className={cl.nav}>
            <div className={cl.logoWrapper}></div>
            <div className={cl.linksWrapper}>
                <Link className={cl.link} to='/feed'>Главная</Link>
                <Link onClick={generateId} className={cl.link} to={`/post/${lastPost.id}`}>Последний пост</Link>
            </div>
            <div className="timer"></div>
        </div>
    );
};

export default Navbar;