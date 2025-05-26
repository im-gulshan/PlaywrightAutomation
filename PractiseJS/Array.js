const studentMarks = {
    "Gulshan": 65,
    "Anil": 55,
    "Amit": 45,
    "Ravi": 75,
    "Kishan": 85,
    "Govinda": 95,
    "Ajay": 35,
    "Ramesh": 25,
    "Suresh": 15,
    "Rajesh": 5
}

const students = [
    { name: "Gulshan", score: 45 },
    { name: "Anil", score: 85 },
    { name: "Kora", score: 25 },
    { name: "Gora", score: 37 }
]

// console.log(studentMarks);

// for (let student in studentMarks) {
//     let marks = studentMarks[student];
//     if (marks >= 36) {
//         console.log(`${student} is passed with total makrs : ${studentMarks[student]}`);
//     } else {
//         console.log(`${student} is failed with total makrs : ${studentMarks[student]}`);
//     }

// }

const passedStudents = students.filter(student => student.score >= 36);
console.log(passedStudents);

const upperCaseStudentsPassed = passedStudents.map(student => student.name.toUpperCase());
console.log(upperCaseStudentsPassed);

const totalScore = passedStudents.reduce((acc, student)=> {
    acc = acc+student.score;
    return acc;
}, 0)

console.log("Total Score: "+totalScore);