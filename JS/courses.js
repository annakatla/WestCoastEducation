const jsonRequest = new Request("../js/courses.json");

const courses = [];
const cartCourses = [];

var courseContainer = document.getElementById("course-container");
var cartModal = document.getElementById("shoppingCart");
var cartBtn = document.getElementById("showCart");  
var adminModal = document.getElementById("admin")
var adminBtn = document.getElementById("showAdmin");

class Course {
    constructor(input) {
        this.courseName = input.courseName;
        this.price = input.price;
        this.courseDcp = input.courseDcp;
        this.courseNr = input.courseNr
    }
}

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
        addToCartBtn.onclick = addToCart(courseNmb);
        courseName.innerText = course.courseName;
        courseDcp.innerText = course.courseDcp;
        courseCard.appendChild(courseName);
        courseCard.appendChild(courseDcp);
        courseCard.appendChild(addToCartBtn);
        courseContainer.appendChild(courseCard);
    }
}

function addToCart(courseID) {
    cartCourses.push(courses[courseID]);
}

cartBtn.onclick = function showCart(cartCourses) {
    cartModal.style.display = "block";
    courseContainer.style.display = "none";
    adminModal.style.display = "none";
    let shoppingCart = document.createElement("ul");
    shoppingCart.className = "coursesInCart";
    for (let i = 0; i < cartCourses.length; i++) {
        let courseInCart = document.createElement("li");
        courseInCart.innerText = course.courseName;
        cartList.appendChild(courseInCart);
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