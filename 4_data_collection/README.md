# Script Data Handling in Classics Theater Website

## Overview
This document details how scripts manage and manipulate data throughout the Classics Theater website, ensuring dynamic content is handled efficiently and accurately.

## Data Handling Overview

### Data Structure
- **Movies Array**: Central data structure storing movie details including titles, ratings, descriptions, showtimes, and images.

### Data Flow
- **Loading Movies**: `loadMovies()` dynamically populates the homepage with movies from the array.
- **Passing Data**: When a user selects a movie, the title is passed via URL parameters to the showings and booking pages.
- **Showings Page**: `loadMovieDetails()` retrieves the movie from the array using the title from the URL and displays detailed information.
- **Booking Page**: Similar to showings, but includes form handling to submit bookings.

### Functions
- **getWeekendDates()**: Calculates available showtimes based on the movie's month and filters for weekends.
- **submitBookingForm()**: Handles the submission of booking details and provides confirmation to the user.

## Conclusion
The script handling on the Classics Theater website ensures that data flows seamlessly across pages, supporting dynamic content updates and interactive user engagements.

