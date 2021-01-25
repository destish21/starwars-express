const path = require('path')
const { Router } = require('express')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const characters = [{
    name: 'Yoda',
    role: 'Jedi Master', 
    forcePoints: 100000,
    age: 900,
    avatar: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/baby-yoda-old-yoda-1574103229.jpg?crop=0.486xw:0.973xh;0.514xw,0&resize=768:*',
    routeName: 'yoda'
    
},
{
    name: 'Luke Skywalker', 
    role: 'Jedi Master', 
    forcePoints: 10000,
    age: 40,
    avatarImg: 'https://static.wikia.nocookie.net/star-wars-canon-extended/images/2/2c/Luke_Sky7.jpg/revision/latest/scale-to-width-down/376?cb=20180123070942',
    routeName: 'lukeskywalker'
},
{
    name: 'Princess Leia', 
    role: 'General Princess', 
    forcePoints: 100,
    age: 40,
    avatarImg: 'https://cdn.theatlantic.com/thumbor/Db7r0Y1f6nGfb00pBWfXia8LmAg=/199x0:1401x1202/500x500/media/img/mt/2014/04/leia/original.jpg',
    routeName: 'princessleia'
}
]
 /** 
 * HTML ROUTES
 */

//  API ROUTERS
app.get('/', (req, res) => {
    res.sendFile( path.join(__dirname + '/public/index.html'))
    // res.send('May the force be with you!')
})
app.get('/add', (req, res) => {
    res.sendFile( path.join(__dirname + '/public/add.html'))

})
/**
 * ApI ROUTEs
 */

// /api/characters = show all character data
app.get('/api/characters', (req,res) => {
    res.json(characters)
    
})
// /api/characters/:routeName

app.get('/api/characters/:routeName', (req, res) => {
    const targetcharacter = req.params.routeName
    const character =characters.find(character => {
        return character.routeName === targetcharacter
    })
    res.json(character)
})
// add new characters
app.post('/api/characters/add', (req ,res)=>{
    // console.log(req.body)
    const newCharacter = req.body
    newCharacter.routeName = newCharacter.name.replace(/ /g, '').toLowerCase()

    characters.push(newCharacter)
    res.status(200).send()
    // characters.push(newCharacter)
    // console.log(characters)
    // res.end()
})
app.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT}`)
})