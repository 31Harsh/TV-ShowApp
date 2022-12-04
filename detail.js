// console.log(window.location.search.substring(window.location.search.indexOf('=')+1));



async function fetchingDetails(){
    const resp = await fetch(`https://api.tvmaze.com/shows/${window.location.search.substring(window.location.search.indexOf('=')+1)}`)
    const respJson = await resp.json()
    const data  = await respJson

    $("#pic img").attr('src',data.image.medium)
    $('#heart a').on('click',()=>{
        let f = false;
    for(let i = 0;i<check.length;i++){
        if(check[i]===window.location.search.substring(window.location.search.indexOf('=')+1)){
            f = true;
        }
    }
    if(f){
        $('#heart a').empty();
        $('#heart a').append('<i class="fa-regular fa-heart"></i>');
        check.splice(check.indexOf(window.location.search.substring(window.location.search.indexOf('=')+1)),1);
        sessionStorage.setItem('check',check);

        sessionStorage.setItem('fav-list',check);
        $('.notice1')[0].innerText = 'Removed from Favourites';
        $('.notice1').css('display','flex')
        setTimeout(() => {
            $('.notice1').css('display','none');
        }, 2000);
    }else{
        $('#heart a').empty();
        $('#heart a').append('<i class="fa-solid fa-heart"></i>');
        check.push(window.location.search.substring(window.location.search.indexOf('=')+1));
        $('.notice1')[0].innerText = 'Added to Favourites';
        $('.notice1').css('display','flex')
        sessionStorage.setItem('check',check);
        setTimeout(() => {
            $('.notice1').css('display','none');
        }, 2000);
    }
    })
    $("#name")[0].innerText = data.name

}

fetchingDetails();