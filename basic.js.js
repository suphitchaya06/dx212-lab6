let name = "Peter" ;
let age = 20
let graduated = true;
let gpa = 3.75;

let student1 ={
    name : "Manee",
    age : 19,
    graduated : true,
    gpa: 2.65
};

let student2 ={
    name : "name",
    age : age,
    graduated : graduated,
    gpa: gpa
};

console.log(student1.name);
console.log(student2);

let grades =["A","B","C","D","F"];
let score = [90,80,70,60,50];
let students =[student1,student2];

console.log(students); //students เติม s จะโชว์ทั้งสองคนเลย
console.log(student[1].gpa);

function calculateGrade(score){
    if(score >= 90){
        return "A";
    } else if (score >= 80){
        return "B";
    }else if (score >= 70){
        return "C";
    }else 
        return "F";
}

console.log(calculateGrade(90));

for (let i = 0; i < scores.length; i++){
    let grade = calculateGrade(score[i]);
    console.log(`Score: {$(scores[i])}, Grade: ${grade}`);
}
