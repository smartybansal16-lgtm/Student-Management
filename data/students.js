// In-memory data store for students (Array + JSON only, no database)

let students = [
  { id: 1, name: "Rahul", age: 20, course: "BCA" },
  { id: 2, name: "Naman", age: 21, course: "BCA" },
  { id: 3, name: "Daksh", age: 20, course: "BTech" },
  { id: 4, name: "Harsh", age: 21, course: "BTech" },
];

// Keeps track of the next id to assign to a new student
let nextId = 5;

function getNextId() {
  return nextId++;
}

module.exports = { students, getNextId };
