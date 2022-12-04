const resultBox = $(".results-box")
let check;
let arr = sessionStorage.getItem('fav-list'); 
function once(){
    var called;
    return function(){
        if(!called){
            called=true;
            sessionStorage.setItem('show_id',-1)
            sessionStorage.setItem('check','');
            localStorage.setItem('l',check)
            check = [];
        }
    }
}

function det(e){
    const id= e;
    // sessionStorage.setItem("show_id", id);
    document.location.href = `detail.html?id=${id}`
}

const l = once();
l();

function rem(){
    check
}

function fav(id){
    let f = false;
    for(let i = 0;i<check.length;i++){
        if(check[i]===id){
            f = true;
        }
    }
    if(f){
        check.splice(check.indexOf(id),1);
        sessionStorage.setItem('check',check);

        sessionStorage.setItem('fav-list',check);
        $('.notice')[0].innerText = 'Removed from Favourites';
        $('.notice').css('display','flex')
        $(`.result #${id}`)[0].innerText = "Add to My Favourites❤️"
        $(`.result #${id}`)[0].classList.remove('fav-active')
        $(`.result #${id}`)[0].classList.add('fav')
        setTimeout(() => {
            $('.notice').css('display','none');
        }, 2000);
    }else{
        check.push(id);
        $('.notice')[0].innerText = 'Added to Favourites';
        $('.notice').css('display','flex')
        $(`.result #${id}`)[0].innerText = "Remove from my Favourites❌"
        $(`.result #${id}`)[0].classList.remove('fav')
        $(`.result #${id}`)[0].classList.add('fav-active')
        localStorage.setItem('l',check)
        sessionStorage.setItem('check',check);
        sessionStorage.setItem('fav-list',check);
        setTimeout(() => {
            $('.notice').css('display','none');
        }, 2000);
    }
}


$("#search").on("input",async function(e){
    const respData = await fetch(`https://api.tvmaze.com/search/shows?q=${e.target.value}`)
    .then(res=>res.json())
    .then((data)=>{
        return data;
    }).catch((err)=>{
        console.log(`cannot find shows with name ${e.target.value}`);
    })
    resultBox.empty();

    
    respData.map((ele)=>{
        const result = `<div class="result">
        <div class="pic ">
        <img src="${ele.show.image.medium}" />
        </div>
        <div class="result-content">
        <p>${ele.show.name}</p>
        <button onclick="det(${ele.show.id})" class="btn detail">Details💪</button>
        <button onclick="fav(${ele.show.id})" id="${ele.show.id}" class="btn fav">Add to My Favourites❤️</button>
        </div>
        </div>`
        resultBox.append(result)
    })
})
