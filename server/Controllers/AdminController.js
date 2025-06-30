import AdminModel from "../Models/AdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Agent from "../Models/AgentModel.js";
import csv from "csv-parser";
import xlsx from "xlsx";
import fs from "fs"
import Lead from "../Models/LeadModel.js";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};
;

const parseXlsx = (file) => {
  const buffer = file.buffer || fs.readFileSync(file.path);
  const wb = xlsx.read(buffer);
  const ws = wb.Sheets[wb.SheetNames[0]];
  return xlsx.utils.sheet_to_json(ws);
};


const parseCsv = (file) =>
  new Promise((resolve, reject) => {
    const rows = [];
    let stream;
    if (file.buffer) {
      stream = Readable.from(file.buffer);
    } else if (file.path) {
      stream = fs.createReadStream(file.path);
    } else {
      return reject(new Error("No buffer or path on file"));
    }
    stream
      .pipe(csv())
      .on("data", (r) => rows.push(r))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });


export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Find user
    const user = await AdminModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3. Verify password
    const auth = await bcrypt.compare(password, user.password);
    console.log(auth);
    if (!auth) {
      return res.status(301).json({
        success: false,
        message: "Invalid email or password",
      });
    }

  res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    // 5. Success
    return res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const adminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    // Validate required fields
    if (!name || !email || !password ) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const existing = await AdminModel.findOne({ email });
    
    if (existing) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    const newAdmin = new AdminModel({
      name,
      email,
      password: password,
    });

     res.cookie("jwt", createToken(email, newAdmin.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    await newAdmin.save();

    return res.status(201).json({ success: true, message: "Admin created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const AdminInfo = async (req, res) => {
  try {
    console.log("re.id",req.userId);
    const user = await AdminModel.findById(req.userId);
    console.log(user);
    if (!user) {
      res.json({ success: false, message: "User with given id not found" });
    }
    res.json({
      success: true,
      message: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};


export const Logout = async (req,res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};


export const createAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ success: false, message: "Agent with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAgent = new Agent({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    await newAgent.save();

    return res.status(201).json({ success: true, message: "Agent created successfully", agent: newAgent });
  } catch (error) {
    console.error("Error creating agent:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const uploadList = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ success: false, message: "No file uploaded" });

    const { mimetype: mime } = req.file;

    const allowed = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!allowed.includes(mime))
      return res.status(400).json({ success: false, message: "Invalid file type" });

    // parse rows
    const rows = mime === "text/csv" ? await parseCsv(req.file) : parseXlsx(req.file);
    if (!rows.length)
      return res.status(400).json({ success: false, message: "Empty file" });

    // fetch 5 agents
    const agents = await Agent.find().limit(5);
    if (agents.length < 5)
      return res.status(400).json({ success: false, message: "Need at least 5 agents" });

    // distribute
    const leads = rows.map((row, idx) => ({
      firstName: row.FirstName || row.firstName || row.firstname,
      phone: row.Phone || row.phone,
      notes: row.Notes || row.notes || "",
      agentId: agents[idx % 5]._id,
    }));

    await Lead.insertMany(leads);
    res.status(201).json({ success: true, message: "List distributed", count: leads.length });
  } catch (err) {
    console.error("uploadList error", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// --- leads board controller ---
export const getLeadsBoard = async (req, res) => {
  try {
    // fetch all agents
    const agents = await Agent.find().lean();
    // fetch all leads once
    const leads = await Lead.find().select("firstName phone notes agentId createdAt").lean();

    // group leads by agentId
    const grouped = agents.map((a) => ({
      ...a,
      leads: leads.filter((l) => String(l.agentId) === String(a._id)),
    }));

    res.json({ success: true, agents: grouped });
  } catch (err) {
    console.error("getLeadsBoard error", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 