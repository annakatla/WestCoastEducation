const jsonRequest = "../js/courses.json";

const courses = [];
const cartCourses = [];

var courseContainer = document.getElementById("course-container");
var courseBtn = document.getElementById("showCourses");

var cartModal = document.getElementById("shoppingCart");
var cartBtn = document.getElementById("showCart");  


var adminModal = document.getElementById("admin")
var adminBtn = document.getElementById("showAdmin");
var addCourseBtn = document.getElementById("addCourse");

var added = document.getElementById("courseAdded");
var span = document.getElementsByClassName("close")[0];

class Course {
    constructor(input) {
        this.courseName = input.courseName;
        this.price = input.price;
        this.courseDcp = input.courseDcp;
        this.courseNr = input.courseNr;
        this.length = input.length;
    }
}

// function addToCart(courseID) {
//     cartCourses.push(courses[courseID]);
// }

// function DeleteFromCart(courseID) {
//     delete cartCourses[courseID];
//     showCart();
// }

function showCourseList(courseList) {
    courseContainer.innerHTML = "";
    for (let i = 0; i < courseList.length; i++) {
        let course = courseList[i];
        let courseCard = document.createElement("div");
        courseCard.className = "courseCard";
        let courseName = document.createElement("h4");
        let courseDcp = document.createElement("p");
        let addToCartBtn = document.createElement("button");
        let courseNmb = i;
        addToCartBtn.className = "courseBtn";
        addToCartBtn.innerText = "LÄGG TILL I KUNDVAGN";
        addToCartBtn.onclick = function () {
            cartCourses.push(courses[courseNmb]);
        }
        courseName.innerText = course.courseName;
        courseDcp.innerText = course.courseDcp;
        courseCard.appendChild(courseName);
        courseCard.appendChild(courseDcp);
        courseCard.appendChild(addToCartBtn);
        courseContainer.appendChild(courseCard);
    }
}

courseBtn.onclick = function showCourses() {
    courseContainer.style.display = "block";
    cartModal.style.display = "none";
    adminModal.style.display = "none";
}

cartBtn.onclick = function showCart() {
    cartModal.style.display = "block";
    courseContainer.style.display = "none";
    adminModal.style.display = "none";
    cartModal.innerHTML = "";
    let rubrik = document.createElement("h3");
    rubrik.innerText = "Kundvagn";
    cartModal.appendChild(rubrik);
    let summa = 0;
    for (let i = 0; i < cartCourses.length; i++) {
        let course = cartCourses[i];
        let courseCard = document.createElement("div");
        courseCard.className = "courseCard";
        let courseName = document.createElement("h6");
        let coursePrice = document.createElement("p");
        let deleteBtn = document.createElement("button");
        let courseNmb = i;
        deleteBtn.className = "cartBtn";
        deleteBtn.innerText = "Ta bort";
        deleteBtn.onclick = function () {
            delete cartCourses[courseNmb];
            showCart();
        }
        courseName.innerText = course.courseName;
        coursePrice.innerText = `${course.price} kr.`;
        courseCard.appendChild(courseName);
        courseCard.appendChild(coursePrice);
        courseCard.appendChild(deleteBtn);
        cartModal.appendChild(courseCard);
        summa += course.price;
    }
    let sum = document.createElement("h6");
    if (summa != 0) {
        sum.innerText = `SUMMA: ${summa} kr.`;
        cartModal.appendChild(sum);
        let buyBtn = document.createElement("button");
        buyBtn.className = "cartBtn";
        buyBtn.innerText = "KÖP";
        cartModal.appendChild(buyBtn);
    } else {
        sum.innerText = "Kundvagnen är tom";
        cartModal.appendChild(sum);
    }
}

adminBtn.onclick = function showAdmin() {
    adminModal.style.display = "block";
    courseContainer.style.display = "none";
    cartModal.style.display = "none";
}

addCourseBtn.onclick = function addCourse() {
    const admin = {
        courseName: document.getElementById("courseTitle").value,
        courseNr: document.getElementById("courseNum").value,
        courseDcp: document.getElementById("courseDcp").value,
        length: document.getElementById("courseLength").value,
        price: document.getElementById("coursePrice").value,
    }
    let course = new Course(admin);
    courses.push(course);
    showCourseList(courses);
    added.style.display = "block";
    // adminModal.style.display = "none";
    // courseContainer.style.display = "block";
}

span.onclick = function() {
    added.style.display = "none";
  }

fetch (jsonRequest)
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            let course = new Course(data[i]);
            courses.push(course);
        }
        showCourseList(courses);
    })
    .catch(console.error);