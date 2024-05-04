// Attach a function to run when the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    setupPageFunctions();  // Initialize the page setup
});

// Setup functions based on the current page
function setupPageFunctions() {
    const path = window.location.pathname;  // Get the current page's path
    // Load appropriate data based on the current page
    if (path.includes('index.html')) {
        loadMovies();  // Load movies on the index page
    } else if (path.includes('showings.html')) {
        loadMovieDetails();  // Load details for a single movie on the showings page
    } else if (path.includes('booking.html')) {
        loadBookingDetails();  // Setup the booking form with details
        setupBookingForm();  // Attach event listeners to the booking form
    }
}

// Function to get weekend dates for a given year and month
function getWeekendDates(year, month) {
    const dates = [];
    const date = new Date(year, month, 1);  // Start at the beginning of the month
    // Iterate over all days of the month
    while (date.getMonth() === month) {
        const dayOfWeek = date.getDay();  // Get the day of the week (0=Sunday, 6=Saturday)
        // Check if the day is a weekend
        if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
            dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));  // Format and add the date
        }
        date.setDate(date.getDate() + 1);  // Move to the next day
    }
    return dates;  // Return all weekend dates
}

// Movie data array
const movies = [
    // Example movie data
    {
        title: "The Shawshank Redemption",
        rating: "R",
        month: "April",
        image: "images/shawshank.jpg",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        showtimes: getWeekendDates(2024, 3)  // Get showtimes for April 2024
    },
    // Add more movies as needed
];

// Load movies into the index.html page
function loadMovies() {
    console.log("Loading movies...");
    const mainContent = document.getElementById('main-content');  // Reference to the main content area
    mainContent.innerHTML = '<div class="movie-container"></div>';  // Clear previous content and setup a container
    const movieContainer = document.querySelector('.movie-container');  // Get the container for movies

    // Iterate over each movie in the array
    movies.forEach(movie => {
        const movieTile = document.createElement('a');  // Create a new link element for each movie
        movieTile.href = `showings.html?movie=${encodeURIComponent(movie.title)}`;  // Link to the showings page with the movie title as a parameter
        movieTile.className = 'movie-tile';  // Set CSS class for styling

        const img = document.createElement('img');  // Create an image element for the movie poster
        img.src = movie.image;  // Set the source of the image
        img.alt = movie.title;  // Set the alt text for the image

        const title = document.createElement('h2');  // Create a heading element for the movie title
        title.textContent = movie.title;  // Set the text of the heading

        const rating = document.createElement('p');  // Create a paragraph for the movie rating
        rating.textContent = `Rated: ${movie.rating}`;  // Set the text for the rating

        const month = document.createElement('p');  // Create a paragraph for the month
        month.textContent = `${movie.month} 2024`;  // Set the text for the month

        // Append all elements to the movie tile
        movieTile.appendChild(img);
        movieTile.appendChild(title);
        movieTile.appendChild(rating);
        movieTile.appendChild(month);
        movieContainer.appendChild(movieTile);  // Add the complete movie tile to the container
    });
}

// Load movie details into the showings.html page
function loadMovieDetails() {
    const movieTitle = decodeURIComponent(new URLSearchParams(window.location.search).get('movie'));  // Extract the movie title from the URL
    const movie = movies.find(m => m.title === movieTitle);  // Find the movie by title in the array

    const detailsContainer = document.querySelector('.movie-details');  // Get the container for movie details
    const showingsOptions = document.querySelector('.showing-options');  // Get the container for showing options

    if (movie) {
        // If the movie is found, populate the details section
        detailsContainer.innerHTML = `<img src="${movie.image}" alt="${movie.title}" style="width:100%;">
                                      <h2>${movie.title}</h2>
                                      <p>Rated: ${movie.rating}</p>
                                      <p>${movie.description}</p>`;

        // Populate the showing options
        showingsOptions.innerHTML = '<h3>Available Showtimes:</h3>';
        movie.showtimes.forEach(date => {
            const timeButton = document.createElement('button');  // Create a button for each showtime
            timeButton.textContent = date;  // Set the button text to the showtime date
            timeButton.onclick = () => {
                window.location.href = `booking.html?movie=${encodeURIComponent(movie.title)}&date=${date}`;  // Set the onclick event to redirect to the booking page with the selected date
            };
            showingsOptions.appendChild(timeButton);  // Add the button to the showings options container
        });
    } else {
        // If the movie is not found, display an error message
        detailsContainer.innerHTML = '<p>Movie details not found.</p>';
    }
}

// Load booking details into the booking.html page
function loadBookingDetails() {
    const params = new URLSearchParams(window.location.search);  // Get the URL parameters
    const movieTitle = decodeURIComponent(params.get('movie'));  // Get the movie title
    const dateString = params.get('date');  // Get the date
    const movie = movies.find(m => m.title === movieTitle);  // Find the movie by title

    if (movie) {
        // If the movie is found, populate the booking details
        const detailsContainer = document.querySelector('.movie-details');  // Get the container for movie details
        detailsContainer.innerHTML = `<img src="${movie.image}" alt="${movie.title}" style="width:100%;">
                                      <h2>${movie.title}</h2>
                                      <p>Rated: ${movie.rating}</p>
                                      <p>${movie.description}</p>`;

        const date = new Date(dateString + ", " + new Date().getFullYear());  // Create a date object from the dateString
        const dayOfWeek = date.getDay();  // Get the day of the week from the date object

        const timeSelect = document.getElementById('time');  // Get the select element for time
        timeSelect.innerHTML = '';  // Clear previous options
        const dateLabel = document.getElementById('showing-date');  // Get the label for the selected date
        dateLabel.textContent = `Selected Date: ${dateString}`;  // Set the text of the label
        dateLabel.setAttribute('data-date', dateString);  // Set a data attribute for the selected date

        // Set the available times based on the day of the week
        if (dayOfWeek === 5) {  // If it's Friday
            timeSelect.innerHTML = `<option value="7:00 PM">7:00 PM</option>`;  // Set the time for Friday
        } else if (dayOfWeek === 0) {  // If it's Sunday
            timeSelect.innerHTML = `<option value="2:00 PM">2:00 PM</option>`;  // Set the time for Sunday
        } else if (dayOfWeek === 6) {  // If it's Saturday
            // Provide two options for Saturday
            timeSelect.innerHTML = `<option value="1:00 PM">1:00 PM</option>
                                    <option value="6:00 PM">6:00 PM</option>`;
        }
    } else {
        // If the movie is not found, display an error message
        detailsContainer.innerHTML = '<p>Movie details not found.</p>';
    }
}

// Setup the booking form
function setupBookingForm() {
    const form = document.getElementById('booking-form');  // Get the form element
    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submission behavior
        submitBookingForm();  // Call the submitBookingForm function when the form is submitted
    });
}

// Handle the submission of the booking form
function submitBookingForm() {
    const date = document.getElementById('showing-date').getAttribute('data-date');  // Get the selected date from the showing-date label
    const time = document.getElementById('time').value;  // Get the selected time from the time select element
    const email = document.getElementById('email').value;  // Get the email from the email input element
    const tickets = document.getElementById('tickets').value;  // Get the number of tickets from the tickets input element

    // Display a confirmation message
    alert(`Your booking on ${date} at ${time} was successful. Confirmation will be sent to ${email}.`);
    window.location.href = 'index.html';  // Redirect to the index page
}
