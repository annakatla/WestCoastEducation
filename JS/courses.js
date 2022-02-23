const jsonRequest = new Request("../js/courses.json");

const courses = [];
const cartCourses = [];

var courseContainer = document.getElementById("course-container");
var cartModal = document.getElementById("shoppingCart");
var cartBtn = document.getElementById("showCart");  
var adminModal = document.getElementById("admin")
var adminBtn = document.getElementById("showAdmin");
var addCourseBtn = document.getElementById("addCourse");

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

cartBtn.onclick = function showCart() {
    cartModal.style.display = "block";
    courseContainer.style.display = "none";
    adminModal.style.display = "none";
    for (let i = 0; i < cartCourses.length; i++) {
        let course = cartCourses[i];
        let courseCard = document.createElement("div");
        courseCard.className = "courseCard";
        let courseName = document.createElement("h6");
        let coursePrice = document.createElement("p");
        let deleteBtn = document.createElement("button");
        let courseNmb = i;
        deleteBtn.className = "DeleteCourseBtn";
        deleteBtn.innerText = "Ta bort";
        deleteBtn.onclick = function () {
            delete cartCourses[courseNmb];
        }
        courseName.innerText = course.courseName;
        coursePrice.innerText = course.price;
        courseCard.appendChild(courseName);
        courseCard.appendChild(coursePrice);
        courseCard.appendChild(deleteBtn);
        cartModal.appendChild(courseCard);
    }
}

adminBtn.onclick = function showAdmin() {
    adminModal.style.display = "block";
    courseContainer.style.display = "none";
    cartModal.style.display = "none";
    let testing = document.createElement("div");
    let texting = document.createElement("p");
    texting.innerText = "hejsan hoppsan";
    testing.appendChild(texting);
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
    adminModal.style.display = "none";
    courseContainer.style.display = "block";
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