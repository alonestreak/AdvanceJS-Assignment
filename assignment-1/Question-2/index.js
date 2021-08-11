//To see the output open console of browser after pressing the load Data button


$("#load").on("click",function(){
    let url='https://api.github.com/search/repositories?q=';
    const query=$("#github").val();
    url=url +query;
    $.get(url).then(async(data)=>{
        const result= await populateInfo(data.items);
        console.log(result);
    });
})

 const populateInfo =  async(data)=>{
    let ans=[];
    data.forEach(async(item)=>{
        let owner = {
            login: item.owner.login
        };
        // Git hub api has hourly limit to make the number of requests via one IP address
        // In case if you have exhausted the daily limit some urls may return error to in that api response.
        //If you are having the api limitation then 
        // result.owner.url, result.owner.followers_url, result.owner.following_url, result.branches_url
        // will be set to zero in catch block.
        try{
            let res = await $.get(item.owner.url);
            owner.name = res.name;
        }catch{
            owner.name = "";
        }
        try{
            res = await $.get(item.owner.followers_url);
            owner.followersCount = res.length;
        }
        catch{
            owner.followersCount = 0;
        }
        try{
            res = await $.get(item.owner.following_url.split("{")[0]);
            owner.followingCount = res.length;
        }
        catch{
            owner.followingCount = 0;
        }
        let numberOfBranch;
        try{
            res = await $.get(item.branches_url.split("{")[0]);
            numberOfBranch = res.length;
        }
        catch{
            numberOfBranch = 0;
        }
        ans.push({
            name:item.name,
            full_name: item.full_name,
            private: item.private,
            owner:owner,
            licenseName:item.license?.name,
            score: item.score,
            numberOfBranch: numberOfBranch
        });
    });
    return ans;
 }
