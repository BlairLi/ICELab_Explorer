const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
// const math = require('mathjs');

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

const mongoUri = "mongodb+srv://wadezheng0802:0jmVaMjokHSsob9i@cluster0.gncmfim.mongodb.net/";
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    
        // Define your routes here
        app.get('/', (req, res) => {
            res.json({ res: "we are the world" });
        });

        app.get('/info/:Device_id', get_device_info);
        async function get_device_info(req, res){
            try {
            const db = client.db("Device_Info");
            const collection = db.collection("Device_Info");
            const device = await collection.findOne({ DEVICEID: req.params.Device_id });
        
            if (!device) {
                return res.status(404).json({ error: "Device not found" });
            }
        
            // Convert ObjectId to string
            device._id = device._id.toString();
            res.json({ result: device });
            } catch (error) {
            res.status(500).json({ error: error.message });
            }
        }
        
        app.get('/data/:Device_id', async (req, res) => {
            try {
              const db = client.db("Device_Data");
              const collection = db.collection(req.params.Device_id);
              const data = await collection.find({}).toArray();
        
              // Removing '_id' field from each document
              const output = data.map(({ _id, ...rest }) => rest);
        
              res.json({ result: output });
            } catch (error) {
              console.error('Error:', error);
              res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    
        app.get('/record/:device_id/:rec', async (req, res) => {
            try {
                const { device_id, rec } = req.params;
                const db = client.db("Device_Data");
                const collection = db.collection(device_id);
                const record = await collection.findOne({ RECORD: parseInt(rec) });
        
                if (!record) {
                return res.status(404).json({ error: "Record not found" });
                }
        
                // Extracting the needed fields
                const output = [{
                TIMESTAMP: record.TIMESTAMP,
                RH_Avg: record.RH_Avg,
                RECORD: record.RECORD
                }];
        
                res.json({ result: output });
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        app.post('/export/:device_id', async (req, res) => {
            try {
              const device_id = req.params.device_id;
              const { TIMESTAMP_F: From_time, TIMESTAMP_T: To_time, List_V } = req.body;
        
              const db = client.db("Device_Data");
              const collection = db.collection(device_id);
              const query = { TIMESTAMP: { $gte: From_time, $lte: To_time } };
              const data = await collection.find(query).toArray();
        
              const results = data.map(item => {
                const result = {};
                List_V.forEach(key => {
                  result[key] = item[key];
                });
                return result;
              });
        
              res.json({ result: results });
            } catch (error) {
              console.error('Error:', error);
              res.status(400).json({ error: "The key should be: " + error.message });
            }
        });
        
        app.post('/export-csv/:device_id', async (req, res) => {
            try {
              const device_id = req.params.device_id;
              const { TIMESTAMP_F: From_time, TIMESTAMP_T: To_time, List_V } = req.body;
        
              const db = client.db("Device_Data");
              const collection = db.collection(device_id);
              const query = { TIMESTAMP: { $gte: From_time, $lte: To_time } };
              const data = await collection.find(query).toArray();
        
              let csvContent = List_V.join(",") + "\n";
              data.forEach(doc => {
                const row = List_V.map(key => String(doc[key])).join(",");
                csvContent += row + "\n";
              });
        
              res.setHeader('Content-Type', 'text/csv');
              res.send(csvContent);
            } catch (error) {
              console.error('Error:', error);
              res.status(400).json({ error: "The key should be: " + error.message });
            }
        });
        
        app.post('/export-var/:device_id', async (req, res) => {
            try {
              const device_id = req.params.device_id;
              const { TIMESTAMP_F: From_time, TIMESTAMP_T: To_time, Varible } = req.body;
        
              const db = client.db("Device_Data");
              const collection = db.collection(device_id);
              const query = { TIMESTAMP: { $gte: From_time, $lte: To_time } };
              const data = await collection.find(query).toArray();
        
              const results = data.map(item => item[Varible]);
        
              res.json({ result: results });
            } catch (error) {
              console.error('Error:', error);
              res.status(400).json({ error: "The key should be: " + error.message });
            }
        });
        
        app.get('/lastest-status/:device_id', async (req, res) => {
            try {
              const device_id = req.params.device_id;
              const db = client.db("Device_Data");
              const collection = db.collection(device_id);
        
              // Find the latest record
              const latestRecord = await collection.findOne({}, { sort: { TIMESTAMP: -1 } });
        
              if (!latestRecord) {
                return res.status(404).json({ error: "No records found" });
              }
        
              // Remove the '_id' field
              const { _id, ...result } = latestRecord;
        
              res.json({ result: result });
            } catch (error) {
              console.error('Error:', error);
              res.status(500).json({ error: 'Internal Server Error' });
            }
        });
        
        app.post('/dashboard_dg/:device_id', async (req, res) => {
        try {
            const device_id = req.params.device_id;
            const { TIMESTAMP_F: From_time, TIMESTAMP_T: To_time, Varible } = req.body;
    
            const db = client.db("Device_Data");
            const collection = db.collection(device_id);
            const query = { TIMESTAMP: { $gte: From_time, $lte: To_time } };
            const data = await collection.find(query).toArray();
    
            // Check if the variable exists in the first document (if any)
            if (data.length > 0 && !(Varible in data[0])) {
            return res.status(400).json({ error: "Variable not found." });
            }
    
            const results = data.map(item => item[Varible]);
    
            res.json({ [Varible]: results });
        } catch (error) {
            console.error('Error:', error);
            res.status(400).json({ error: "The key should be: " + error.message });
        }
        });
        
        app.post('/dashboard_wr/:device_id', async (req, res) => {
            try {
              const device_id = req.params.device_id;
              const { TIMESTAMP_F: From_time, TIMESTAMP_T: To_time } = req.body;
        
              const db = client.db("Device_Data");
              const collection = db.collection(device_id);
              const query = { TIMESTAMP: { $gte: From_time, $lte: To_time } };
              const data = await collection.find(query).toArray();
        
              const windDirName = device_id === "000000" ? 'WindDir_resultmean' : 'WD_3m_deg';
              const windSpdName = device_id === "000000" ? 'WindSpd_vector_ms' : 'WS_3m_ms';
        
              let resData = Array(8).fill(null).map(() => Array(16).fill(0));
        
              data.forEach(doc => {
                let windLevel = getWindLevel(doc[windSpdName]);
                let windDirIndex = getWindDirIndex(doc[windDirName]);
                resData[windLevel][windDirIndex]++;
              });
        
              res.json({ res: resData });
            } catch (error) {
              console.error('Error:', error);
              res.status(400).json({ error: "The key should be: " + error.message });
            }
        });
        
        app.post('/dashboard_line_xy/:device_id', async (req, res) => {
            try {
              const device_id = req.params.device_id;
              const { TIMESTAMP_F: From_time, TIMESTAMP_T: To_time, Varible } = req.body;
        
              const db = client.db("Device_Data");
              const collection = db.collection(device_id);
              const query = { TIMESTAMP: { $gte: From_time, $lte: To_time } };
              const data = await collection.find(query).toArray();
        
              const timestamps = data.map(item => item.TIMESTAMP.toString());
              const values = data.map(item => item[Varible]);
        
              // Replace the following with actual calculations for Min, Max, Avg, Std Dev
              const Min_v = Math.min(...values);
              const Max_v = Math.max(...values);
              const Avg_v = values.reduce((a, b) => a + b, 0) / values.length;
              const variance = values.reduce((a, b) => a + Math.pow(b - Avg_v, 2), 0) / values.length;
              const Std_dev = Math.sqrt(variance);
        
              res.json({
                x: timestamps,
                y: values,
                var: Varible,
                unit: "unit", // Replace with actual unit
                average: Avg_v,
                min: Min_v,
                max: Max_v,
                standard_deviation: Std_dev
              });
            } catch (error) {
              console.error('Error:', error);
              res.status(400).json({ error: "The key should be: " + error.message });
            }
        });
        
        app.post('/dashboard_hg/:device_id', async (req, res) => {
            try {
              const device_id = req.params.device_id;
              const { TIMESTAMP_F: From_time, TIMESTAMP_T: To_time, Varible } = req.body;
        
              const db = client.db("Device_Data");
              const collection = db.collection(device_id);
              const query = { TIMESTAMP: { $gte: From_time, $lte: To_time } };
              const data = await collection.find(query).toArray();
        
              const values = data.map(item => item[Varible]);
              const Min_v = Math.min(...values);
              const Max_v = Math.max(...values);
        
              // Define the histogram range and bins
              const interval = Max_v - Min_v;
              const rangeSize = interval > 500 ? 100 : 10;
              const numBins = Math.ceil((Max_v - Min_v) / rangeSize);
              const bins = Array(numBins).fill(0);
              const binLabels = Array(numBins).fill(0).map((_, index) => `${Min_v + index * rangeSize} - ${Min_v + (index + 1) * rangeSize}`);
        
              values.forEach(value => {
                const binIndex = Math.floor((value - Min_v) / rangeSize);
                bins[binIndex]++;
              });
        
              const Avg_v = values.reduce((a, b) => a + b, 0) / values.length;
              const variance = values.reduce((a, b) => a + Math.pow(b - Avg_v, 2), 0) / values.length;
              const Std_dev = Math.sqrt(variance);
              const deviceInfo  = await get_device_info(device_id);
        
              res.json({
                x: binLabels,
                y: bins,
                var: Varible,
                unit: "unit", // Replace with actual unit
                average: Avg_v,
                min: Min_v,
                max: Max_v,
                standard_deviation: Std_dev
              });
            } catch (error) {
              console.error('Error:', error);
              res.status(400).json({ error: "The key should be: " + error.message });
            }
        });
        

        } catch (error) {
        console.error("Could not connect to MongoDB", error);
    }
}

function getWindLevel(speed) {
    if (speed <= 0.2) return 0;
    if (speed <= 1.5) return 1;
    if (speed <= 3.3) return 2;
    if (speed <= 5.4) return 3;
    if (speed <= 7.9) return 4;
    if (speed <= 10.7) return 5;
    if (speed <= 13.8) return 6;
    return 7;
}
  
function getWindDirIndex(direction) {
    const ranges = [11.25, 33.75, 56.25, 78.75, 101.25, 123.75, 146.25, 168.75, 191.25, 213.75, 236.25, 258.75, 281.25, 303.75, 326.25, 348.75];
    const index = ranges.findIndex(range => direction <= range);
    return index === -1 ? 0 : index;
}
  
run().catch(console.dir);

const port = 7000;
app.listen(port, () => {
console.log(`Server running on http://localhost:${port}`);
});
  