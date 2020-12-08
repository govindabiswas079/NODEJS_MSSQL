const dbConfig = require("../dbConfig");
const employeeDbQuery = require("../common/employeedbqueries");
const startUpDbQuery = require("../common/nodemssqlstartupscript");
const sql = require("mssql");
const { TYPES } = require("mssql");

async function getEmployees(){
    try{
        let pool = await sql.connect(dbConfig);
        let employees = await pool.request().query(employeeDbQuery.SelectAll);
        return employees.recordsets;
    }
    catch(err){
        console.log(err);
    }
}

async function getEmployeeById(id){
    try{
        let pool = await sql.connect(dbConfig);
        let selectedEmployee = await pool.request().input("Id",id)
        .query(employeeDbQuery.SelectEmployee);
        return selectedEmployee.recordsets;
    }
    catch(err){
        console.log(err);
    }
}

async function insertEmployee(employee){
    try{
        console.log("I am from InsertEmployee");
        console.log(employee.Name);
        console.log(employee.Doj);
        let pool = await sql.connect(dbConfig);
        let insertedEmployee = await pool.request()        
        .input("Name", TYPES.VarChar, employee.Name)
        .input("Role", TYPES.VarChar, employee.Role)
        .input("Doj", TYPES.DateTime, employee.Doj)
        .input("Salary", TYPES.VarChar, employee.Salary)
        .input("EmailId", TYPES.VarChar, employee.EmailId)
        .input("Phone", TYPES.VarChar, employee.Phone)
        .query(employeeDbQuery.Insert);
        return insertedEmployee.recordsets;
    }
    catch(err){
        console.log(err);
    }
}

async function updateEmployee(employee){
    try{
        var employeeRow = await getEmployeeById(employee.Id);        
        let employeeDomain = employeeRow[0];
        if(employeeDomain){
            let pool = await sql.connect(dbConfig);
            employeeDomain[0].Name = employee.Name;
            employeeDomain[0].Role = employee.Role;
            employeeDomain[0].Doj = employee.Doj;
            employeeDomain[0].Salary = employee.Salary;
            employeeDomain[0].EmailId = employee.EmailId;
            employeeDomain[0].Phone = employee.Phone;            
            let updateEmployee = await pool.request()            
            .input("Id", TYPES.Int, employeeDomain[0].Id)
            .input("Name", TYPES.VarChar, employeeDomain[0].Name)
            .input("Role", TYPES.VarChar, employeeDomain[0].Role)
            .input("Doj", TYPES.DateTime, employeeDomain[0].Doj)
            .input("Salary", TYPES.VarChar, employeeDomain[0].Salary)
            .input("EmailId", TYPES.VarChar, employeeDomain[0].EmailId)
            .input("Phone", TYPES.VarChar, employeeDomain[0].Phone)            
            .query(employeeDbQuery.Update);
            if(updateEmployee.rowsAffected && updateEmployee.rowsAffected[0] > 0){
                return employeeDomain;
            }
            return updateEmployee.recordsets;
        }else{
            return [];
        }
        
    }
    catch(err){
        console.log(err);
    }
}

async function deleteEmployee(id){
    try{
        let pool = await sql.connect(dbConfig);
        let deletedEmployee = await pool.request().input("Id",id)
        .query(employeeDbQuery.Delete);
        return deletedEmployee.recordsets;
    }
    catch(err){
        console.log(err);
    }
}

async function nodeMsSQlStartUp(){
    try{
        let pool = await sql.connect(dbConfig);
        let startUp = await pool.request()
        .execute(startUpDbQuery.Execute_SP_dbo_USP_STARTUPSCRIPT);
        return startUp.recordsets;
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    GetEmployees: getEmployees,
    GetEmployeeById: getEmployeeById,
    InsertEmployee: insertEmployee,
    UpdateEmployee: updateEmployee,
    DeleteEmployee: deleteEmployee,
    NodeMsSQlStartUp: nodeMsSQlStartUp
}