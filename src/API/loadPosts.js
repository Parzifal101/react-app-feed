import { useDispatch, useSelector } from "react-redux"
import { fetchId } from "./fetchId"


export async function loadPosts(postsArr) {
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
                    .then(res => postsArr.push(res))
                    .then(() => {
                        if (postsArr.length >= 100) {
                            console.log(postsArr);
                            return postsArr
                        }
                    })
            }
            if (postsArr.length === 100) {
                console.log(postsArr.length);
            }
            return postsArr
        }
    } catch (error) {
        console.log(error.message);
    }

}