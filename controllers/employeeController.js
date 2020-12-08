const employeeService = require("../services/employeeService");
let EmployeeObj = require("../models/employee");

const express = require("express");
const bodyParser = require("body-parser");
const corsOrigin = require("cors");
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(corsOrigin());
app.use('/api',router);

// Router Middleware
router.use((request, response, next) =>{
    console.log(`Middleware Executed - ${request.originalUrl} - ${request.method}`);
    next();
});

//Get All Employees
router.get('/employee', function(request, response)  {
    employeeService.GetEmployees().then(result => {
        console.log(result);
        response.json(result[0]);
    });
});

//Get Employee by Id
router.get('/employee/:id', function(request, response)  {
    employeeService.GetEmployeeById(request.params.id).then(result => {
        console.log(result);
        response.json(result[0]);
    });
});

//Insert Employee
router.post('/employee',function(request, response){
    let employee = {...request.body};
    employee = employee[0];    
    employeeService.InsertEmployee(employee).then(result => {        
        response.status(201).json(result[0]);
    });
});

//Update Employee
router.put('/employee',function(request, response){    
    let employee = {...request.body};
    employee = employee[0];    
    employeeService.UpdateEmployee(employee).then(result => {
        console.log(result);
        response.status(200).json(result[0]);
    });
});

//Delete Employee
router.delete('/employee/:id',function(request, response){
    employeeService.DeleteEmployee(request.params.id).then(result => {
        console.log(result);
        response.json(result[0]);
    });
});

//Execute Start Up
router.get('/startUp', function(request, response)  {
    employeeService.NodeMsSQlStartUp().then(result => {
        console.log(result);
        response.json(result[0]);
    });
});

let port = process.env.PORT || 3000;
app.set("port", port);
app.listen(port,(request, response)=>{
    console.log(`API Running at PORT: ${port}`);
});

module.exports = router;