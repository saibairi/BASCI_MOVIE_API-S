const express = require("express");

const app = express();
const port = 3000;

//parse JSON using express
app.use(express.json());
app.use(express.urlencoded({extended : false}));

let movies = [
    {
    id : '1',
    title : 'Inception',
    director : 'christopher Nolan',
    relese_date : '2010-07-16'
},
{
    id : '2',
    title : 'The Irishman',
    director : 'Martin scorsese',
    relese_date : '2019-09-27'
},
];

//get the movie list in the form of JSON
app.get('/movies', (req,res)=>{
    res.json(movies)
})

//
app.post("/movies",(req, res)=>{
    const movie = res.body;

    console.log(movie);
    movies.push(movie);
    res.send("movie added to the list");
});

// search for a movie in the list
app.get("/movies/:id", (req,res)=>{
    const id = req.params.id;

    for(let movie of movies){
        if(movie.id===id){
            res.json(movie)
            return
        }
    }

    res.status(404).send("movie not found...!!");
})

//remove movie from the list
app.delete("/movies/:id", (req, res)=>{
    const id = req.params.id;

    movies = movies.filter((movie) => {
        if(movie.id !== id){
            return true;
        }
        return false;
    });
    res.send("movie is deleted...!!");

})
//set the server to listen at port
app.listen(port,()=>console.log(`server listening at port ${port}`));
