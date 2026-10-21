/**
 * Midterm API Project - COMP229
 * Implement the six equipment API endpoints described in README.md.
 * Use the array index as the ID: index 0 is the first equipment item.
 * Add exactly two personalized items to the five supplied below.
 */
import express from 'express';

const app = express();
app.use(express.json());

let equipment = [
  { name: 'USB Microphone', category: 'audio', brand: 'AudioLab', year: 2021, quantity: 5 },
  { name: 'LED Panel', category: 'lighting', brand: 'BrightWorks', year: 2022, quantity: 4 },
  { name: 'Network Switch', category: 'networking', brand: 'NetCore', year: 2020, quantity: 3 },
  { name: 'Cable Tester', category: 'tools', brand: 'TestPro', year: 2019, quantity: 6 },
  { name: 'Studio Headphones', category: 'audio', brand: 'SoundCraft', year: 2023, quantity: 8 },
  //Additional Equipment
  {
    name: 'T221 Display', 
    category: 'video', 
    brand: 'IBM', 
    year: 2001, 
    quantity: 7 
  },
  { 
    name: 'MX1000 Mouse',
    category: 'peripheral', 
    brand: 'Logitech', 
    year: 2004, 
    quantity: 9
  }
];

//Function used for post command to validate input
function isValidEquipment(data) {
  if (!data || typeof data !== 'object') return false;
  const { name, category, brand, year, quantity } = data;

  return (
    typeof name === 'string' &&
    typeof category === 'string' &&
    typeof brand === 'string' &&
    Number.isInteger(year) && year > 1800 && year < 2030 &&
    Number.isInteger(quantity) && quantity >= 0
  );
}

app.get('/api/equipment', (req, res) => {
  res.status(200).send(equipment);
});

// Keep the filter route before /:id.
app.get('/api/equipment/filter', (req, res) => {
  const { category } = req.query;

  //Checks for a valid category query param
  if (!category || typeof category !== 'string' || !category.trim()) {
    return res.status(400).send({ error: 'A valid category query parameter is required' })
  }

  //Ensures case-insensitivity
  const filtered = equipment.filter(
    (item) => item.category.toLowerCase() === category.trim().toLowerCase()
  );

  res.status(200).send(filtered);
});

app.get('/api/equipment/:id', (req, res) => {
  const index = req.params.id;
  //Checks for valid index type
  if (isNaN(index) || index < 0 || index >= equipment.length) {
    return res.status(404).send({ error: `Equipment not found at index ${index}` });
  }

  res.status(200).send(equipment[index]);
});

app.post('/api/equipment', (req, res) => {

  //Checks if the inputted equipment data is valid
  if (!isValidEquipment(req.body)) {
    return res.status(400).send({
      error: 'invalid equipment data. Required fields: name (string), category (string), brand (string), year (int), quantity (int)'
    });
  }

  res.status(200).send(req.body);
});

app.put('/api/equipment/:id', (req, res) => {
  const index = req.params.id;
  
  //checks for valid index type
  if (isNaN(index) || index < 0 || index >= equipment.lenght) {
    return res.status(404).send({ error: `Equipment not found at index ${index}` })
  }

  //Checks if the inputted equipment data is valid
  if (!isValidEquipment(req.body)) {
    return res.status(400).send({
      error: 'invalid equipment data. Required fields: name (string), category (string), brand (string), year (int), quantity (int)'
    });
  }
  res.status(200).send(req.body);
});

app.delete('/api/equipment/:id', (req, res) => {
  const index = req.params.id;

  //checks for valid index type
  if (isNaN(index) || index < 0 || index >= equipment.lenght) {
    return res.status(404).send({ error: `Equipment not found at index ${index}` })
  }

  res.status(200).send('Item deleted Successfully');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', err => {
  if (err) {
    console.error(`Cannot start on port ${PORT}: ${err.message}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});

//I validated each endpoint by trying out anticipated false queries. I then use said queries as a basis for my edge-cases, things like case sensitivity, valid integers, and valid data.
//I specifically created a function that checks if inputted data is valid so that I could call it during my put and post queries to cross-reference and check for errors.