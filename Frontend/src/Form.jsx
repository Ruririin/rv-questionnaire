import React, { useState } from 'react';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import { initialFormData } from './utils/formHelpers.jsx';


function Form() {
  const [formData, setFormData] = useState(initialFormData);
  const [sectionOneComplete, setSectionOneComplete] = useState(false);

  return (
    <>
      <nav className="navbar navbar-dark bg-primary mb-4 sticky-top shadow">
        <div className="d-flex justify-content-center w-100">
          <span className="navbar-brand mb-0 h1 d-flex align-items-center">
            <img
              src="/NeitClemLogo.png"
              alt="Neitclem Logo"
              style={{ height: '40px', marginRight: '10px' }}
            />
            Neitclem Applications
          </span>
        </div>
      </nav>

      <div className="container">
        {!sectionOneComplete ? (
          <SectionOne
            formData={formData}
            setFormData={setFormData}
            setSectionOneComplete={setSectionOneComplete}
          />
        ) : (
          <SectionTwo
            formData={formData}
            setFormData={setFormData}
            setSectionOneComplete={setSectionOneComplete}
          />
        )}
      </div>
    </>
  );
}

export default Form;
