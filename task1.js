let express = require("express");
let app = express();

let joi = require("@hapi/joi");

let port = process.env.Port || 4500;


app.use(express.json());


let songList = [{
    id : 1,
    songName : "legendary",
    genre : "rock",
    singerName : "EP",
    albumPrice : 1000
},

{
    id : 2,
    songName : "love story" ,
    genre : "romance",
    singerName : "taylor swift" ,
    albumPrice : 1000
},
{
    id : 3,
    songName : "Senorita",
    genre : "romance",
    singerName : "shawn mendes" ,
    albumPrice : 1500
},
{
    id : 4,
    songName : "rockstar",
    genre : "hip-hop" ,
    singerName : "EP",
    albumPrice : 1000
},
{
    id : 5,
    songName : "wonderland",
    genre : "",
    singerName : "Taylor Swift",
    albumPrice : 1000
},
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// To retrieve data

app.get("/api/songs/list", (req,res)=>{
    res.send(songList);
});

app.get("/api/songs/songById/:id",(req,res)=>{
 let song = songList.find((data)=>data.id === parseInt(req.params.id));
 if(!song){return res.status(404).send({message : "Invalid Id"})};
 res.send(song);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// To create data
app.post("/api/songs/addsong",(req,res)=>{

 let result = validationError(req.body);
let {error} = result;// destructuring

if(error){return res.send(error.details[0].message)};

 
    let addSong = {id : songList.length + 1,
    songName : req.body.songName,
    genre : req.body.genre,
    singerName : req.body.singerName,
    albumPrice : req.body.albumPrice};

    songList.push(addSong); 
    res.send(songList);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// To update data

app.put("/api/songs/update/:id",(req,res)=>{
let songUpdate = songList.find((data)=>data.id === parseInt(req.params.id));
if(!songUpdate){return res.status(404).send({message : " invalid id"})};

let result = validationError(req.body);
let {error} = result;// destructuring

if(error){return res.send(error.details[0].message)};

    songUpdate.songName = req.body.songName;
    songUpdate.genre = req.body.genre;
    songUpdate.singerName = req.body.singerName;
    songUpdate.albumPrice = req.body.albumPrice;

    res.send(songList);
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// to delete data

app.delete("/api/songs/delete/:id",(req,res)=>{
let deleteSong = songList.find(data => data.id === parseInt(req.params.id));
if(!deleteSong){return res.status(404).send({message : "INVALID ID"})};


let index = songList.indexOf(deleteSong) ;

songList.splice(index, 1);
res.send(songList);

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function validationError(error) {
    let schema = joi.object({
        
    songName : joi.string().min(3).max(100).required(),
    genre : joi.string().min(3).max(100).required(),
    singerName : joi.string().min(3).max(100).required(),
    albumPrice : joi.number().min(3).max(10000).required(),

    });
   return schema.validate(error);
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(port, ()=>console.log(`the port ${port} is working`));