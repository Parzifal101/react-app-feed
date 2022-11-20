export const lastIdFetch = async(url = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty') => {
    return fetch(url)
        .then(res => res.json())
        .then(arr => fetch(`https://hacker-news.firebaseio.com/v0/item/${arr[0]}.json?print=pretty`))
        .then(res => res.json())
        .then(res => res)
}