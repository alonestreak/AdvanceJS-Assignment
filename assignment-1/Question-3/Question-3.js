const url='http://api.nobelprize.org/v1/prize.json';
const fetch = require("node-fetch");
async function nobel(){
    const response= await fetch(url);
    if (response.status === 200) {
        let requirdResult=[];
        let data = await response.json();
            data.prizes.forEach((prize) => {
            if (prize.category === "chemistry" && parseInt(prize.year) > 1999 && parseInt(prize.year) < 2020) {
                prize.laureates.forEach((person) => {
                    requirdResult.push(person.firstname + " " + person.surname);
                });
            }
        });
        console.log(requirdResult)
    }else{
        console.log("Didnt receive the proper response")
    }
}

nobel()
