/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Nabeeha Siddiqui
 *      Student ID: 129947214
 *      Date:       17/07/2022
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { songs, artists } = window;

window.onload = function () {
  // Create artist buttons and add them to the menu
  var menuElement = document.getElementById("menu");
  artists.forEach((artist) => {
    var menuButton = document.createElement("button");
    menuButton.setAttribute("id", artist.artistId);
    menuButton.setAttribute("class", "btn");
    menuButton.type = "button";
    menuButton.innerHTML = artist.name;
    menuElement.appendChild(menuButton);

    // Add click event listener to the button
    menuButton.addEventListener("click", function () {
      displayArtistSongs(artist);
    });
  });

  // Display songs of the first artist by default
  if (artists.length > 0) {
    displayArtistSongs(artists[0]);
  }
};

function displayArtistSongs(artist) {
  // Update the selected artist heading and links
  var artistHeading = document.getElementById("selected-artist");
  artistHeading.innerHTML = "";
  var heading = document.createTextNode("Artist: " + artist.name);
  artistHeading.appendChild(heading);

  // Add artist links
  var artistLinks = document.getElementById("artist-links");
  artistLinks.innerHTML = "";
  artist.urls.forEach((url) => {
    var link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.innerText = url;
    artistLinks.appendChild(link);
    artistLinks.appendChild(document.createElement("br"));
  });

  // Clear current song rows
  var tableBody = document.getElementById("song-list");
  tableBody.innerHTML = "";

  // Filter and display songs for the chosen artist
  var filteredSongs = songs.filter(
    (song) => song.artistId === artist.artistId && !song.explicit
  );

  filteredSongs.forEach((song) => {
    var tableRow = document.createElement("tr");

    // Add click handler to the row
    tableRow.addEventListener("click", function () {
      console.log(song);
    });

    // Create and append table cells
    var titleCell = document.createElement("td");
    var titleLink = document.createElement("a");
    titleLink.href = song.url;
    titleLink.target = "_blank";
    titleLink.innerText = song.title;
    titleCell.appendChild(titleLink);

    var yearCell = document.createElement("td");
    yearCell.innerText = song.year;

    var durationCell = document.createElement("td");
    durationCell.innerText = formatDuration(song.duration);

    tableRow.append(titleCell, yearCell, durationCell);
    tableBody.appendChild(tableRow);
  });
}

// Utility function to format duration from seconds to mm:ss
function formatDuration(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

// For debugging, display all of our data in the console
console.log({ songs, artists }, "Store Data");
