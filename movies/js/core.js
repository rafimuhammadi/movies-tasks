/* Get all data from API */
function AllData()
{
    // actor array
    const actor = [
        "https://swapi.dev/api/people/2/", 
        "https://swapi.dev/api/people/8/",
        "https://swapi.dev/api/people/10/", 
    ]
    var x = 1;
    for (let i = 0; i < actor.length; i++) {
        x++;
        // Select Celebrities Div
        const celebDiv = document.getElementById("load-data");
        // Create Div to Display Actor Image Using DOM
        const actorImgDiv = document.createElement("div");
        actorImgDiv.className = 'col-lg-2 col-md-2 col-sm-4';
        actorImgDiv.id = 'actor-img'+i;
        celebDiv.appendChild(actorImgDiv);
        
        // Create Div to Display actor Information Using DOM
        const actorInfo = document.createElement("div");
        actorInfo.className = 'col-lg-2 col-md-2 col-sm-8';
        actorInfo.id = 'actor-info'+i;
        celebDiv.appendChild(actorInfo);

        // Create Div to Display Actor Movies Using DOM
        const actorMovie = document.createElement("div");
        actorMovie.className = 'col-lg-4 col-md-4 col-sm-12 movie-link';
        actorMovie.id = 'actor-movie'+i;
        celebDiv.appendChild(actorMovie);
        
        // Create Div to Display Actor Movie Details Using DOM
        const actorMovieDetails = document.createElement("div");
        actorMovieDetails.className = 'col-lg-4 col-md-4 col-sm-12 align-top';
        actorMovieDetails.id = 'actor-movie-detail'+i;
        celebDiv.appendChild(actorMovieDetails);
        // Call JS Select Data Using JS Fetch API
        getData(actor[i], i);
        // Remove HR Tag from Last Element
        if(x <= actor.length){
            const hr = document.createElement("hr");
            hr.className = 'my-3 px-3';
            celebDiv.appendChild(hr);
        }
    } 
}

/* Get Data Using JS Fetch API */
async function getData(url, counter) {
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then(data => {
            // Call Create HTML Elements and Display Data
            displayData(data, counter)
        })
        .catch((error) => console.error("ERROR:", error));
}

/* Create HTML Elements and Display Data */
function displayData(data, counter) {
    // Select Actor Image Div
    const actorImgDiv = document.getElementById("actor-img"+counter);
    // Actor Image
    const actorImg = document.createElement("img");
    actorImg.src = 'images/actors.webp';
    actorImg.width = '500';
    actorImg.height = '400';
    actorImg.className = 'img img-thumbnail rounded';
    actorImgDiv.appendChild(actorImg);
    // Select Actor Info Div
    const actorInfo = document.getElementById("actor-info"+counter);
    // Actor Name
    const actorName = document.createElement("h5");
    actorName.innerHTML = data.name;
    actorName.className = 'mb-0';
    actorInfo.appendChild(actorName);
    // Display Profession
    const profession = document.createElement("span");
    profession.innerHTML = 'Actor';
    profession.className = 'text-muted text-small font-small';
    actorInfo.appendChild(profession);
    // Actor Birth Year
    const actorBirthYear = document.createElement("span");
    actorBirthYear.className = 'd-block font-custom mt-2';
    actorBirthYear.innerHTML = 'Birth Year: '+data.birth_year;
    actorInfo.appendChild(actorBirthYear);
    // Actor Height
    const actorHeight = document.createElement("span");
    actorHeight.className = 'd-block font-custom';
    actorHeight.innerHTML = 'Height: '+data.height;
    actorInfo.appendChild(actorHeight);
    // Skin Color
    const actorkin = document.createElement("span");
    actorkin.className = 'd-block font-custom';
    actorkin.innerHTML = 'Skin: '+data.skin_color;
    actorInfo.appendChild(actorkin);
    // Eye Color
    const actorEye = document.createElement("span");
    actorEye.className = 'd-block font-custom';
    actorEye.innerHTML = 'Eye: '+data.eye_color;
    actorInfo.appendChild(actorEye);
    // Hair Color
    const actorHair = document.createElement("span");
    actorHair.className = 'd-block font-custom';
    actorHair.innerHTML = 'Hair: '+data.hair_color;
    actorInfo.appendChild(actorHair);
    // Select Movie Div to Display Movies
    const movies = document.getElementById("actor-movie"+counter);
    let moviesList = data.films;
    console.log(moviesList);
    // Create Div
    const mainDivTag = document.createElement("div");
    mainDivTag.className = 'row'
    movies.appendChild(mainDivTag);
    // Loop Movies
    for (var i=0; i < moviesList.length; i++) {
        // Create Div to Display Movies
        const movieDivTag = document.createElement("div");
        movieDivTag.className = 'col-lg-4 col-md-3 col-sm-6'
        movieDivTag.id = 'movies-list-'+i+'-'+counter;
        mainDivTag.appendChild(movieDivTag);
        // Movie Poster
        const moviePoster = document.createElement("img");
        moviePoster.src = 'images/movies.webp';
        moviePoster.width = '130';
        moviePoster.height = '150';
        moviePoster.className = 'img  rounded';
        movieDivTag.appendChild(moviePoster);
        // Create Break Tag
        const breakTag = document.createElement("br");
        movieDivTag.appendChild(breakTag);
        // Call Function to Select Movie Name by Movie Link
        movieName(moviesList[i], 'movies-list-'+i+'-'+counter,counter);

    }
}

