const url='https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json';
const fetch = require("node-fetch");
async function movies(){
    const response=await fetch(url)
    if(response.status===200){
        let data= await response.json();
        let dictActor= new Map();
        let dictGenre= new Map();
        data.forEach((data)=>{
            movieName=data['title']
            if(data['cast'].length >0){
                data['cast'].forEach(castName=>{
                    if(dictActor.has(castName)){
                        let val=dictActor.get(castName);
                        val.push(movieName)
                        dictActor.set(castName,val)
                    }else{
                        dictActor.set(castName,[movieName,])
                    }
                })
            }
            if(data['genres'].length >0){
                data['genres'].forEach(genere=>{
                    if(dictGenre.has(genere)){
                        let val=dictGenre.get(genere);
                        val.push(movieName)
                        dictGenre.set(genere,val)
                    }else{
                        dictGenre.set(genere,[movieName,])
                    }
                })
            }
        });
        let actors=[];
        let Genres =[];
        //creating the objects from the map and storing these objects in array
        dictActor.forEach((i,k)=>{
            actors.push({
                Name:k,
                Movies:i
            });
        });
        dictGenre.forEach((i,k)=>{
            Genres.push({
                Type:k,
                Movies:i
            });
        });
        result={
            actors,
            Genres
        }
        console.log(result)
    }else{
        console.log("response not received!!");
    }
}
movies()