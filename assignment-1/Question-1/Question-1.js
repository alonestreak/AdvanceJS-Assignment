const data=require('./battles.json')

//before applying the spread operator we will be applying the reduce method on array with two arguments one function to apply and
//initial value as empty map. followed by two filter fucntions one to select only key,value pairs having count greater than 0 and last filter function returns object 
let attacker_king = [...data.reduce((op, inp) => {
    let title = inp.attacker_king
    op.set(title, (op.get(title) || 0) + 1)
    return op
}, new Map()).entries()].filter(([_,repeat]) => repeat > 0).map(([title, repeat]) => ({
    title,
    repeat
}))

//after getting the array of key value pairs sort on the bases of the occurance and extract the first one with occured maximum number of times
attacker_king.sort((a,b)=>{
    return b.repeat-a.repeat;
})
attacker_king= attacker_king[0].title;




let defender_king = [...data.reduce((op, inp) => {
    let title = inp.defender_king
    op.set(title, (op.get(title) || 0) + 1)
    return op
}, new Map()).entries()].filter(([_,repeat]) => repeat > 0).map(([title, repeat]) => ({
    title,
    repeat
}))
defender_king.sort((a,b)=>{
    return b.repeat-a.repeat;
})
defender_king= defender_king[0].title;




let region = [...data.reduce((op, inp) => {
    let title = inp.region
    op.set(title, (op.get(title) || 0) + 1)
    return op
}, new Map()).entries()].filter(([_,repeat]) => repeat > 0).map(([title, repeat]) => ({
    title,
    repeat
}))
region.sort((a,b)=>{
    return b.repeat-a.repeat;
})
region= region[0].title;



unique=[]
data.forEach((battle)=>{
    if(unique.indexOf(battle.name)==-1){
        unique.push(battle)
    }
})
let name;
if(unique.length==data.length){
    name="All the names occur only once"
}

let most_active ={
        'attacker_king':attacker_king,
        'defender_king':defender_king,
        'region':region,
        'name':name
    
}
let win=0,loss=0;
data.forEach((row)=>{
    if(row.attacker_outcome==="win"){
        win+=1
    }else{
        if(row.attacker_outcome==="loss"){
            loss+=1
        }
    }
})
let attacker_outcome={
    'win':win,
    'loss':loss
}

battleType=[];
data.forEach(row=>{
    if(battleType.indexOf(row.battle_type)===-1){
        battleType.push(row.battle_type)
    }
})

let average=0;
let max=0;
let min=9999999;
let count=0
data.forEach(battle=>{
    if(battle["defender_size"]){
        count+=1
        average+=battle['defender_size'];
        if(min > battle['defender_size']){
            min=battle['defender_size'];
        }else{
            if(max<battle['defender_size']){
                max=battle['defender_size'];
            }
        }
    }
});

let defender_size={
    'average':(average/count),
    'min':min,
    'max':max
}

let result = {
    'most_active': {
        'attacker_king': most_active.attacker_king,
        'defender_king': most_active.defender_king,
        'region': most_active.region,
        'name':name
    },
    'attacker_outcome':{
        'win': attacker_outcome.win,
        'loss': attacker_outcome.loss
    },
    'battle_type': battleType,
    'defender_size':{
        'average': defender_size.average,
        'min': defender_size.min,
        'max': defender_size.max
    }
}

console.log(result)