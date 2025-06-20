import React, { useState } from 'react';
import { renderYesNo, validateWorkBreakdown } from './utils/formHelpers.jsx';
import { generateRVPDF } from './utils/generateRVPDF.js';



function SectionTwo({ formData, setFormData, setSectionOneComplete }) {

  const [showModal, setShowModal] = useState(false);
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

    const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateWorkBreakdown(formData)) {
        alert('Total work breakdown must equal 100%.');
        return;
    }

    if (formData.workKitchen && formData.techDetails.trim() === '') {
        alert('Please describe technician qualifications for Kitchen/Electrical work.');
        return;
    }

    setShowModal(true);

    console.log('Form submitted:', formData);
    };

    const handleDownloadPDF = () => {
    alert('Download PDF triggered (hook up PDF-lib here)');
    };


  return (
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
              <h5 className="mb-0">1. Do you rent RVs to customers?</h5>
            </div>
            <div className="col-md-2">{renderYesNo('rentRVs', formData, handleChange)}</div>
          </div>

          {formData.rentRVs === 'Yes' && (
            <div className="ms-5">
              <div className="d-flex align-items-center mb-3">
                <div className="me-3" style={{ width: '700px' }}>
                  <label className="form-label mb-0">a] Are rental vehicles separately insured?</label>
                </div>
                <div style={{ width: '150px' }}>
                  {renderYesNo('rentRVsInsured', formData, handleChange, 'form-check')}
                </div>
              </div>

              <div className="d-flex align-items-center mb-3">
                <div className="me-3" style={{ width: '700px' }}>
                  <label className="form-label mb-0">b] Are rental units part of inventory held for sale?</label>
                </div>
                <div style={{ width: '150px' }}>
                  {renderYesNo('rentRVsInventory', formData, handleChange, 'form-check')}
                </div>
              </div>
            </div>
          )}

          {/* 2. STORAGE */}
          <div className="row align-items-center mb-3">
            <div className="col-md-10">
              <h5 className="mb-0">2. Do you rent RV storage space to customers?</h5>
            </div>
            <div className="col-md-2">{renderYesNo('rentStorage', formData, handleChange)}</div>
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

          {/* 3. RV PARK */}
          <div className="row align-items-center mb-3">
            <div className="col-md-10">
              <h5 className="mb-0">3. Do you operate an RV park / campground?</h5>
            </div>
            <div className="col-md-2">{renderYesNo('operateRVPark', formData, handleChange)}</div>
          </div>

          {formData.operateRVPark === 'Yes' && (
            <div className="ms-5 mb-3 d-flex align-items-center">
              <div className="me-3" style={{ width: '700px' }}>
                <label className="form-label mb-0">
                  Do you have GL Coverage in place for these operations?
                </label>
              </div>
              <div style={{ width: '150px' }}>
                {renderYesNo('rvParkGLCoverage', formData, handleChange, 'form-check')}
              </div>
            </div>
          )}

          {/* 4. LPG SALES */}
          <div className="row align-items-center mb-3">
            <div className="col-md-10">
              <h5 className="mb-0">4. Do you sell Liquefied Petroleum Gas (LPG)?</h5>
            </div>
            <div className="col-md-2">{renderYesNo('sellLPG', formData, handleChange)}</div>
          </div>

          {formData.sellLPG === 'Yes' && (
            <div className="ms-5">
              {[
                ['lpgCollisionBarriers', 'a] Is the storage tank protected by collision barriers?'],
                ['lpgNoSmoking', 'b] Are "No Smoking" signs posted?'],
                ['lpgQualifiedOperators', 'c] Do only qualified operators fill customer\'s tanks?']
              ].map(([key, label]) => (
                <div className="d-flex align-items-center mb-3" key={key}>
                  <div className="me-3" style={{ width: '700px' }}>
                    <label className="form-label mb-0">{label}</label>
                  </div>
                  <div style={{ width: '150px' }}>
                    {renderYesNo(key, formData, handleChange, 'form-check')}
                  </div>
                </div>
              ))}

              <div className="d-flex align-items-center mb-3">
                <div className="me-3" style={{ width: '700px' }}>
                  <label className="form-label mb-0">
                    d] How many feet separate the storage tank from adjacent buildings & vehicles?
                  </label>
                </div>
                <div style={{ maxWidth: '200px' }}>
                  <div className="input-group">
                    <input
                        type="number"
                        name="lpgDistance"
                        value={formData.lpgDistance}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="0"
                        min="0"
                        max="9999999999"
                        inputMode="numeric"
                        />
                    <span className="input-group-text">Feet</span>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center mb-3">
                <div className="me-3" style={{ width: '700px' }}>
                  <label className="form-label mb-0">e] How many gallons are sold annually?</label>
                </div>
                <div style={{ maxWidth: '200px' }}>
                  <div className="input-group">
                    <input
                        type="number"
                        name="lpgGallons"
                        value={formData.lpgGallons}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="0"
                        min="0"
                        max="9999999999"
                        inputMode="numeric"
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
                    {[
                        ['workKitchen', 'Kitchen Appliances / Electric / Heating / Air Conditioning'],
                        ['workSiding', 'Siding / Awnings / Pull-Outs'],
                        ['workFlooring', 'Flooring'],
                        ['workHitch', 'Trailer Hitch Installation'],
                        ['workPlumbing', 'Plumbing'],
                        ['workMechanics', 'Vehicle Mechanics (brakes, engine, etc.)'],
                        ['workRoofs', 'Roofs'],
                        ['workWelding', 'Welding']
                    ].map(([name, label]) => (
                        <div className="col-md-6 mb-2" key={name}>
                        <label className="form-label">{label} (%)</label>
                        <div className="input-group">
                            <input
                            type="number"
                            name={name}
                            min="0"
                            max="100"
                            step="1"
                            className="form-control"
                            value={formData[name]}
                            onChange={handleChange}
                            placeholder="0"
                            />
                            <span className="input-group-text">%</span>
                        </div>
                        </div>
                    ))}

                    <div className="card border-primary mb-3 mt-2" style={{ maxWidth: '100rem' }}>
                        <div className="card-header">Other Work Information</div>
                        <div className="card-body row">
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
                            <label className="form-label">Other (%)</label>
                            <div className="input-group">
                            <input
                                type="number"
                                name="workOther"
                                min="0"
                                max="100"
                                step="1"
                                className="form-control"
                                value={formData.workOther}
                                onChange={handleChange}
                                placeholder="0"
                            />
                            <span className="input-group-text">%</span>
                            </div>
                        </div>
                        </div>
                    </div>

                    {!validateWorkBreakdown(formData) && (
                        <div className="alert alert-danger">
                        The total breakdown percentage must equal 100%. Please check your inputs.
                        </div>
                    )}
                    </div>

          {/* 6. TECH QUALIFICATIONS */}
          <h5 className="mt-4">
            6. If any Kitchen Appliances / Electrical / Heating / Air Conditioning exposure exists, provide technician details:
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
            <div className="row mb-3">
            {/* Column A */}
            <div className="col-md-4">
                <label className="form-label">a] What type?</label>
                {[
                ['hitchTypeBall', 'Ball Hitch'],
                ['hitchTypeReceiver', 'Mounted Receivers'],
                ['hitchType5th', '5th Wheel']
                ].map(([name, label]) => (
                <div className="form-check" key={name}>
                    <input
                    className="form-check-input"
                    type="checkbox"
                    name={name}
                    checked={formData[name]}
                    onChange={handleChange}
                    />
                    <label className="form-check-label">{label}</label>
                </div>
                ))}
            </div>

            {/* Column B */}
            <div className="col-md-4">
                <label className="form-label">b] Are hitches always bolted to the frame?</label>
                <div style={{ width: '100%' }}>
                {renderYesNo('hitchesBolted', formData, handleChange, 'form-check')}
                </div>
            </div>

            {/* Column C */}
            <div className="col-md-4">
                <label className="form-label">c] Is all welding done by a certified welder?</label>
                <div style={{ width: '100%' }}>
                {renderYesNo('weldingCertified', formData, handleChange, 'form-check')}
                </div>
            </div>
            </div>

          {/* 8. TRADE SHOWS */}
          <div className="row align-items-center mb-3">
            <div className="col-md-10">
              <h5 className="mb-0">8. Do you participate in RV Trade Shows?</h5>
            </div>
            <div className="col-md-2">
              {renderYesNo('rvTradeShows', formData, handleChange)}
            </div>
          </div>

          {formData.rvTradeShows === 'Yes' && (
            <div className="ms-5">
              <div className="d-flex align-items-center mb-3">
                <div className="me-3" style={{ width: '700px' }}>
                  <label className="form-label mb-0">
                    a] Do you drive your owned RV(s) to the trade shows?
                  </label>
                </div>
                <div style={{ width: '150px' }}>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tradeShowDrive"
                      id="tradeShowDriveYes"
                      value="Yes"
                      checked={formData.tradeShowDrive === 'Yes'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="tradeShowDriveYes">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tradeShowDrive"
                      id="tradeShowDriveNo"
                      value="No"
                      checked={formData.tradeShowDrive === 'No'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="tradeShowDriveNo">No</label>
                  </div>
                </div>
              </div>

              {formData.tradeShowDrive === 'Yes' && (
                <div className="ms-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3" style={{ width: '650px' }}>
                      <label className="form-label mb-0">b] What is the furthest distance traveled?</label>
                    </div>
                    <div style={{ maxWidth: '200px' }}>
                        <div className="input-group">
                            <input
                            type="number"
                            name="tradeShowDistance"
                            value={formData.tradeShowDistance}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="0"
                            min="0"
                            max="9999999999"
                            inputMode="numeric"
                            />
                            <span className="input-group-text">Miles</span>
                        </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3" style={{ width: '650px' }}>
                      <label className="form-label mb-0">c] How many RVs do you take to the trade shows?</label>
                    </div>
                    <div style={{ maxWidth: '200px' }}>
                        <div className="input-group">
                            <input
                            type="number"
                            name="tradeShowCount"
                            value={formData.tradeShowCount}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="0"
                            min="0"
                            max="9999999999"
                            inputMode="numeric"
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
          <h5 className="mt-4">9. What are your annual sales to customers?</h5>
          <div className="row mb-3">
            {[
              ['salesAccessories', 'Accessories ($)'],
              ['salesParts', 'Parts ($)'],
              ['salesCampingGear', 'Camping Gear ($)'],
              ['salesGroceries', 'Groceries & Supplies ($)']
             ].map(([name, label]) => (
                <div className="col-md-6 mb-3" key={name}>
                <label className="form-label">{label}</label>
                <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                    type="text"
                    name={name}
                    className="form-control"
                    value={formData[name]}
                    onChange={handleChange}
                    onBlur={(e) => {
                        const raw = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
                        const formatted = isNaN(raw) ? '' : raw.toFixed(2);
                        setFormData(prev => ({ ...prev, [name]: formatted }));
                    }}
                    inputMode="decimal"
                    placeholder="0.00"
                    />
                </div>
                </div>
            ))}
            </div>

          {/* 10. PERSONAL USE */}
          <div className="row align-items-center mb-3 mt-4">
            <div className="col-md-10">
              <h5 className="mb-0">10. Is there any personal use of owned RVs?</h5>
            </div>
            <div className="col-md-2">
              {renderYesNo('personalUse', formData, handleChange)}
            </div>
          </div>

          {/* 11. DELIVERY */}
            <div className="row align-items-center mb-3 mt-4">
            <div className="col-md-10">
                <h5 className="mb-0">11. Do you deliver RVs to your customers after sale?</h5>
            </div>
            <div className="col-md-2">{renderYesNo('delivery', formData, handleChange)}</div>
            </div>

            {formData.delivery === 'Yes' && (
            <div className="card border-info ms-3 mb-4">
                <div className="card-body">
                {/* a. Longest Trip Distance */}
                <div className="mb-4">
                    <label className="form-label fw-semibold">a] How far one-way for longest trip?</label>
                    <div className="input-group" style={{ maxWidth: '300px' }}>
                    <input
                        type="number"
                        name="deliveryDistance"
                        className="form-control"
                        value={formData.deliveryDistance}
                        onChange={handleChange}
                        min="0"
                        max="9999999999"
                        inputMode="numeric"
                        placeholder="0"
                    />
                    <span className="input-group-text">road miles</span>
                    </div>
                </div>

                {/* b. Delivery Process */}
                <div className="mb-4">
                    <label className="form-label fw-semibold">b] Description of delivery process:</label>
                    {[
                    ['deliveryTowed', 'Towed by Insured/Employees'],
                    ['deliveryDriven', 'Driven by Insured/Employees'],
                    ['deliveryTransporter', 'Hired Transporter']
                    ].map(([name, label]) => (
                    <div className="form-check" key={name}>
                        <input
                        className="form-check-input"
                        type="checkbox"
                        name={name}
                        checked={formData[name]}
                        onChange={handleChange}
                        />
                        <label className="form-check-label">{label}</label>
                    </div>
                    ))}
                </div>

                {/* b-1. If Towed */}
                {formData.deliveryTowed && (
                    <div className="ms-3 border-start ps-3 mb-4">
                    <h6 className="fw-bold">If Towed:</h6>
                    <div className="mb-3">
                        <label className="form-label">What vehicle is used to tow these units?</label>
                        <input
                        name="towVehicle"
                        className="form-control"
                        value={formData.towVehicle}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Is the towing vehicle covered elsewhere?</label>
                        {renderYesNo('towingCovered', formData, handleChange, 'form-check')}
                    </div>
                    </div>
                )}

                {/* b-2. If Driven */}
                {formData.deliveryDriven && (
                    <div className="ms-3 border-start ps-3">
                    <h6 className="fw-bold">If Driven:</h6>
                    <div className="mb-3">
                        <label className="form-label">How does Insured/Employee driver return?</label>
                        <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="returnVehicleTowed"
                            checked={formData.returnVehicleTowed}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Return vehicle towed behind RV</label>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Is the return vehicle operated on your dealer plate?</label>
                        {renderYesNo('dealerPlate', formData, handleChange, 'form-check')}
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
            </div>
            )}
          {/* Submit */}
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary btn-lg">
              Submit Application
            </button>
          </div>
          {/* Success Modal */}
            {showModal && (
            <div 
                className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
                style={{ 
                zIndex: 1055,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(2px)'
                }}
            >
                <div 
                className="bg-white rounded-3 shadow-lg" 
                style={{ 
                    maxWidth: '450px', 
                    width: '90%',
                    margin: '20px',
                    maxHeight: '90vh',
                    overflow: 'auto'
                }}
                >
                <div className="p-4">
                    <div className="text-center mb-4">
                    <div className="mb-3">
                        <svg 
                        width="64" 
                        height="64" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        className="text-success"
                        >
                        <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.1"/>
                        <path 
                            d="M9 12l2 2 4-4" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                        </svg>
                    </div>
                    <h4 className="mb-2 text-success">Submission Complete!</h4>
                    <p className="text-muted mb-0">
                        Your application has been submitted successfully.
                    </p>
                    </div>

                    <div className="d-grid gap-2 mb-3">
                    <button 
  onClick={() => generateRVPDF(formData)} 
  className="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2"
>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path 
      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <polyline 
      points="7,10 12,15 17,10" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <line 
      x1="12" y1="15" x2="12" y2="3" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
  <span>Download Filled PDF</span>
</button>

                    </div>

                    <div className="text-center">
                    <button 
                        onClick={() => setShowModal(false)} 
                        className="btn btn-outline-secondary"
                    >
                        Close
                    </button>
                    </div>
                </div>
                </div>
            </div>
            )}

        </form>
      </div>
    </div>
  );
}

export default SectionTwo;

