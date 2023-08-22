import express from "express";
const dataRoutes = express.Router();
import Data from '../models/data.js';

//Create One
dataRoutes.post('/', async (req, res) => {
    const moduleData = new Data({
        moduleName: req.body.moduleName,
        moduleDesc: req.body.moduleDesc,
        moduleContents: [],
    })
    try {
        const newModule = await moduleData.save();
        res.status(201).json(newModule);
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})
//Getting all
dataRoutes.get('/', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Getting One
dataRoutes.get('/:moduleName', getModuleData, async (req, res) => {
    res.send(res.moduleData);
})

//Update One
dataRoutes.patch('/:moduleName', getModuleData, async (req, res) => {
    if(req.body.newModuleContent !== null && req.body.newModuleContent !== undefined) {
        //console.log(res.moduleData.moduleContents)
        try {
            const updatedModule = await Data.updateOne({
                moduleName: req.params.moduleName
            }, {
                moduleContents: [...res.moduleData[0].moduleContents, req.body.newModuleContent]
            })
            res.status(201).json({message: updatedModule})
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    } else {
        res.status(404).json({message: "newModuleContent Not Found!"})
    }
})

//Delete One
dataRoutes.delete('/:moduleName',getModuleData, async (req,res) => {
    try {
        const deletedModule = await Data.deleteOne({moduleName: req.params.moduleName})
        res.send(deletedModule)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

async function  getModuleData(req, res, next){
    try {
        const moduleData = await Data.find({moduleName: req.params.moduleName})
        if(moduleData == null){
            return res.status(404).json({message: "Module Not Found!"});
        }
        else {
            //console.log(req.params.moduleName, moduleData[0].moduleContents)
            res.moduleData = moduleData;
            next();
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

export default dataRoutes;