/* Get Movie Name by Movie Link */
async function movieName(url, id, counter){
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
    
        const data = await response.json();
        setMovieName(data, id, counter);
        } catch (error) {
        console.error("ERROR:", error);
        }
}

/* Set Movie Name  */
function setMovieName(data, id, counter) {
    // Select Movie Div
    const movieDiv = document.getElementById(id);
    // Movie Title
    const moviesLink = document.createElement("span");
    moviesLink.className = 'movie-link';
    moviesLink.innerHTML = ellipsify(data.title);
    movieDiv.appendChild(moviesLink);
    // view more Button
    const viewLink = document.createElement("a");
    viewLink.href = '#';
    viewLink.addEventListener("click", function(){ movieDetails(data.url, counter); });
    viewLink.className = '';
    viewLink.innerHTML = 'More...';
    movieDiv.appendChild(viewLink);
}

/* Display Part of Text */
function ellipsify (str) {
    if (str.length > 10) {
        return (str.substring(0, 50) + "...");
    }
    else {
        return str;
    }
}

/* Get Movie Details */
async function movieDetails(url, counter){
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
    
        const data = await response.json();
        displayMovieDetails(data, counter);
        } catch (error) {
        console.error("ERROR:", error);
        }
}

/* Display Movie Details */
function displayMovieDetails(data, counter) {

    const movieDetails = document.getElementById('actor-movie-detail'+counter);
    movieDetails.style.borderLeft = '2px solid blue';
    movieDetails.style.borderBottom = '2px solid blue';
    // Empty Div Content
    movieDetails.innerHTML = '';
    // Greate Div
    const movieDetailContent = document.createElement("div");
    movieDetailContent.className = 'row';
    movieDetails.appendChild(movieDetailContent)
    // Create Div and Display Movie Details
    const movieDetailsDiv = document.createElement("div");
    movieDetailsDiv.className = 'col-lg-4 col-md-4 col-sm-12';
    movieDetailContent.appendChild(movieDetailsDiv)
    // Movie Image
    const movieImage = document.createElement("img");
    movieImage.src = 'images/movies.webp';
    movieImage.width = '100';
    movieImage.height = '140';
    movieImage.className = 'rounded';
    movieDetailsDiv.appendChild(movieImage)
    // Create Div to Display Movie Title
    const movieTitleDiv = document.createElement("div");
    movieTitleDiv.className = 'col-lg-8 col-md-8 col-sm-12';
    movieDetailContent.appendChild(movieTitleDiv)
    // Movie Title
    const movieTitle = document.createElement("span");
    movieTitle.className = 'movie-link';
    movieTitle.innerHTML = data.title;
    movieTitleDiv.appendChild(movieTitle);
    // Create Break Tag 
    const breakTagTitle = document.createElement("br");
    // Apply Break Tag
    movieTitle.appendChild(breakTagTitle);
    // Directed By
    const movieDirector = document.createElement("span");
    movieDirector.className = 'font-small';
    movieDirector.innerHTML = 'Directed By: '+data.director;
    movieTitleDiv.appendChild(movieDirector);
    // Create Break Tag 
    const breakTagDirectedBy = document.createElement("br");
    // Apply Break Tag
    movieDirector.appendChild(breakTagDirectedBy);
    // Produced By
    const moveProducer = document.createElement("span");
    moveProducer.className = 'font-small';
    moveProducer.innerHTML = 'Produced By: '+data.producer;
    movieTitleDiv.appendChild(moveProducer);
    // Create Break Tag 
    const breakTagProducedBy = document.createElement("br");
    // Apply Break Tag
    moveProducer.appendChild(breakTagProducedBy);
    // Release Date
    const releaseDate = document.createElement("span");
    releaseDate.className = 'font-small';
    releaseDate.innerHTML = 'Produced By: '+data.release_date;
    movieTitleDiv.appendChild(releaseDate);
    // Opening Crawl
    const description = document.createElement("span");
    description.className = 'font-small text-justify';
    description.innerHTML = data.opening_crawl;
    movieDetailContent.appendChild(description);
}