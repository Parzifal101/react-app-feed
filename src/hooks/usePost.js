import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        if (sort === 'title' || sort === 'text') {
            return [...posts].sort((a, b) => {
                if (a[sort] && b[sort]) {
                    a[sort].localeCompare(b[sort])
                } else {
                    console.log('Нет описания');
                }
            })
        } else if (sort === 'score') {
            return [...posts].sort((a, b) => b[sort] - a[sort])
        } else if (sort === 'time') {
            return [...posts].sort((a, b) => b[sort] - a[sort])
        } else if (sort === 'kids') {
            return [...posts].sort((a, b) => {
                if (a[sort] && b[sort]) {
                    const arr1 = a[sort]
                    const arr2 = b[sort]
                    return arr2.length - arr1.length
                } else {
                    return posts
                }
            })
        } else {
            return posts
        }
    }, [sort, posts])
    return sortedPosts
}

export const usePosts = (posts, sort, query) => {
    const navigate = useNavigate()
    const sortedPosts = useSortedPosts(posts, sort)

    const sortedAndSearchedPosts = useMemo(() => {

        return sortedPosts.filter(post => post.title.toLowerCase().includes(query))

    }, [query, sortedPosts])

    return sortedAndSearchedPosts
}