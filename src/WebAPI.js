import { getAuthToken } from "./utils";

const BASE_URL = 'https://student-json-api.lidemy.me'

export const getPosts = () => {
    return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`)
        .then(res => res.json()
    );
}

export const login = (username, password) => {
    return fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then(res => res.json())
}

export const getMe = () => {
    const token = getAuthToken()
    return fetch(`${BASE_URL}/me`, {
        headers: {
            'authorization': `Bearer ${token}`
        },
    })
    .then(res => res.json())
}

export const AddPost = (title, content) => {
    const token = getAuthToken()
    return fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            title: title,
            body: content
        }),
    }).then((res) => res.json())
      .then((data) => {
        console.log(data)
        getPosts()
    })
      .catch((err) => console.log(err))
} 