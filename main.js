// Toggle
document.querySelector(".settings-box i").onclick = function () {
  this.classList.toggle("fa-spin");
  this.parentElement.parentElement.classList.toggle("open");
};

// Switch Colors
const colorsList = document.querySelectorAll(".colors-list li");

if (localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color")
  );
  colorsList.forEach((item) => {
    item.classList.remove("active");
    if (item.dataset.color == localStorage.getItem("color")) {
      item.classList.add("active");
    }
  });
}
if (localStorage.getItem("bullets")) {
  if (localStorage.getItem("bullets") == "none") {
    document.querySelector(".option-box.toggle i").className =
      "fa-solid fa-toggle-off";
    document.querySelector(".nav-bullets").style.display = "none";
  }
}

document.querySelector(".colors-list").addEventListener("click", (li) => {
  colorsList.forEach((e) => {
    e.classList.remove("active");
  });
  li.target.classList.add("active");
  document.documentElement.style.setProperty(
    "--main-color",
    li.target.dataset.color
  );
  localStorage.setItem("color", li.target.dataset.color);
});
// End Of Switch Color

// Start Random img
let theInterval;
let backgroundOption = true;

if (localStorage.getItem("randomBG")) {
  document
    .querySelectorAll(".random span")
    .forEach((e) => e.classList.remove("active"));
  if (localStorage.getItem("randomBG") === "true") {
    backgroundOption = true;
    document.querySelector(".random .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random .no").classList.add("active");
  }
}

document.querySelector(".random").addEventListener("click", (e) => {
  document
    .querySelectorAll(".random span")
    .forEach((e) => e.classList.remove("active"));
  if (e.target.dataset.back == "yes") {
    e.target.classList.add("active");
    backgroundOption = true;
    randomInt();
    localStorage.setItem("randomBG", true);
  } else {
    e.target.classList.add("active");
    backgroundOption = false;
    clearInterval(theInterval);
    localStorage.setItem("randomBG", false);
  }
});

function randomInt() {
  if (backgroundOption == true) {
    theInterval = setInterval(() => {
      let radomNumber = Math.floor(Math.random() * imagesArray.length);
      landingPage.style.backgroundImage =
        'url("images/' + imagesArray[radomNumber] + '")';
    }, 5000);
  }
}
randomInt();
// End Random img

// Start Landing
let landingPage = document.querySelector(".landing");
let imagesArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
//End Landing

// Start Skills
let ourSkills = document.querySelector(".skill");

window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    document.querySelectorAll(".skill-progress span").forEach((e) => {
      e.style.width = e.dataset.progress;
    });
  }
};
// End Skills

// Start Popup Gallery
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";
    document.body.appendChild(popupOverlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);
    document.body.appendChild(popupBox);

    // Make Slider Images
    let leftArrow = document.createElement("button");
    let rightArrow = document.createElement("button");
    leftArrow.innerHTML = `<i class="fa-solid fa-arrow-left left-arrow"></i>`;
    rightArrow.innerHTML = `<i class="fa-solid fa-arrow-right right-arrow"></i>`;
    document.body.appendChild(leftArrow);
    document.body.appendChild(rightArrow);

    let currentImage = Array.from(ourGallery).indexOf(img);

    leftArrow.addEventListener("click", (e) => {
      if (currentImage == 0) {
        leftArrow.firstChild.classList.add("disable");
        leftArrow.disabled = true;
      } else {
        rightArrow.firstChild.classList.remove("disable");
        rightArrow.disabled = false;
        popupImg.src = ourGallery[--currentImage].src;
      }
    });
    rightArrow.addEventListener("click", (e) => {
      if (currentImage == ourGallery.length - 1) {
        rightArrow.firstChild.classList.add("disable");
        rightArrow.disabled = true;
      } else {
        leftArrow.firstChild.classList.remove("disable");
        leftArrow.disabled = false;
        popupImg.src = ourGallery[++currentImage].src;
      }
    });

    // Close PopUp
    popupOverlay.addEventListener("click", (e) => {
      popupOverlay.remove();
      popupBox.remove();
      leftArrow.remove();
      rightArrow.remove();
    });
  });
});
// End Of Gallery

// Navigation Bullets
let bullets = document.querySelectorAll(".nav-bullets li");
bullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.view).scrollIntoView({
      behavior: "smooth",
    });
  });
});

document
  .querySelector(".option-box.toggle i")
  .addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-toggle-on")) {
      e.target.classList.remove("fa-toggle-on");
      e.target.classList.add("fa-toggle-off");
      document.querySelector(".nav-bullets").style.display = "none";
      localStorage.setItem("bullets", "none");
    } else {
      e.target.classList.remove("fa-toggle-off");
      e.target.classList.add("fa-toggle-on");
      document.querySelector(".nav-bullets").style.display = "block";
      localStorage.setItem("bullets", "block");
    }
  });

// Reset Button
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  window.location.reload();
};

// Mega Menu
let menu = document.querySelector(".landing .header i");
let menuLinks = document.querySelector(".landing .header .links");

menu.addEventListener("click", (e) => {
  e.stopPropagation();
  menuLinks.classList.toggle("open");
  menu.classList.toggle("active");
});
menuLinks.onclick = (e) => {
  e.stopPropagation();
};

document.onclick = (e) => {
  if (e.target !== menu && e.target !== menuLinks) {
    if (menuLinks.classList.contains("open")) {
      menuLinks.classList.remove("open");
      menu.classList.remove("active");
    }
  }
};

// Scroll Button
let scrollBtn = document.querySelector(".scroll-up");
window.addEventListener("scroll", () => {
  if (scrollY >= 645) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = " none";
  }
});

scrollBtn.onclick = function () {
  document.getElementById("landing").scrollIntoView({
    behavior: "smooth",
  });
};
