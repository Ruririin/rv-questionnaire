
export const initialFormData = {
  businessName: '',
  date: '',
  signatureSaved: false,
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
};


export const renderYesNo = (name, formData, handleChange, style = 'buttons') => {
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
          <label className="form-check-label" htmlFor={`${name}-yes`}>Yes</label>
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
          <label className="form-check-label" htmlFor={`${name}-no`}>No</label>
        </div>
      </div>
    );
  }

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
      <label className="btn btn-outline-primary" htmlFor={`${name}-yes`}>Yes</label>

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
      <label className="btn btn-outline-primary" htmlFor={`${name}-no`}>No</label>
    </div>
  );
};

export const validateWorkBreakdown = (formData) => {
  const {
    workKitchen, workSiding, workFlooring, workHitch,
    workPlumbing, workMechanics, workRoofs, workWelding,
    workOther, workOtherDescription
  } = formData;

  const toNumber = val => parseFloat(val) || 0;

  const mainTotal =
    toNumber(workKitchen) +
    toNumber(workSiding) +
    toNumber(workFlooring) +
    toNumber(workHitch) +
    toNumber(workPlumbing) +
    toNumber(workMechanics) +
    toNumber(workRoofs) +
    toNumber(workWelding);

  const otherIncluded = workOtherDescription.trim() !== '' || workOther.trim() !== '';
  const totalWithOther = mainTotal + (otherIncluded ? toNumber(workOther) : 0);

  return totalWithOther === 100;
};
