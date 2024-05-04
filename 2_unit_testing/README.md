# Unit Testing for Classics Theater Website

## Overview
Unit testing ensures that individual components of the Classics Theater website function as expected. This process involves testing each function and module independently to guarantee they operate correctly in isolation.

## Unit Testing Strategy

### Tools Used
- **Jest**: A JavaScript testing framework used to create and manage unit tests.
- **JSDOM**: To simulate browser environments for testing DOM manipulations.

### Components Tested
- **Movie Data Loading**: Tests the function that loads movie data ensures it correctly parses and displays the data.
- **Showtime Calculations**: Ensures that the function calculating weekend dates generates the correct showtimes for each movie.
- **UI Components**: Tests interactions with DOM elements like buttons and links to ensure they trigger the correct actions.

### Running Tests
1. Install dependencies:
   ```bash
   npm install jest jsdom --save-dev
