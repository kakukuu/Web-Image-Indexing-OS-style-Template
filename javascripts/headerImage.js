// headerImage.js

// Description: This script is used to enlarge the header image when clicked.

document.addEventListener("DOMContentLoaded", () => {
    const headerImg = document.querySelector(".header-img");
    if (!headerImg) return;
    
    headerImg.addEventListener("click", () => {
      headerImg.classList.toggle("enlarged");
    });
  });