const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function extractFormFields(filePath) {
  const pdfBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const form = pdfDoc.getForm();
  const fields = form.getFields();

  console.log('📋 List of Form Fields:\n');

  fields.forEach(field => {
  const type = field.constructor.name;
  const name = field.getName();
  console.log(`${type}: ${name}`);

  if (type === 'PDFRadioGroup') {
    console.log(` → options: ${field.getOptions().join(', ')}`);
  }
});

}

// Run the function with the correct relative path
extractFormFields('./frontend/public/RV Questionnaire.pdf');
