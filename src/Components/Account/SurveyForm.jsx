import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import './styles.css'; // Assuming the styles.css is in the same directory

const ENDPOINT = `${BACKEND_URL}/user/survey`;

const SurveyForm = () => {
    const [fields, setFields] = useState([]);
    const [formData, setFormData] = useState({});
  
    const fetchData = () => {
      axios.get(ENDPOINT)
        .then(response => {
          // Set the fetched data as the fields for the survey form
          setFields(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };
  
    // Call the fetchData function when the component mounts
    React.useEffect(() => {
      fetchData();
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you can handle the form submission, for example, sending the data to an API
      console.log(formData);
      // Reset form data after submission
      setFormData({});
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Survey Form</h2>
        {fields.map((field) => (
          <div key={field.fld_nm}>
            <label htmlFor={field.fld_nm}>{field.question}</label>
            <input
              type="text"
              id={field.fld_nm}
              name={field.fld_nm}
              value={formData[field.fld_nm] || ''}
              onChange={handleChange}
              required={!field.optional}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default SurveyForm;