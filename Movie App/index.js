const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "api_key=8ef1cdecd7753798b82720396bc150c6";
const  API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const search_URL = BASE_URL+"/search/movie?"+API_KEY;
const sortbyYear_url = "https://api.themoviedb.org/3/discover/movie?api_key=8ef1cdecd7753798b82720396bc150c6"


async function getData(sortbyYear_url){
      let res = await fetch(sortbyYear_url);
      let data = await res.json();
    return data;
}
// document.getElementById("sortbyYear").addEventListener("click" ,filterdata())

async function filterdata(){
  let data = await getData(sortbyYear_url);
  let app = filterration(data.results);
  appnedData(app)
}
//filterdata()
function filterration(data){
 let variable = data.filter(function(elem){
    return elem.vote_average>8
  })
  return variable;
}

/* filter based on year */
async function yearsort(){
  let data = await getData(API_URL);
  let app = mainsortbyYearfunction(data)
  appnedData(app);
 // console.log(mainsortbyYearfunction(data))
}
function mainsortbyYearfunction(data){
  let variable = data.filter(function(elem){
    date = elem.release_date.split("-").map(Number);
    return date[0]>=2021;
  })
  return variable
}

getMovie(API_URL)
function getMovie(url){
    fetch(url).then(res => res.json()).then(data => {
      //  console.log(data.results)
        appnedData(data.results)
    })
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

function searchMovieFunc(){
    let query = document.getElementById("search").value;
      if(query){
        getMovie(search_URL+"&query="+query)
      }else{
        getMovie(API_URL)
      }
}

// form.addEventListener("submit",(e) => {
//     e.preventDefault();

//     const searchterm = search.value;
//     if(searchterm){
//         getMovie(search_URL+'&query='+searchterm);
//     }else{
//         getMovie(API_URL)
//     }
// })


function slidShow(){
    let images = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_4Ii3OMhUYOuSyd4upimi5la-LIaY0qe34A&usqp=CAU" , "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2dhKjpeDCsLau1Y5hlHR2DpnvL8OdjExkjg&usqp=CAU" , "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlXAN0gg_lchM2sDrL2Srjs3m0fYqMhc_Nxw&usqp=CAU" , "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWEzgOaQ_7y9Ui8U7Kb8a67Ou5wvnYXYS1Bg&usqp=CAU" , "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQhc4oRZego6op29zT4YsRDz_cXulJa7oWBg&usqp=CAU" , "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-9NsrWC_PGTzFo8EdXfB1ECI0_GnscJww0Q&usqp=CAU"];
    let container = document.getElementById("slideshow");
   let i=0;
  let id = setInterval(function (){

    let img = document.createElement("img");
    img.src = images[i];
    container.innerHTML = null;
    container.append(img);
    i++
    if(i===6){
        i=0;
    }
   } ,2500)
}

slidShow()


let id;
function debounced(func,delay){
    if(id){
        clearTimeout(id)   
    }
  id = setTimeout(function(){
    func()
  },delay)
}
