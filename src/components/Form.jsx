import { useRef, useState } from "react";
import { ShowData } from "./showData";


export const Form = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Age: "",
    Address: "",
    Department: "",
    Salary: "",
    Marital: false,
  });
  const [userData, setuserData] = useState(formData);

  const submitData = async (event) => {
    try {
      event.preventDefault();
      let res = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      let data = await res.json();
      for (let s in data) {
        userData[s] = data[s];
        setuserData({ ...userData, [userData[s]]: data[s] });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    // console.log(id, value);
    if (e.target.id == "Marital") {
      setFormData({
        ...formData,
        Marital: true,
      });
    }

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <div id="mainDiv">
      <div id="formDiv">
        <h1>Form</h1>
        <form onSubmit={submitData}>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Enter your name"
            id="Name"
          />
          <input
            type="number"
            onChange={handleChange}
            name=""
            placeholder="Enter your age"
            id="Age"
          />
          <textarea
            name=""
            id="Address"
            onChange={handleChange}
            placeholder="Enter your address"
            cols="30"
            rows="10"
          ></textarea>
          <select name="" onChange={handleChange} id="Department">
            <option value="">select Department</option>
            <option value="DSA">DSA</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
          <input
            type="number"
            onChange={handleChange}
            placeholder="Enter your salary"
            name=""
            id="Salary"
          />
          <div>
            <input
              type="checkbox"
              onChange={handleChange}
              name=""
              id="Marital"
            />
            <span>Married</span>
          </div>
          <input type="submit" id="button" value="Submit" />
        </form>
      </div>
      <div id="tableDiv">
        <ShowData userData={userData} />
      </div>
    </div>
  );
};

