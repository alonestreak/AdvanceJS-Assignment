class QueenAttacK{
    constructor(x,y){
        this.qx1=x[0],
        this.qy1=x[1],
        this.qx2=y[0],
        this.qy2=y[1]
    }
    canAttack(){
        if(this.qx1==this.qx2){
            return "Yes";
        }
        if(this.qy1==this.qy2){
            return "Yes";
        }
        if(Math.abs(this.qx1-this.qx2)==Math.abs(this.qy1-this.qy2)){
            return "Yes";
        }
        return "No";
    }
}

//pass the position of each queen in array
const obj= new QueenAttacK([0,0],[7,7]);
let answer=obj.canAttack();
console.log(answer)