import React, { useState, useRef, useEffect } from 'react';

const initialFormData = {
  businessName: '',
  rentRVs: '',
  rentRVsInsured: '',
  rentRVsInventory: '',
  rentStorage: '',
  operateRVPark: '',
  rvParkGLCoverage: '',
  sellLPG: '',
  lpgCollisionBarriers: '',
  lpgNoSmoking: '',
  lpgQualifiedOperators: '',
  lpgDistance: '',
  lpgGallons: '',
  workKitchen: '',
  workSiding: '',
  workFlooring: '',
  workHitch: '',
  workPlumbing: '',
  workMechanics: '',
  workRoofs: '',
  workWelding: '',
  workOther: '',
  workOtherDescription: '',
  techDetails: '',
  hitchTypeBall: false,
  hitchTypeReceiver: false,
  hitchType5th: false,
  hitchesBolted: '',
  weldingCertified: '',
  rvTradeShows: false,
  tradeShowDrive: false,
  tradeShowDistance: '',
  tradeShowCount: '',
  salesAccessories: '',
  salesParts: '',
  salesCampingGear: '',
  salesGroceries: '',
  personalUse: '',
  delivery: '',
  deliveryDistance: '',
  deliveryTowed: false,
  deliveryDriven: false,
  deliveryTransporter: false,
  towVehicle: '',
  towingCovered: '',
  returnVehicleTowed: false,
  dealerPlate: '',
  otherReturn: '',
  date: '',
  signatureSaved: false
};

function Form() {
  const [formData, setFormData] = useState(initialFormData);
  const [signatureMode, setSignatureMode] = useState('upload');
  const [uploadedSignature, setUploadedSignature] = useState(null);
  const [drawnSignatureBlob, setDrawnSignatureBlob] = useState(null);
  const [sectionOneComplete, setSectionOneComplete] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (signatureMode === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    }
  }, [signatureMode]);

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedSignature(file);
      setFormData({ ...formData, signatureSaved: true });
    }
  };

const startDrawing = (e) => {
  if (signatureMode !== 'draw') return;
  setDrawing(true);
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  
  ctx.beginPath();
  ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
};

