const express = require("express");
const router = express.Router();
const { students, getNextId } = require("../data/students");

// Helper: find student index by id
function findStudentIndex(id) {
  return students.findIndex((s) => s.id === Number(id));
}

// Helper: validate student payload
function validateStudentData(data, isUpdate = false) {
  const { name, age, course } = data;

  if (!isUpdate) {
    // On create, all fields are required
    if (!name || age === undefined || !course) {
      return "Fields 'name', 'age', and 'course' are required.";
    }
  }

  if (name !== undefined && typeof name !== "string") {
    return "Field 'name' must be a string.";
  }
  if (age !== undefined && (typeof age !== "number" || isNaN(age))) {
    return "Field 'age' must be a number.";
  }
  if (course !== undefined && typeof course !== "string") {
    return "Field 'course' must be a string.";
  }

  return null; // no errors
}

// @route   GET /students
// @desc    Get all students
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

// @route   GET /students/:id
// @desc    Get a single student by id
router.get("/:id", (req, res) => {
  const index = findStudentIndex(req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${req.params.id} not found.`,
    });
  }

  res.status(200).json({
    success: true,
    data: students[index],
  });
});

// @route   POST /students
// @desc    Create a new student
router.post("/", (req, res) => {
  const error = validateStudentData(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }

  const newStudent = {
    id: getNextId(),
    name: req.body.name,
    age: req.body.age,
    course: req.body.course,
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully.",
    data: newStudent,
  });
});

// @route   PUT /students/:id
// @desc    Update an existing student
router.put("/:id", (req, res) => {
  const index = findStudentIndex(req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${req.params.id} not found.`,
    });
  }

  const error = validateStudentData(req.body, true);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }

  const { name, age, course } = req.body;
  const student = students[index];

  if (name !== undefined) student.name = name;
  if (age !== undefined) student.age = age;
  if (course !== undefined) student.course = course;

  res.status(200).json({
    success: true,
    message: "Student updated successfully.",
    data: student,
  });
});

// @route   DELETE /students/:id
// @desc    Delete a student
router.delete("/:id", (req, res) => {
  const index = findStudentIndex(req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${req.params.id} not found.`,
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Student deleted successfully.",
    data: deletedStudent,
  });
});

module.exports = router;
