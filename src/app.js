const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
// console.log(__filename)

//Define paths for Express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location
//handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
// app.use(express.static(path.join(__dirname, '../public')))

//handlebars
app.get('', (reg,res)=>{
    // res.render('index')
    res.render('index', {
        title: 'Weather App',
        name: 'Garry Eliarda'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Garry Eliarda' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Garry Eliarda'
    })
})

// app.get('', (req, res)=> {
//     res.send('Hello express!')
// })

// app.get('', (req, res)=> {
//     res.send('<h1>Hello express!</h>')
// })


// app.get('/help', (reg, res) =>{
//     res.send({
//         name: 'Andrew',
//         age: 27
//     })
// })

// app.get('/help', (reg, res) =>{
//     res.send([{
//         name: 'Andrew'
//     }, {
//         name: 'sarah'
//     }])
// })

// app.get('/about', (req, res) =>{
//     res.send('<h1>About</h1>')
// })

http://localhost:3000/weather?address=philadelphia
// app.get('/weather', (req, res)=> {
//     if(!req.query.address) {
//         return res.send({
//             error: 'You must provide an address!'
//         })
//     }

//     geocode(req.query.address, (error, {latitude, longitude, location}={})=> {
//         if(error) {
//             return res.send({error})
//         }

//         forecast(latitude, longitude, (error, forecastData)=>{
//             if(error) {
//                 return res.send({error})
//             }

//             res.send({
//                 forecast: forecastData,
//                 location,
//                 address: req.query.address
//             })
//         })
        
//     })

//     // res.send({
//     //     forecast: 'It is snowing',
//     //     location: 'Philadelphia',
//     //     address: req.query.address
//     // })
// })


//http://localhost:3000/products?search=games&rating=5
app.get('/products', (req, res) => {
    console.log(req.query.search)
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } else {
        res.send({
            products: []
        })
    }
})

app.get('/help/*', (req, res) =>{
    // res.send('Help article not found'), 
    res.render('404', {
        title: '404',
        name: 'Garry Eliarda',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    // res.send('My 404 page')
    res.render('404', {
        title: '404',
        name: 'Garry Eliarda', 
        errorMessage: "Page not found."
    })
})


//app.com
//app.com/help
//app.com/about
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
