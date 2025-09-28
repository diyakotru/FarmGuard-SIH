const Farm = require('../models/farmModel');

exports.getFarms = async (req, res) => {
  try {
    const farms = await Farm.find().populate('owner');
    res.json(farms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFarm = async (req, res) => {
  try {
    const farm = new Farm(req.body);
    await farm.save();
    res.status(201).json(farm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
