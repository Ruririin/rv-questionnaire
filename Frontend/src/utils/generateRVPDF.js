import { PDFDocument } from 'pdf-lib';
import download from 'downloadjs';

export const generateRVPDF = async (formData) => {
  try {
    const existingPdfBytes = await fetch('/RV Questionnaire.pdf').then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    // === Fill Business Name and Date ===
    form.getTextField('Business Trade Name')?.setText(formData.businessName || '');
    form.getTextField('DATE')?.setText(formData.date || '');

    // === Question 1: Do you rent RVs to others? ===
    const rentRVsGroup = form.getRadioGroup('undefined');
    if (formData.rentRVs === 'Yes') {
      rentRVsGroup?.select('Yes');
    } else if (formData.rentRVs === 'No') {
      rentRVsGroup?.select('No');
    }

    // === Question 1a–b: Fill ONLY if rentRVs === 'Yes' ===
    if (formData.rentRVs === 'Yes') {
      const insuredGroup = form.getRadioGroup('undefined_2-2'); // corrected
      const inventoryGroup = form.getRadioGroup('undefined_2-3');

      if (formData.rentRVsInsured === 'Yes') {
        insuredGroup?.select('Yes_2');
      } else if (formData.rentRVsInsured === 'No') {
        insuredGroup?.select('No_2');
      }

      if (formData.rentRVsInventory === 'Yes') {
        inventoryGroup?.select('Yes_3');
      } else if (formData.rentRVsInventory === 'No') {
        inventoryGroup?.select('No_3');
      }
    }

    // === Question 2: Do you rent RV storage space to customers? ===
    const rentStorageGroup = form.getRadioGroup('undefined_2-4');
    if (formData.rentStorage === 'Yes') {
      rentStorageGroup?.select('Yes_4');
    } else if (formData.rentStorage === 'No') {
      rentStorageGroup?.select('No_4');
    }

    // === Question 3: Do you operate an RV park? ===
    const rvParkGroup = form.getRadioGroup('undefined_2-5');
    if (formData.operateRVPark === 'Yes') {
      rvParkGroup?.select('Yes_5');
    } else if (formData.operateRVPark === 'No') {
      rvParkGroup?.select('No_5');
    }

    // === Question 3a: Do you have GL Coverage in place for these operations? ===
    if (formData.operateRVPark === 'Yes') {
      const glCoverageGroup = form.getRadioGroup('undefined_2-6');
      if (formData.rvParkGLCoverage === 'Yes') {
        glCoverageGroup?.select('Yes_6');
      } else if (formData.rvParkGLCoverage === 'No') {
        glCoverageGroup?.select('No_6');
      }
    }

    // === Question 4: Do you sell LPG? ===
    const sellLPGGroup = form.getRadioGroup('undefined_2-7');
    if (formData.sellLPG === 'Yes') {
      sellLPGGroup?.select('Yes_7');
    } else if (formData.sellLPG === 'No') {
      sellLPGGroup?.select('No_7');
    }

    if (formData.sellLPG === 'Yes') {
      const barrierGroup = form.getRadioGroup('undefined_2-8');
      const noSmokingGroup = form.getRadioGroup('undefined_2-9');
      const qualifiedOpGroup = form.getRadioGroup('undefined_2-10');

      if (formData.lpgCollisionBarriers === 'Yes') {
        barrierGroup?.select('Yes_8');
      } else if (formData.lpgCollisionBarriers === 'No') {
        barrierGroup?.select('No_8');
      }

      if (formData.lpgNoSmoking === 'Yes') {
        noSmokingGroup?.select('Yes_9');
      } else if (formData.lpgNoSmoking === 'No') {
        noSmokingGroup?.select('No_9');
      }

      if (formData.lpgQualifiedOperators === 'Yes') {
        qualifiedOpGroup?.select('Yes_10');
      } else if (formData.lpgQualifiedOperators === 'No') {
        qualifiedOpGroup?.select('No_10');
      }

      form.getTextField('How many feet separate storage tank from adjacent buildings  vehicles')
        ?.setText(formData.lpgDistance || '');
      form.getTextField('How many gallons are sold annually')
        ?.setText(formData.lpgGallons || '');
    }

    // === Question 5: Breakdown of Work ===
    form.getTextField('Text1.0.0')?.setText(formData.workKitchen || '');
    form.getTextField('Text1.0.1')?.setText(formData.workSiding || '');
    form.getTextField('Text1.1.0')?.setText(formData.workFlooring || '');
    form.getTextField('Text1.1.1')?.setText(formData.workHitch || '');
    form.getTextField('Text1.2.0')?.setText(formData.workPlumbing || '');
    form.getTextField('Text1.2.1')?.setText(formData.workMechanics || '');
    form.getTextField('Text1.3.0')?.setText(formData.workRoofs || '');
    form.getTextField('Text1.3.1')?.setText(formData.workWelding || '');
    form.getTextField('Text1.4.0')?.setText(formData.workOther || '');
    form.getTextField('Other describe')?.setText(formData.workOtherDescription || '');

    // === Question 6: Technician Qualifications ===
    form.getTextField('undefined_3')?.setText(formData.techDetails || '');

    // === Question 7a: What type of hitch? (checkboxes)
    if (formData.hitchTypeBall) {
      form.getCheckBox('Ball Hitch')?.check();
    }
    if (formData.hitchTypeReceiver) {
      form.getCheckBox('Mounted Receivers')?.check();
    }
    if (formData.hitchType5th) {
      form.getCheckBox('5th Wheel')?.check();
    }

    // === Question 7b: Are hitches always bolted to the frame? (radio)
    const boltedGroup = form.getRadioGroup('undefined_4');
    if (formData.hitchesBolted === 'Yes') {
      boltedGroup?.select('Yes_11');
    } else if (formData.hitchesBolted === 'No') {
      boltedGroup?.select('No_11');
    }

    // === Question 7c: Is welding done by a certified welder? (radio)
    const certifiedGroup = form.getRadioGroup('undefined_5');
    if (formData.weldingCertified === 'Yes') {
      certifiedGroup?.select('Yes_12');
    } else if (formData.weldingCertified === 'No') {
      certifiedGroup?.select('No_12');
    }

    // === Question 8: Do you participate in RV Trade Shows? ===
    const tradeShowGroup = form.getRadioGroup('undefined_6');
    if (formData.rvTradeShows === 'Yes') {
      tradeShowGroup?.select('Yes_13');
    } else if (formData.rvTradeShows === 'No') {
      tradeShowGroup?.select('No_13');
    }

    // === Question 8a: Do you drive your RV(s) to trade shows? ===
    const tradeShowDriveGroup = form.getRadioGroup('undefined_7'); 
    if (formData.tradeShowDrive === 'Yes') {
      tradeShowDriveGroup?.select('Yes_14'); 
    } else if (formData.tradeShowDrive === 'No') {
      tradeShowDriveGroup?.select('No_14'); 
    }

    // === Question 8b/c: Distance + Count
    form.getTextField('If Yes what is the furthest distance traveled')?.setText(formData.tradeShowDistance || '');
    form.getTextField('How many RVs do you take to the trade shows')?.setText(formData.tradeShowCount || '');

    // === Question 9: Annual Sales ===
    form.getTextField('fill_6')?.setText(formData.salesAccessories || '');
    form.getTextField('fill_7')?.setText(formData.salesParts || '');
    form.getTextField('fill_8')?.setText(formData.salesCampingGear || '');
    form.getTextField('fill_9')?.setText(formData.salesGroceries || '');

    // === Question 10: Is there any personal use of owned RVs? ===
    const personalUseGroup = form.getRadioGroup('undefined_8-15');
    if (formData.personalUse === 'Yes') {
      personalUseGroup?.select('Yes_15');
    } else if (formData.personalUse === 'No') {
      personalUseGroup?.select('No_15');
    }

    // === Question 11: Do you deliver RVs to your customers after sale? ===
    const deliveryGroup = form.getRadioGroup('undefined_8-16');
    if (formData.delivery === 'Yes') {
      deliveryGroup?.select('Yes_16');
    } else if (formData.delivery === 'No') {
      deliveryGroup?.select('No_16');
    }
    
    // a] Longest trip distance
    form.getTextField('How far oneway for longest trip')?.setText(formData.deliveryDistance || '');

    // b] Delivery process
    if (formData.deliveryTowed) {
      form.getCheckBox('Towed by InsuredEmployees')?.check();
    }
    if (formData.deliveryDriven) {
      form.getCheckBox('Driven by InsuredEmployees')?.check();
    }
    if (formData.deliveryTransporter) {
      form.getCheckBox('Hired Transporter')?.check();
    }

    // b-1] If Towed
    if (formData.deliveryTowed) {
      form.getTextField('What vehicle is used to tow these units')?.setText(formData.towVehicle || '');

      const towingCoveredGroup = form.getRadioGroup('undefined_9'); 
      if (formData.towingCovered === 'Yes') {
        towingCoveredGroup?.select('Yes_17');
      } else if (formData.towingCovered === 'No') {
        towingCoveredGroup?.select('No_17');
      }
    }

    // b-2] If Driven
    if (formData.deliveryDriven) {
      if (formData.returnVehicleTowed) {
        form.getCheckBox('Return vehicle towed behind RV')?.check();
      }

      if (formData.otherReturn?.trim()) {
        form.getCheckBox('Other describe_2')?.check();
      }

      const dealerPlateGroup = form.getRadioGroup('undefined_10');
      if (formData.dealerPlate === 'Yes') {
        dealerPlateGroup?.select('Yes_18');
      } else if (formData.dealerPlate === 'No') {
        dealerPlateGroup?.select('No_18');
      }
    }

    form.getTextField('Is the return vehicle operated on your dealer plate')?.setText(formData.otherReturn || '');

    // === SIGNATURE EMBEDDING LOGIC ===
    const pages = pdfDoc.getPages();
    const signaturePage = pages[1]; // Second page (index 1)

    // Helper function to remove background from canvas signature
    const removeBackgroundFromCanvas = (canvas) => {
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Remove white/light backgrounds
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If pixel is close to white, make it transparent
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0; // Set alpha to 0 (transparent)
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      return canvas.toDataURL('image/png');
    };

    const embedSignature = async (sigBytes, isUpload = false) => {
      try {
        const sigImg = await pdfDoc.embedPng(sigBytes);
        
        // Make signatures much smaller - adjust these values as needed
        const sigDims = sigImg.scale(isUpload ? 0.07 : 0.25);
        
        // Coordinates for the signature box at the bottom of page 2
        const coords = isUpload ? { x: 200, y: 206 } : { x: 200, y: 215 };
        
        signaturePage.drawImage(sigImg, {
          x: coords.x,
          y: coords.y,
          width: sigDims.width,
          height: sigDims.height,
        });
      } catch (error) {
        console.error('Error embedding signature:', error);
      }
    };

    // Handle uploaded signature file
    if (formData.signatureFile) {
      const sigBytes = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(formData.signatureFile);
      });
      await embedSignature(sigBytes, true);
    }

    // Handle drawn signature (canvas data URL) with background removal
    if (formData.signatureDataURL) {
      try {
        // Create a temporary canvas to process the signature
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        const processedSignature = await new Promise((resolve, reject) => {
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            // Remove background
            const processedDataURL = removeBackgroundFromCanvas(canvas);
            resolve(processedDataURL);
          };
          img.onerror = reject;
          img.src = formData.signatureDataURL;
        });
        
        const sigBytes = await fetch(processedSignature).then(res => res.arrayBuffer());
        await embedSignature(sigBytes);
      } catch (error) {
        console.error('Error processing signature:', error);
        // Fallback to original signature if processing fails
        const sigBytes = await fetch(formData.signatureDataURL).then(res => res.arrayBuffer());
        await embedSignature(sigBytes);
      }
    }

    // === Flatten the form ===
    form.flatten();

    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, 'RV_Questionnaire_Filled.pdf', 'application/pdf');

    console.log('📥 PDF generated and downloaded with signature!');

  } catch (err) {
    console.error('Error generating PDF:', err);
    alert('There was an error generating the PDF. Please try again.');
  }
};