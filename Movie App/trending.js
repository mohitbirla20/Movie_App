const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "api_key=8ef1cdecd7753798b82720396bc150c6";
const  API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const search_URL = BASE_URL+"/search/movie?"+API_KEY;
const mainurl = "https://api.themoviedb.org/4/list/1?api_key=8ef1cdecd7753798b82720396bc150c6"

getMovie(mainurl)
function getMovie(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)   
        appnedData(data.results)
    })
}
function filtered(elem){
    return elem.vote_count>4000
}

function appnedData(data){
    document.getElementById("main").innerHTML = '';
    data.forEach(function(elem){
         let box = document.createElement("div");
         box.classList.add("movie");
         
         let img = document.createElement("img");
         img.src = `https://image.tmdb.org/t/p/w500${elem.poster_path}`;

         let movieInfo = document.createElement("div");
         movieInfo.classList.add("movie-info");
         let h3 = document.createElement("h3");
         h3.innerText = elem.original_title;
        let span = document.createElement("span");
        span.innerText = elem.vote_average;
        span.classList.add(`${getcolor(elem.vote_average)}`);
        movieInfo.append(h3,span);

        let overview = document.createElement("div");
        overview.innerText = elem.overview;
        let overviewh3 = document.createElement("h3");
       // overview.append(overviewh3)
        overviewh3.innerText = "Overview"
        overview.classList.add("overview")
        overview.append(overviewh3)

        box.append(img,movieInfo,overview)
        document.getElementById("main").append(box)
    })
}
function getcolor(vote){
    if(vote>=8){
        return "green";

    }else if(vote>=5){
        return "orenge"
    }else{
        return "red"
    }
}

