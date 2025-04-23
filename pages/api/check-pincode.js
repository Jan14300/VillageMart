import path from 'path';
import fs from 'fs';
import Papa from 'papaparse';

export default function handler(req, res) {
  const { pincode } = req.body;

  // 👇 CSV file ka path (from root of your project)
  const filePath = path.join(process.cwd(), 'firestore-csv-import', 'delhi_pincodes.csv');

  // 👇 Read file and parse CSV
  const csvData = fs.readFileSync(filePath, 'utf8');
  const parsed = Papa.parse(csvData, { header: true });

  // 👇 Extract all pincodes from CSV (assuming there's a 'pincode' column)
  const pincodesList = parsed.data.map((row) => row.pincode?.trim());

  // 👇 Validate pincode format
  if (!/^\d{6}$/.test(pincode)) {
    return res.status(400).json({
      available: false,
      error: 'Invalid pincode. Please enter a 6-digit number.',
    });
  }

  // 👇 Check if pincode exists in CSV list
  if (pincodesList.includes(pincode)) {
    return res.status(200).json({
      available: true,
      deliveryDays: 3,
      deliveryFee: 29,
      freeAbove: 499,
    });
  }

  // 👇 Valid format but not available
  return res.status(200).json({
    available: false,
    error: 'Delivery not available to this pincode.',
  });
}