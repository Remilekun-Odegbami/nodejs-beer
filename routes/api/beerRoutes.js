const express = require('express')
const router = express.Router()
const fetch =(...args)=> import('node-fetch').then(({default: fetch}) => fetch(...args))
let count;

fetch('https://api.sampleapis.com/beers/ale')
    .then(res => res.json())
    .then(data => {
        count = data.length
    })

// All Beers
// localhost:3000/beers/ 
router.get('/', (req, res)=> {
    const URL = 'https://api.sampleapis.com/beers/ale'

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/beers', {
                title: 'All Beers',
                name: 'Beer List',
                data
            })
        })
})

// single-Beer 
// localhost:3000/beers/:id 
router.get('/:id', (req, res)=> {
    const id = req.params.id
    const URL = `https://api.sampleapis.com/beers/ale/${id}`

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                res.render('pages/single-beer', {
                    title: `${data.name}`,
                    name: `${data.name}`,
                    data,
                    count
                })
            
            } else {
                res.render('pages/404', {
                    title: '404 Error',
                    name: '404 Error'
                })
            }
        })
        .catch(error => {
            console.log('ERROR', error)
        })
})

// localhost:3000/Beers/name
router.get('/beers/:name', (req, res)=> {
    const name = req.params.name 
    const URL = 'https://api.sampleapis.com/beers/ale'

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.name.length; i++) {
                if (Beers == data.name[i]) {
                    res.render('pages/beers', {
                        title: name,
                        name: name,
                        data
                    })
                }
            }
        })

})

module.exports = router