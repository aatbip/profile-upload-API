# ekbana_assignment

This assignment uses Node/Express for APIs and MongoDB for database. JS ES6 module is used for the development. 

Multer is used for uploading the images. 

Project file structure: 

Middleware -> 

uploader.js is the multer function for uploading the images. 

validate.js is the middleware for API validation in every API requests. API Key to be sent in the header. 

Controllers -> 

contains category.js and company.js written for basic CRUD operations APIs to the database. 

Model -> 

contains MongoDB schema. 

Routes -> 

contains routing definitions. 

HERE IS THE .env file content -> 

************************************************

MONGO_URI= ``replace your MONGODB URI``
  
PORT=3000
  
ENVIRONMENT=local
  
API_KEY=BA673A414C3B44C98478BB5CF10A0F832574090C
  
SITE=http://localhost:3000


***********************************************

To run the project: 
  
-> Clone 
  
-> npm install 
  
-> npm start