const drawOnCanvas = (e) => {
  if (!drawing || signatureMode !== 'draw') return;
  
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');

  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000';
  ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  ctx.stroke();
};

  const stopDrawing = () => {
    setDrawing(false);
    if (canvasRef.current) {
      canvasRef.current.getContext('2d').beginPath();
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setFormData({ ...formData, signatureSaved: false });
    setDrawnSignatureBlob(null);
  };

  const saveCanvasAsImage = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      if (blob) {
        setDrawnSignatureBlob(blob);
        setFormData({ ...formData, signatureSaved: true });
      }
    });
  };

 const renderYesNo = (name, style = 'buttons') => {
    if (style === 'form-check') {
      return (
        <div className="d-flex gap-4">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={`${name}-yes`}
              value="Yes"
              checked={formData[name] === 'Yes'}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={`${name}-yes`}>
              Yes
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={`${name}-no`}
              value="No"
              checked={formData[name] === 'No'}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={`${name}-no`}>
              No
            </label>
          </div>
        </div>
      );
    }

  // default button-style
  return (
    <div
      className="btn-group btn-group-sm"
      role="group"
      aria-label={`${name} radio toggle`}
      style={{ minWidth: '120px', justifyContent: 'flex-start' }}
    >
      <input
        type="radio"
        className="btn-check"
        name={name}
        id={`${name}-yes`}
        autoComplete="off"
        value="Yes"
        checked={formData[name] === 'Yes'}
        onChange={handleChange}
      />
      <label className="btn btn-outline-primary" htmlFor={`${name}-yes`}>
        Yes
      </label>

      <input
        type="radio"
        className="btn-check"
        name={name}
        id={`${name}-no`}
        autoComplete="off"
        value="No"
        checked={formData[name] === 'No'}
        onChange={handleChange}
      />
      <label className="btn btn-outline-primary" htmlFor={`${name}-no`}>
        No
      </label>
    </div>
  );
};


  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleContinue = (e) => {
    e.preventDefault();
    const { businessName, date, signatureSaved } = formData;

    if (!businessName || !date || !signatureSaved) {
      alert('Please fill in all fields and provide a signature.');
      return;
    }

    setSectionOneComplete(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    if (formData.workKitchen.trim() !== '' && formData.techDetails.trim() === '') {
      alert('Please provide technician qualifications if Kitchen/Heating/Electrical work is entered.');
      return;
    }

    console.log('Form is valid. Submitting:', formData);
  };

return (
  <>
    <nav className="navbar navbar-dark bg-primary mb-4 sticky-top shadow" >
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
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h1 className="text-center mb-4">RV Questionnaire</h1>

          {!sectionOneComplete ? (
            <div className="card border-primary mb-4">
              <div className="card-body">
                <div className="alert alert-warning p-4 rounded shadow-sm">
                  <h5 className="mb-3 text-uppercase fw-bold text-danger">Important Notice</h5>
                  <p className="mb-2">
                    Please complete the following information and provide your signature before continuing.
                  </p>
                  <p className="mb-0">
                    By completing this application, the applicant is applying for coverage with either <strong>Colony Insurance Company</strong> or 
                    <strong> Colony Specialty Insurance Company</strong>, an authorized surplus lines insurer, or 
                    <strong> Argonaut Insurance Company</strong> or <strong>Argonaut Midwest Insurance Company</strong>, a licensed insurer.
                  </p>
                </div>

                <form onSubmit={handleContinue}>
                  <div className="mb-4">
                    <label className="form-label fw-bold">Business Trade Name: <span className="text-danger">*</span></label>
                    <input 
                      name="businessName" 
                      value={formData.businessName} 
                      onChange={handleChange} 
                      required 
                      className="form-control form-control-lg" 
                      placeholder="Enter your business trade name"
                    />
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Date: <span className="text-danger">*</span></label>
                      <input 
                        type="date" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange} 
                        required 
                        className="form-control form-control-lg" 
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold">Signature: <span className="text-danger">*</span></label>
                      <div className="btn-group mb-3" role="group">
                        <input 
                          type="radio" 
                          className="btn-check" 
                          name="signatureMode" 
                          id="upload-mode" 
                          value="upload"
                          checked={signatureMode === 'upload'}
                          onChange={(e) => setSignatureMode(e.target.value)}
                        />
                        <label className="btn btn-outline-secondary" htmlFor="upload-mode">Upload Signature</label>

                        <input 
                          type="radio" 
                          className="btn-check" 
                          name="signatureMode" 
                          id="draw-mode" 
                          value="draw"
                          checked={signatureMode === 'draw'}
                          onChange={(e) => setSignatureMode(e.target.value)}
                        />
                        <label className="btn btn-outline-secondary" htmlFor="draw-mode">Draw Signature</label>
                      </div>

                      {signatureMode === 'upload' && (
                        <div className="border rounded p-2 bg-light">
                          <input
                            className="form-control"
                            type="file"
                            accept="image/*"
                            onChange={handleSignatureUpload}
                          />
                          {uploadedSignature && (
                            <div className="mt-2 text-success">
                              ✓ Signature uploaded: {uploadedSignature.name}
                            </div>
                          )}
                        </div>
                      )}

                      {signatureMode === 'draw' && (
                        <div className="border rounded p-2 bg-light">
                          <canvas
                            ref={canvasRef}
                            width={500}
                            height={150}
                            style={{
                              width: '100%',
                              maxWidth: '500px',
                              height: '150px',
                              border: '1px solid #ccc',
                              cursor: 'crosshair'
                            }}
                            className="border bg-white"
                            onMouseDown={startDrawing}
                            onMouseMove={drawOnCanvas}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                          />
                          <div className="mt-2">
                            <button type="button" className="btn btn-sm btn-outline-danger me-2" onClick={clearSignature}>Clear</button>
                            <button type="button" className="btn btn-sm btn-outline-success" onClick={saveCanvasAsImage}>Save Signature</button>
                          </div>
                          {drawnSignatureBlob && (
                            <div className="mt-2 text-success">✓ Signature saved</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Continue to Business Details →
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
              // SECTION 2: Business Details (Original Form)
              <div>
                <div className="card bg-secondary mb-3">
                 <div className="card-header bg-light d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Section 2: Business Details</h4>
                  <button 
                    className="btn btn-light text-dark gray"
                    onClick={() => setSectionOneComplete(false)}
                  >
                    ← Edit Section 1
                  </button>
                </div>


                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      {/* 1. RV RENTALS */}
                      <div className="row align-items-center mb-3">
                        <div className="col-md-10">
                          <h5 className="mb-0">
                            1. Do you rent RVs to customers?
                          </h5>
                        </div>
                        <div className="col-md-2">
                          {renderYesNo('rentRVs')}
                        </div>
                      </div>

                      {formData.rentRVs === 'Yes' && (
                        <div className="ms-5">
                          {/* Follow-up A */}
                          <div className="d-flex align-items-center mb-3">
                            <div className="me-3" style={{ width: '700px' }}>
                              <label className="form-label mb-0">
                                a] Are rental vehicles separately insured?
                              </label>
                            </div>
                            <div style={{ width: '150px' }}>
                              {renderYesNo('rentRVsInsured' , 'form-check')}
                            </div>
                          </div>

                          {/* Follow-up B */}
                          <div className="d-flex align-items-center mb-3">
                            <div className="me-3" style={{ width: '700px' }}>
                              <label className="form-label mb-0">
                                b] Are rental units part of inventory held for sale?
                              </label>
                            </div>
                            <div style={{ width: '150px' }}>
                              {renderYesNo('rentRVsInventory' , 'form-check')}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. STORAGE */}
                      <div className="row align-items-center mb-3">
                        <div className="col-md-10">
                          <h5 className="mb-0">
                            2. Do you rent RV storage space to customers?
                          </h5>
                        </div>
                        <div className="col-md-2">
                          {renderYesNo('rentStorage')}
                        </div>
                      </div>

                      {formData.rentStorage === 'Yes' && (
                        <div className="ms-5 mb-3">
                          <p className="text-muted">
                            Complete Storage Facility Questionnaire and provide a copy of the Storage Agreement
                          </p>
                          <div>
                            <label htmlFor="storageAgreementFile" className="form-label">Upload Storage Agreement:</label>
                            <input
                              className="form-control"
                              type="file"
                              id="storageAgreementFile"
                              name="storageAgreementFile"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      )}

                      {/* 3. RV PARK OPERATIONS */}
                      <div className="row align-items-center mb-3">
                        <div className="col-md-10">
                          <h5 className="mb-0">
                           3. Do you operate an RV park / campground?
                          </h5>
                        </div>
                        <div className="col-md-2">
                          {renderYesNo('operateRVPark')}
                        </div>
                      </div>

                      {formData.operateRVPark === 'Yes' && (
                        <div className="ms-5 mb-3 d-flex align-items-center">
                          <div className="me-3" style={{ width: '700px' }}>
                            <label className="form-label mb-0">
                              Do you have GL Coverage in place for these operations?
                            </label>
                          </div>
                          <div style={{ width: '150px' }}>
                            {renderYesNo('rvParkGLCoverage' , 'form-check' )}
                          </div>
                        </div>
                      )}

                      {/* 4. LPG SALES */}
                      <div className="row align-items-center mb-3">
                        <div className="col-md-10">
                          <h5 className="mb-0">
                           4. Do you sell Liquefied Petroleum Gas (LPG)?
                          </h5>
                        </div>
                        <div className="col-md-2">
                          {renderYesNo('sellLPG')}
                        </div>
                      </div>
                 
                     {formData.sellLPG === 'Yes' && (
                      <div className="ms-5">
                        {/* a */}
                        <div className="d-flex align-items-center mb-3">
                          <div className="me-3" style={{ width: '700px' }}>
                            <label className="form-label mb-0">a] Is the storage tank protected by collision barriers?</label>
                          </div>
                          <div style={{ width: '150px' }}>
                            {renderYesNo('lpgCollisionBarriers' , 'form-check')}
                          </div>
                        </div>

                        {/* b */}
                        <div className="d-flex align-items-center mb-3">
                          <div className="me-3" style={{ width: '700px' }}>
                            <label className="form-label mb-0">b] Are "No Smoking" signs posted?</label>
                          </div>
                          <div style={{ width: '150px' }}>
                            {renderYesNo('lpgNoSmoking' , 'form-check')}
                          </div>
                        </div>

                        {/* c */}
                        <div className="d-flex align-items-center mb-3">
                          <div className="me-3" style={{ width: '700px' }}>
                            <label className="form-label mb-0">c] Do only qualified operators fill customer's tanks?</label>
                          </div>
                          <div style={{ width: '150px' }}>
                            {renderYesNo('lpgQualifiedOperators' , 'form-check')}
                          </div>
                        </div>

                        {/* d */}
                        <div className="d-flex align-items-center mb-3">
                          <div className="me-3" style={{ width: '700px' }}>
                            <label className="form-label mb-0">
                              d] How many feet separate the storage tank from adjacent buildings & vehicles?
                            </label>
                          </div>
                          <div style={{ maxWidth: '200px' }}>
                            <div className="input-group">
                              <input
                                name="lpgDistance"
                                value={formData.lpgDistance}
                                onChange={handleChange}
                                className="form-control"
                              />
                              <span className="input-group-text">Feet</span>
                            </div>
                          </div>
                        </div>

                        {/* e */}
                        <div className="d-flex align-items-center mb-3">
                          <div className="me-3" style={{ width: '700px' }}>
                            <label className="form-label mb-0">
                              e] How many gallons are sold annually?
                            </label>
                          </div>
                          <div style={{ maxWidth: '200px' }}>
                            <div className="input-group">
                              <input
                                name="lpgGallons"
                                value={formData.lpgGallons}
                                onChange={handleChange}
                                className="form-control"
                              />
                              <span className="input-group-text">Gallons</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                      {/* 5. BREAKDOWN OF WORK */}
                      <h5 className="mt-4">5. Breakdown of Work Performed (must total 100%):</h5>
                      <div className="row mb-3">
                        <div className="col-md-6 mb-2">
                          <label className="form-label">
                            Kitchen Appliances / Electric / Heating / Air Conditioning (%):
                          </label>
                          <input
                            name="workKitchen"
                            className="form-control"
                            value={formData.workKitchen}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6 mb-2">
                          <label className="form-label">Siding / Awnings / Pull-Outs (%):</label>
                          <input name="workSiding" className="form-control" value={formData.workSiding} onChange={handleChange} />
                        </div>
                        <div className="col-md-6 mb-2">
                          <label className="form-label">Flooring (%):</label>
                          <input name="workFlooring" className="form-control" value={formData.workFlooring} onChange={handleChange} />
                        </div>
                        <div className="col-md-6 mb-2">
                          <label className="form-label">Trailer Hitch Installation (%):</label>
                          <input name="workHitch" className="form-control" value={formData.workHitch} onChange={handleChange} />
                        </div>
                        <div className="col-md-6 mb-2">
                          <label className="form-label">Plumbing (%):</label>
                          <input name="workPlumbing" className="form-control" value={formData.workPlumbing} onChange={handleChange} />
                        </div>
                        <div className="col-md-6 mb-2">
                          <label className="form-label">Vehicle Mechanics (brakes, engine, etc.) (%):</label>
                          <input name="workMechanics" className="form-control" value={formData.workMechanics} onChange={handleChange} />
                        </div>
                        <div className="col-md-6 mb-2">
                          <label className="form-label">Roofs (%):</label>
                          <input name="workRoofs" className="form-control" value={formData.workRoofs} onChange={handleChange} />
                        </div>
                        <div className="col-md-6 mb-2">
                          <label className="form-label">Welding (%):</label>
                          <input name="workWelding" className="form-control" value={formData.workWelding} onChange={handleChange} />
                        </div>
                          <div className="card border-primary mb-3" style={{ maxWidth: '100rem' }}>
                            <div className="card-header">Other Work Information</div>
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-6 mb-3">
                                  <label className="form-label">Other Description:</label>
                                  <input
                                    name="workOtherDescription"
                                    className="form-control"
                                    value={formData.workOtherDescription}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-md-6 mb-3">
                                  <label className="form-label">Other (%):</label>
                                  <input
                                    name="workOther"
                                    className="form-control"
                                    value={formData.workOther}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>

                      {/* 6. TECHNICIAN QUALIFICATIONS */}
                      <h5 className="mt-4">
                        6. If any Kitchen Appliances / Electrical / Heating / Air Conditioning exposure exists,
                        provide details of technician qualifications including experience, training and any certifications:
                      </h5>

                      <div className="mb-3">
                        <label className={`form-label ${formData.workKitchen.trim() !== '' ? 'text-danger' : ''}`}>
                          Technician Qualifications{formData.workKitchen.trim() !== '' && ' (required)'}
                        </label>
                        <textarea
                          name="techDetails"
                          className="form-control"
                          rows="3"
                          value={formData.techDetails}
                          onChange={handleChange}
                          placeholder="Describe experience, training, and certifications"
                          required={formData.workKitchen.trim() !== ''}
                        />
                      </div>

                      {/* 7. TRAILER HITCH INSTALLATION */}
                      <h5 className="mt-4">7. For trailer hitch installation:</h5>
                      <div className="mb-3">
                        <label className="form-label">a] What type?</label>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="hitchTypeBall" checked={formData.hitchTypeBall} onChange={handleChange} />
                          <label className="form-check-label">Ball Hitch</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="hitchTypeReceiver" checked={formData.hitchTypeReceiver} onChange={handleChange} />
                          <label className="form-check-label">Mounted Receivers</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="hitchType5th" checked={formData.hitchType5th} onChange={handleChange} />
                          <label className="form-check-label">5th Wheel</label>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">b] Are hitches always bolted to the frame?</label>
                        <div style={{ width: '150px' }}>
                              {renderYesNo('hitchesBolted' , 'form-check')}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">c] Is all welding done by a certified welder?</label>
                        <div style={{ width: '150px' }}>
                              {renderYesNo('weldingCertified' , 'form-check')}
                        </div>
                      </div>

                      {/* 8. RV TRADE SHOWS */}
                      <div className="row align-items-center mb-3">
                        <div className="col-md-10">
                          <h5 className="mb-0">8. Do you participate in RV Trade Shows?</h5>
                        </div>
                        <div className="col-md-2">
                          {renderYesNo('rvTradeShows')}
                        </div>
                      </div>

                      {formData.rvTradeShows === 'Yes' && (
                        <div className="ms-5">
                          {/* a */}
                          <div className="d-flex align-items-center mb-3">
                            <div className="me-3" style={{ width: '700px' }}>
                              <label className="form-label mb-0">
                                a] Do you drive your owned RV(s) to the trade shows?
                              </label>
                            </div>
                            <div style={{ width: '150px' }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="tradeShowDrive"
                                  checked={formData.tradeShowDrive}
                                  onChange={handleChange}
                                  id="tradeShowDrive"
                                />
                                <label className="form-check-label" htmlFor="tradeShowDrive">Yes</label>
                              </div>
                            </div>
                          </div>

                          {/* b & c — nested under a */}
                          {formData.tradeShowDrive && (
                            <div className="ms-4">
                              {/* b */}
                              <div className="d-flex align-items-center mb-3">
                                <div className="me-3" style={{ width: '650px' }}>
                                  <label className="form-label mb-0">
                                    b] What is the furthest distance traveled?
                                  </label>
                                </div>
                                <div style={{ maxWidth: '200px' }}>
                                  <div className="input-group">
                                    <input
                                      name="tradeShowDistance"
                                      value={formData.tradeShowDistance}
                                      onChange={handleChange}
                                      className="form-control"
                                    />
                                    <span className="input-group-text">Miles</span>
                                  </div>
                                </div>
                              </div>

                              {/* c */}
                              <div className="d-flex align-items-center mb-3">
                                <div className="me-3" style={{ width: '650px' }}>
                                  <label className="form-label mb-0">
                                    c] How many RVs do you take to the trade shows?
                                  </label>
                                </div>
                                <div style={{ maxWidth: '200px' }}>
                                  <div className="input-group">
                                    <input
                                      name="tradeShowCount"
                                      value={formData.tradeShowCount}
                                      onChange={handleChange}
                                      className="form-control"
                                    />
                                    <span className="input-group-text">RVs</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 9. ANNUAL SALES */}
                      <h5 className="mt-4">9. What are your annual sales to customers for each of these categories?</h5>
                      <div className="row mb-3">
                        <div className="col-md-6 mb-2">
                          <label className="form-label">Accessories ($):</label>
                          <input name="salesAccessories" className="form-control" value={formData.salesAccessories} onChange={handleChange} />
                        </div>
                        <div className="col-md-6 mb-2">
                          <label className="form-label">Parts ($):</label>
                          <input name="salesParts" className="form-control" value={formData.salesParts} onChange={handleChange} />
                        </div>
                        <div className="col-md-6 mb-2">
                          <label className="form-label">Camping Gear ($):</label>
                          <input name="salesCampingGear" className="form-control" value={formData.salesCampingGear} onChange={handleChange} />
                        </div>
                        <div className="col-md-6 mb-2">
                          <label className="form-label">Groceries & Supplies ($):</label>
                          <input name="salesGroceries" className="form-control" value={formData.salesGroceries} onChange={handleChange} />
                        </div>
                      </div>

                      {/* 10. PERSONAL USE */}
                      <div className="row align-items-center mb-3 mt-4">
                        <div className="col-md-10">
                          <h5 className="mb-0">10. Is there any personal use of owned RVs?</h5>
                        </div>
                        <div className="col-md-2">
                          {renderYesNo('personalUse')}
                        </div>
                      </div>

                      {/* 11. RV DELIVERY */}
                      <div className="row align-items-center mb-3 mt-4">
                        <div className="col-md-10">
                          <h5 className="mb-0">11. Do you deliver RVs to your customers after sale?</h5>
                        </div>
                        <div className="col-md-2">
                          {renderYesNo('delivery')}
                        </div>
                      </div>

                      {formData.delivery === 'Yes' && (
                        <div className="ms-5">
                          {/* a */}
                          <div className="d-flex align-items-center mb-3">
                            <div className="me-3" style={{ width: '700px' }}>
                              <label className="form-label mb-0">a] How far one-way for longest trip?</label>
                            </div>
                            <div style={{ maxWidth: '200px' }}>
                              <div className="input-group">
                                <input
                                  name="deliveryDistance"
                                  className="form-control"
                                  value={formData.deliveryDistance}
                                  onChange={handleChange}
                                />
                                <span className="input-group-text">(road miles)</span>
                              </div>
                            </div>
                          </div>

                          {/* b */}
                          <div className="mb-3">
                            <label className="form-label">b] Description of delivery process (check all that apply):</label>
                            <p className="form-text">How are they transported?</p>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="deliveryTowed"
                                checked={formData.deliveryTowed}
                                onChange={handleChange}
                                id="deliveryTowed"
                              />
                              <label className="form-check-label" htmlFor="deliveryTowed">
                                Towed by Insured/Employees
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="deliveryDriven"
                                checked={formData.deliveryDriven}
                                onChange={handleChange}
                                id="deliveryDriven"
                              />
                              <label className="form-check-label" htmlFor="deliveryDriven">
                                Driven by Insured/Employees
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="deliveryTransporter"
                                checked={formData.deliveryTransporter}
                                onChange={handleChange}
                                id="deliveryTransporter"
                              />
                              <label className="form-check-label" htmlFor="deliveryTransporter">
                                Hired Transporter
                              </label>
                            </div>
                          </div>

                          {/* Subsection if towed */}
                          {formData.deliveryTowed && (
                            <div className="ms-4">
                              <div className="mb-3">
                                <label className="form-label">What vehicle is used to tow these units?</label>
                                <input
                                  name="towVehicle"
                                  className="form-control"
                                  value={formData.towVehicle}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="d-flex align-items-center mb-3">
                                <div className="me-3" style={{ width: '700px' }}>
                                  <label className="form-label mb-0">Is the towing vehicle covered elsewhere?</label>
                                </div>
                                <div style={{ width: '150px' }}>
                                  {renderYesNo('towingCovered' , 'form-check')}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Subsection if driven */}
                          {formData.deliveryDriven && (
                            <div className="ms-4">
                              <div className="mb-3">
                                <label className="form-label">How does Insured/Employee driver return?</label>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="returnVehicleTowed"
                                    checked={formData.returnVehicleTowed}
                                    onChange={handleChange}
                                    id="returnVehicleTowed"
                                  />
                                  <label className="form-check-label" htmlFor="returnVehicleTowed">
                                    Return vehicle towed behind RV
                                  </label>
                                </div>
                              </div>

                              <div className="d-flex align-items-center mb-3">
                                <div className="me-3" style={{ width: '700px' }}>
                                  <label className="form-label mb-0">Is the return vehicle operated on your dealer plate?</label>
                                </div>
                                <div style={{ width: '150px' }}>
                                  {renderYesNo('dealerPlate'  , 'form-check')}
                                </div>
                              </div>

                              <div className="mb-3">
                                <label className="form-label">Other (describe):</label>
                                <input
                                  name="otherReturn"
                                  className="form-control"
                                  value={formData.otherReturn}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}


                      <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-lg">Submit Application</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;