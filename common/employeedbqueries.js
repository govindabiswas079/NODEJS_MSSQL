let employeeQuery = {
    "Insert": "Insert Into [NODESQLDBO].[EMPLOYEE] (Name,Role,Doj,Salary,EmailId,Phone) Values(@Name,@Role,@Doj,@Salary,@EmailId,@Phone)",
    "Update": "Update [NODESQLDBO].[EMPLOYEE] Set Name = @Name, Role = @Role, Doj = @Doj, Salary = @Salary, EmailId = @EmailId, Phone = @Phone Where Id = @Id",
    "Delete": "Delete [NODESQLDBO].[EMPLOYEE] Where Id = @Id",
    "SelectAll": "Select * from [NODESQLDBO].[EMPLOYEE]",
    "SelectEmployee": "Select * from [NODESQLDBO].[EMPLOYEE] Where Id = @Id"
}

module.exports = employeeQuery;