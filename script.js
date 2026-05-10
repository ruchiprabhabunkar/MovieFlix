// isLogin functionality
const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));


const authSection = document.getElementById("authsection");
const userSection = document.getElementById("userSection");


const username = document.getElementById("username");
if(loggedUser){
    authSection.style.display = "none";
    userSection.style.display = "flex"
    userSection.style.gap = "1rem"
    userSection.style.alignItems="center"

    username.innerText = `Hii , ${(loggedUser.username).toUpperCase()}`

    
    
} 


let apiKey = "3ae903fd";
async function fetchMoviesToElement(searchQuery, elementId) {
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        
        const list = document.getElementById(elementId);
        if(!list) return;

        if(data.Response === "True") {
            list.innerHTML = "";
            // Take up to 10 movies for horizontal scrolling
            const movies = data.Search.slice(0, 10);
            movies.forEach(movie => {
                const li = document.createElement("li");
                li.classList.add("movie-card");
                // Generating a random rating just like in the design mockup
                const fakeRating = (Math.random() * 2 + 7).toFixed(1); 
                li.innerHTML = `
                    <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/200x300"}" alt="${movie.Title}"/>
                    <div class="movie-info">
                        <span class="movie-rating"><i class="fa-solid fa-star"></i> ${fakeRating}</span>
                        <span class="movie-year">${movie.Year}</span>
                    </div>
                `;
                list.appendChild(li);
            });
        }
    } catch(e) {
        console.error("Error loading movies:", e);
    }
}


//search functionality
async function searchMovies() {
    const searchTerm = document.getElementById("searchInput").value.trim();
    if(!searchTerm) return;
    
    // Hide home sections and show search results section
    document.getElementById("heroSection").style.display = "none";
    document.getElementById("moviesContainer").style.display = "none";
    document.getElementById("searchResultsSection").style.display = "block";
    
    // Fetch and populate search results
    await fetchMoviesToElement(searchTerm, "searchList");
}

document.addEventListener("DOMContentLoaded", () => {
    // Populate rows based on mockup titles or arbitrary search terms to get results
    fetchMoviesToElement("avengers", "trendingList");
    fetchMoviesToElement("batman", "popularList");
    
    // Listen for enter key in search
    document.getElementById("searchInput").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            searchMovies();
        }
    });
});



 const genereItems = document.querySelectorAll(".genre-label");

 
  let selectedGeneric = [];

  genereItems.forEach(item => {
    item.addEventListener("click", ()=>{

        item.classList.toggle("active");

        const genere = item.innerText;
      
        

        if(selectedGeneric.includes(genere)){
            selectedGeneric = selectedGeneric.filter( g => g !== genere);
        } else{
            selectedGeneric.push(genere)
        }
    });
  });


 //sign in form
  const signInForm = document.getElementById("signinForm");
signInForm.addEventListener("submit", (e)=>{
 e.preventDefault()
 
 
 let email = document.getElementById("email").value ;
 let password = document.getElementById("password").value;

 let storedUser = JSON.parse(localStorage.getItem("movieflixUser"));


if(!storedUser){
     document.getElementById("loginMessage").innerText = "No account found Please sigup first."
}

 if(email === storedUser.email && password === storedUser.password){
 document.getElementById("loginMessage").innerText = "Login Successfull !"

 localStorage.setItem(
   "loggedInUser",
   JSON.stringify(storedUser)
 );
    
    setTimeout(()=>{
        window.location.href = "index.html"
    },1000)
 } 
 else{
   document.getElementById("loginMessage").innerText = "Incorrect credential ! try again." 
  }
})

function logout(){
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html"
}





// signup-form 
   const sigupForm = document.getElementById("signupForm");
   sigupForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value
    const user = {
        username,
        email,
        password,
        favGenere: selectedGeneric
    };

    localStorage.setItem(
        "movieflixUser",
        JSON.stringify(user)
    );

    document.getElementById("message").innerText = "Signup Successful"
    // setTimeout(()=>{
    //   window.location.href ="signIn.html";
    // }, 1000)


  });












