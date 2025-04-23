const fs = require("fs");
const csv = require("csv-parser");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const csvFilePath = "delhi_pincodes.csv";

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", async (row) => {
    try {
      const pin = row.pincode?.trim();
      const city = row.city?.trim();
      const state = row.state?.trim();
      const available = row.available === 'true'; // Ensuring 'true' as a boolean

      if (!pin || !city || !state || available === undefined) {
        console.warn("⚠️ Skipping invalid row:", row);
        return;
      }

      const data = { city, state, available };

      await db.collection("pincodes").doc(pin).set(data);
      console.log(`✅ Added pin: ${pin}`);
    } catch (err) {
      console.error(`❌ Error writing pin ${row.pincode}:`, err);
    }
  })
  .on("end", () => {
    console.log("✅ CSV import complete.");
  });