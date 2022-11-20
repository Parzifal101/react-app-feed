import axios from "axios"

export async function fetchId(e, url = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty') {
    let idArr = []
    idArr = await axios.get(url).catch(err => console.log(err))
    return idArr.data
}