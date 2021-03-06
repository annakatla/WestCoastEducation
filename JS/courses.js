const jsonRequest = new Request("../JS/courses.json");

const courses = [];
const cartCourses = [];

var courseContainer = document.getElementById("course-container");
var courseBtn = document.getElementById("showCourses");

var cartModal = document.getElementById("shoppingCart");
var cartBtn = document.getElementById("showCart");  
var bought = document.getElementById("boughtCourses");
var spanB = document.getElementsByClassName("close")[1];


var adminModal = document.getElementById("admin")
var adminBtn = document.getElementById("showAdmin");
var addCourseBtn = document.getElementById("addCourse");

var added = document.getElementById("addedCourse");
var spanA = document.getElementsByClassName("close")[0];

class Course {
    constructor(input) {
        this.courseName = input.courseName;
        this.price = input.price;
        this.courseDcp = input.courseDcp;
        this.courseNr = input.courseNr;
        this.length = input.length;
    }
}

function addToCart(courseID) {
    if (cartCourses.includes(courses[courseID])) {
        alert("Du har redan lagt till kursen!");
        return;
    }
    cartCourses.push(courses[courseID]);
}

function deleteFromCart(courseID) {
    cartCourses.splice(courseID, 1);
}

function emptyCart() {
    cartCourses.splice(0, cartCourses.length);
    cartModal.innerHTML = "";
    let rubrik = document.createElement("h3");
    rubrik.innerText = "Kundvagn";
    cartModal.appendChild(rubrik);
}

function emptyAdminFields() {
    document.getElementById("courseTitle").value = '';
    document.getElementById("courseNum").value = '';
    document.getElementById("courseDcp").value = '';
    document.getElementById("courseLength").value = '';
    document.getElementById("coursePrice").value = '';
}

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
        addToCartBtn.innerText = "L??GG TILL I KUNDVAGN";
        addToCartBtn.onclick = function() {addToCart(courseNmb)}
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
    added.style.display = "none";
    bought.style.display = "none";
}

cartBtn.onclick = function showCart() {
    cartModal.style.display = "block";
    courseContainer.style.display = "none";
    adminModal.style.display = "none";
    added.style.display = "none";
    bought.style.display = "none";
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
        deleteBtn.onclick = function() {
            deleteFromCart(courseNmb); 
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
    sum.className = "cartText";
    if (summa != 0) {
        sum.innerText = `SUMMA: ${summa} kr.`;
        cartModal.appendChild(sum);
        let buyBtn = document.createElement("button");
        buyBtn.className = "cartBtn";
        buyBtn.innerText = "K??P";
        cartModal.appendChild(buyBtn);
        buyBtn.onclick = function () {
            bought.style.display = "block";
            emptyCart();
        }
    } else {
        sum.innerText = "Kundvagnen ??r tom";
        cartModal.appendChild(sum);
    }
}

adminBtn.onclick = function showAdmin() {
    emptyAdminFields();
    adminModal.style.display = "block";
    courseContainer.style.display = "none";
    cartModal.style.display = "none";
    added.style.display = "none";
    bought.style.display = "none";
}

addCourseBtn.onclick = function addCourse() {
    const admin = {
        courseName: document.getElementById("courseTitle").value,
        courseNr: parseInt(document.getElementById("courseNum").value),
        courseDcp: document.getElementById("courseDcp").value,
        length: document.getElementById("courseLength").value,
        price: parseInt(document.getElementById("coursePrice").value.replace(" ", "")),
    }
    if (admin.courseName === "" || admin.courseName === null) {
        alert("Du m??ste fylla i kurstitel!")
        return;
    }
    if(document.getElementById("courseNum").value == "" || document.getElementById("courseNum").value == null) {
        alert("Du m??ste fylla i kursnummer!")
        return;
    }
    if (Number.isNaN(admin.price)) {
        alert("Du m??ste fylla i r??tt kostnad!")
        return;
    }

    let course = new Course(admin);
    let courseNameExist = courses.find(c => c.courseName == course.courseName);
    let courseNrExist = courses.find(c => c.courseNr == course.courseNr);
    if (courseNameExist || courseNrExist) {
        alert("Kursen finns redan. V??nligen ange annan Kurstitel eller Kursnummer.")
        return;
    }
    courses.push(course);
    showCourseList(courses);
    added.style.display = "block";
}

spanA.onclick = function() {
    added.style.display = "none";
    emptyAdminFields();
    showAdmin();
  }

spanB.onclick = function() {
bought.style.display = "none";
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