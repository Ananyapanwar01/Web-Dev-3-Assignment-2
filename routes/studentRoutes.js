const express = require("express");
const router = express.Router();
let students = require("../data/students");


router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});


router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid student ID format. ID must be a number."
    });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});


router.post("/", (req, res) => {
  const { name, course } = req.body;

  
  if (!name || typeof name !== "string" || name.trim() === "" ||
      !course || typeof course !== "string" || course.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Invalid input. Both 'name' and 'course' are required non-empty strings."
    });
  }

  const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

  const newStudent = {
    id: newId,
    name: name.trim(),
    course: course.trim()
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "New student created successfully.",
    data: newStudent
  });
});


router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid student ID format. ID must be a number."
    });
  }

  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found.`
    });
  }

  const { name, course } = req.body;

  
  if (name === undefined && course === undefined) {
    return res.status(400).json({
      success: false,
      message: "Invalid input. Provide 'name' or 'course' to update."
    });
  }

  if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
    return res.status(400).json({
      success: false,
      message: "Invalid input. 'name' must be a non-empty string."
    });
  }

  if (course !== undefined && (typeof course !== "string" || course.trim() === "")) {
    return res.status(400).json({
      success: false,
      message: "Invalid input. 'course' must be a non-empty string."
    });
  }

  if (name !== undefined) {
    students[studentIndex].name = name.trim();
  }
  if (course !== undefined) {
    students[studentIndex].course = course.trim();
  }

  res.status(200).json({
    success: true,
    message: "Student updated successfully.",
    data: students[studentIndex]
  });
});


router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid student ID format. ID must be a number."
    });
  }

  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found.`
    });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: "Student deleted successfully.",
    data: deletedStudent
  });
});

module.exports = router;
