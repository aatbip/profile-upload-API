import express from "express"; 

export const validated = async(req, res, next) => {
    const api_key = req.header("api-key");
    const API_KEY = process.env.API_KEY; 
    if (api_key == API_KEY) {
        return next() 
    } else {
        console.log("***AUTHENTICATION ERROR***"); 
        res.json("AUTHENTICATION ERROR")
    }
    
  }