const toggle = document.getElementById("toggle");
const navbar = document.getElementsByClassName("navbar-container");
const sidebar = document.querySelector(".side-navbar");
const enrollcont = document.querySelector(".contact-form");

let user = document.cookie;

const enrollfun = () => {
  enrollcont.classList.toggle("popup");
};

const togglefun = () => {
  toggle.classList.toggle("active");
  navbar[0].classList.toggle("slidenav");
};

const sideToggle = () => {
  sidebar.classList.toggle("side-toggle");
};





let scrollPotint;
window.addEventListener("scroll", () => {
  scrollPotint = scrollY;
  if (scrollPotint > 0) {
    document.querySelector(".header").classList.add("sticky");
  } else {
    document.querySelector(".header").classList.remove("sticky");
  }
});

if (!user) {
  console.log("user is now active...");
  window.setTimeout(enrollfun, 4000);
}


// photo upload controller---------------

const studentPhoto=document.querySelector("#studentPhoto")
if(studentPhoto){
  const studentPhotoPreview=document.querySelector("#student-photo-preview")
studentPhoto.onchange = evt => {
  const [file] = studentPhoto.files
  if (file) {
    studentPhotoPreview.src = URL.createObjectURL(file)
  }
}
}
const adharPhoto=document.querySelector("#adharPhoto")

if(adharPhoto){

  const adharPhotoPreview=document.querySelector("#adhar-photo-preview")
  adharPhoto.onchange = evt => {
    const [file] = adharPhoto.files
    if (file) {
      adharPhotoPreview.src = URL.createObjectURL(file)
    }
  }
}
const markPhoto=document.querySelector("#markPhoto")
if(markPhoto){

  const markPhotoPreview=document.querySelector("#mark-photo-preview")
  markPhoto.onchange = evt => {
    const [file] = markPhoto.files
    if (file) {
      markPhotoPreview.src = URL.createObjectURL(file)
    }
  }
}
