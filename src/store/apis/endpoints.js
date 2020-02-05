import axios from 'axios'

// EXPRESS
const expressOptions = {
    baseUrl: '/api',
    devUrl: 'http://localhost:5000',
}

// check dev environment, we're proxying through NGINX on 8081 port (/api endpoint)
const express =
    window.location.port === '3000'
        ? expressOptions.devUrl
        : expressOptions.baseUrl

export const expressURL = axios.create({
    baseURL: express,
})

// Express Routes for NLM
export const elastic = {
    searchByID: '/nlm/search/ids',
    searchByIDNoCode: '/nlm/search/ids/nocode',
    searchAll: '/nlm/search/_all',
    fetchAll: '/nlm/_all',
    fetchWorks: '/nlm/_works',
    fetchID: '/nlm/_ids',
}

// WORDPRESS
export const wordpress = {
    node: 'http://178.128.7.239/',
    onlyIP: '178.128.7.239',
    rest: 'wp-json/wp/v2/',
}

export const wpURL = axios.create({
    baseURL: `${wordpress.node}${wordpress.rest}`,
})

// GOOGLE SHEETS
export const gs = {
    d: `https://docs.google.com/spreadsheets/d/`,
    gsKey: `1hPqe-Y2TWwMTAxIEXYvc8du_GMFUJQNPvZbJou7veAY`,
    testKey: `1P6Dk9SN0af7GDitw7-tRXGc5N22AEXoaOpDIKzVdlK0`,
    editParam: `/edit?usp=sharing`,
}
