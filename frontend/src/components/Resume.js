import React, { useState } from "react";

const Resume = () => {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("pdf_file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        setOutput(result);
      } else {
        console.error("Failed to make the request.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <h3>Output:</h3>
        <div textColor="white" dangerouslySetInnerHTML={{ __html: output }} />
      </div>
    </div>
  );
};

export default Resume;
