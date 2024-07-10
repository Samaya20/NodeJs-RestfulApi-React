import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students: ", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Yeni student yaradilmasi
    const newStudent = {
      id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
      name: name,
      surname: surname,
      age: parseInt(age),
    };

    axios
      .post("http://localhost:5000/students", newStudent)
      .then((response) => {
        console.log("New student added: ", response.data);
        setName("");
        setSurname("");
        setAge("");
        fetchStudents();
      })
      .catch((error) => {
        console.error("Error adding student: ", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/students/${id}`)
      .then((response) => {
        console.log("Student deleted");
        fetchStudents();
      })
      .catch((error) => {
        console.error("Error deleting student: ", error);
      });
  };

  return (
    <div className="container">
      <h1>Student əlavə et</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Ad:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Soyad:</span>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Yaş:</span>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>
        <button type="submit">Əlavə et</button>
      </form>

      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <div className="info">
              <p>
                <span>Ad :</span> {student.name}
              </p>
              <p>
                <span>Soyad :</span> {student.surname}
              </p>
              <p>
                <span>Yaş :</span> {student.age}
              </p>
            </div>

            <button onClick={() => handleDelete(student.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
