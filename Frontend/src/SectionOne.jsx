import React, { useRef, useState, useEffect } from 'react';

function SectionOne({ formData, setFormData, setSectionOneComplete }) {
  const [signatureMode, setSignatureMode] = useState('upload'); 
  const [drawing, setDrawing] = useState(false); 
  const canvasRef = useRef(null);

  useEffect(() => {
    if (signatureMode === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Set canvas dimensions
      canvas.width = 500;
      canvas.height = 150;
      
      // Set drawing style
      ctx.lineCap = 'round';
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#000';
    }
  }, [signatureMode]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'file' ? files[0] : value 
    });
  };

  const startDrawing = (e) => {
    if (signatureMode !== 'draw') return;
    setDrawing(true);

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const drawOnCanvas = (e) => {
    if (!drawing || signatureMode !== 'draw') return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setDrawing(false);
    canvasRef.current?.getContext('2d')?.beginPath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setFormData({ 
      ...formData, 
      signatureDataURL: '',
      signatureSaved: false 
    });
  };

  const saveCanvasAsImage = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    setFormData({ 
      ...formData, 
      signatureFile: null, // Clear uploaded file when drawing
      signatureDataURL: dataURL,
      signatureSaved: true 
    });
    alert('Signature saved.');
  };

  const handleContinue = (e) => {
    e.preventDefault();
    const { businessName, date, signatureFile, signatureDataURL } = formData;

    if (!businessName || !date || (!signatureFile && !signatureDataURL)) {
      alert('Please fill in all fields and provide a signature.');
      return;
    }

    setSectionOneComplete(true);
  };

  return (
    <div className="card border-primary mb-4">
      <div className="card-body">
        <div className="alert alert-warning p-4 rounded shadow-sm">
          <h5 className="mb-3 text-uppercase fw-bold text-danger">Important Notice</h5>
          <p className="mb-2">
            Please complete the following information and provide your signature before continuing.
          </p>
          <p className="mb-0">
            By completing this application, the applicant is applying for coverage with either <strong>Colony Insurance Company</strong>, <strong>Colony Specialty Insurance Company</strong>, or <strong>Argonaut Insurance Company / Argonaut Midwest Insurance Company</strong>.
          </p>
        </div>

        <form onSubmit={handleContinue}>
          <div className="mb-4">
            <label className="form-label fw-bold">
              Business Trade Name: <span className="text-danger">*</span>
            </label>
            <input
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="form-control form-control-lg"
              placeholder="Enter your business trade name"
              required
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
                className="form-control form-control-lg"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Signature: <span className="text-danger">*</span></label>
              <div className="btn-group mb-3" role="group">
                <button 
                  type="button" 
                  className={`btn btn-sm ${signatureMode === 'upload' ? 'btn-primary' : 'btn-outline-primary'}`} 
                  onClick={() => setSignatureMode('upload')}
                >
                  Upload
                </button>
                <button 
                  type="button" 
                  className={`btn btn-sm ${signatureMode === 'draw' ? 'btn-primary' : 'btn-outline-primary'}`} 
                  onClick={() => setSignatureMode('draw')}
                >
                  Draw
                </button>
              </div>

              {signatureMode === 'upload' && (
                <div className="border rounded p-2 bg-light">
                  <input
                    className="form-control"
                    type="file"
                    name="signatureFile"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  {formData.signatureFile && (
                    <div className="mt-2 text-success">✓ Signature uploaded: {formData.signatureFile.name}</div>
                  )}
                </div>
              )}

              {signatureMode === 'draw' && (
                <div style={{ width: '100%', maxWidth: '500px' }}>
                  <canvas
                    ref={canvasRef}
                    width={500}
                    height={150}
                    style={{ 
                      border: '1px solid #ccc', 
                      width: '100%', 
                      cursor: 'crosshair',
                      backgroundColor: '#fff'
                    }}
                    onMouseDown={startDrawing}
                    onMouseMove={drawOnCanvas}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                  />

                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={clearCanvas}
                      >
                        Clear
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-success btn-sm"
                        onClick={saveCanvasAsImage}
                      >
                        Save Drawing
                      </button>
                    </div>

                    <div className={`small ${formData.signatureDataURL ? 'text-success' : 'text-muted'}`}>
                      {formData.signatureDataURL ? '✓ Signature saved' : ''}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">Continue to Business Details →</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SectionOne;