let favList;

$('window').on('load',()=>{
    sessionStorage.setItem('check',localStorage.getItem('l'))
})

function once2(){
    var called;
    return function(){
        if(!called){
            called=true;
            // sessionStorage.setItem('fav-list','');
            sessionStorage.setItem('check',localStorage.getItem('l'))
            favList = sessionStorage.getItem('fav-list');
        }
    }
}

const k = once2();
k();

favList = sessionStorage.getItem('fav-list').split(',');

function remove(id){
    let is = id.toString()  
    favList.splice(favList.indexOf(is),1)
    sessionStorage.setItem('fav-list',favList)
    sessionStorage.setItem('check',favList)
    favList = sessionStorage.getItem('fav-list').split(',');
    $("#fav-list").empty();
    render();
}   

function render(){
    if(favList.length!==0){
            favList = favList.filter((ele,index,self)=>{
                return self.indexOf(ele) === index;
            })
            sessionStorage.setItem('fav-list',favList);
            
        favList.forEach(async (element) => {
            const resp = await fetch(`https://api.tvmaze.com/shows/${element}`)
            const respJson = await resp.json();
            let card = `<div class="card">
            <div class="fav-pic">
                <img src="${respJson.image.medium}" />
            </div>
            <p id="name">${respJson.name}</p>
            <a id="heart" onclick="remove(${element})"><i class="fa-solid fa-heart"></i></a>
            <button onclick="det(${element})" class="btn d">Details</button>
            </div>`
            $('#fav-list').append(card);
        });
    }
}
render();