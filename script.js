"use strict";
// Employee class
class Employee {
	constructor(name, address, employeeId, designation) {
		this.name = name;
		this.address = address;
		this.employeeId = employeeId;
		this.designation = designation;
	}
}

// Array to store employees
let employees = [];

// Function to show Add Employee page and hide other pages
const showAddEmployee = () => {
	document.getElementById("add-employee-page").style.display = "block";
	document.getElementById("view-employees-page").style.display = "none";
	document.getElementById("edit-employee-page").style.display = "none";
	
	// Add active-link class to the add employee link and remove it from the view employee link
	document.getElementById("view-employee-link").classList.remove("active-link");
	document.getElementById("add-employee-link").classList.add("active-link");
};

// Function to show View Employees page and hide other pages
const showViewEmployees = () => {
	document.getElementById("add-employee-page").style.display = "none";
	document.getElementById("view-employees-page").style.display = "block";
	document.getElementById("edit-employee-page").style.display = "none";

	// Add active-link class to the view employee link and remove it from the add employee link
	document.getElementById("add-employee-link").classList.remove("active-link");
	document.getElementById("view-employee-link").classList.add("active-link");
	// Call the display employees function
	displayEmployees();
};

// Function to add employee
const addEmployee = (e) => {
	e.preventDefault(); // Stop default reloading on form submit
	// Get the name, address, employeeID and designation from the form(converting to upperCase by default)
	const name = document.getElementById("name").value.toUpperCase();
	const address = document.getElementById("address").value.toUpperCase();
	const employeeId = document.getElementById("employeeId").value.toUpperCase();
	const designation = document.getElementById("designation").value.toUpperCase();
	// Check if the fields are empty
	if (name.replace(/ /g, "") === "" || employeeId.replace(/ /g, "") === "" || designation.replace(/ /g, "") === "") {
		// If empty then show message
		document.getElementById("helper-null-field").classList.remove("hide");
	}
	// Else proceed further
	else {
		// Check if any record exists with same employeeID
		const index = employees.findIndex((emp) => emp.employeeId === employeeId);
		// If not then push the record to the employee array
		if (index === -1) {
			document.getElementById("helper-same-empId").classList.add("hide");
			document.getElementById("helper-null-field").classList.add("hide");
			// Add new employee
			const newEmployee = new Employee(name, address, employeeId, designation);
			employees.push(newEmployee);

			// Clear form fields
			document.getElementById("name").value = "";
			document.getElementById("address").value = "";
			document.getElementById("employeeId").value = "";
			document.getElementById("designation").value = "";

			showViewEmployees(); // Show View Employees page after adding
		}
		// If exists then show the helper text
		else {
			document.getElementById("helper-same-empId").classList.remove("hide");
		}
	}
};

// Function to display all employees
const displayEmployees = () => {
	const employeesList = document.getElementById("employees-list");
	employeesList.innerHTML = "";
	// If there are no records then show message
	if (!employees.length) {
		const tr = document.createElement("tr");
		tr.innerHTML = `
			<td colspan="5" class="empty-employee">No Employee data found!!</td>
    	`;
		employeesList.appendChild(tr);
	}
	// If exists then append it to the table
	else {
		employees.forEach((employee) => {
			const tr = document.createElement("tr");
			tr.innerHTML = `
				<td>${employee.name}</td>
				<td>${employee.address}</td>
				<td>${employee.employeeId}</td>
				<td>${employee.designation}</td>
				<td>
					<button title="Edit" class="blue-btn" onclick="showEditEmployee('${employee.employeeId}')">
						Edit
					</button>
					<button title="Delete" class="danger-btn" onclick="deleteEmployee('${employee.employeeId}')">
						Delete
					</button>
				</td>
				`;
			employeesList.appendChild(tr);
		});
	}
};

// Function to show Edit Employee page with employee details pre-filled
const showEditEmployee = (employeeId) => {
	// Hide the nav bar
	document.getElementById("navbar").classList.add("hide");
	// Get the record of the given employeeID
	const employee = employees.find((emp) => emp.employeeId === employeeId);
	// If exists then show a prefilled form
	if (employee) {
		document.getElementById("edit-name").value = employee.name;
		document.getElementById("edit-address").value = employee.address;
		document.getElementById("edit-employeeId").value = employee.employeeId;
		document.getElementById("edit-designation").value = employee.designation;
		document.getElementById("add-employee-page").style.display = "none";
		document.getElementById("view-employees-page").style.display = "none";
		document.getElementById("edit-employee-page").style.display = "block";
	}
};

// Function to update employee details
const updateEmployee = (e) => {
	e.preventDefault(); // Stop default reloading on form submit
	// Get the data from the form and update it in the employee array
	const employeeId = document.getElementById("edit-employeeId").value;
	const index = employees.findIndex((emp) => emp.employeeId === employeeId);

	if (index !== -1) {
		const name = document.getElementById("edit-name").value.toUpperCase();
		const address = document.getElementById("edit-address").value.toUpperCase();
		const designation = document.getElementById("edit-designation").value.toUpperCase();

		// Check if the fields are empty
		if (name.replace(/ /g, "") === "" || designation.replace(/ /g, "") === "") {
			// If empty then show message
			document.getElementById("helper-null-field-update").classList.remove("hide");
		}
		// Else proceed further
		else {
			employees[index].name = name;
			employees[index].address = address;
			employees[index].designation = designation;
			document.getElementById("navbar").classList.remove("hide"); // Show the navbar
			document.getElementById("helper-null-field-update").classList.add("hide"); // Hide message

			showViewEmployees(); // Show View Employees page after updating
		}
	}
};

// Function to cancel editing and go back to View Employees page
const cancelEdit = () => {
	document.getElementById("navbar").classList.remove("hide");
	showViewEmployees();
};

// Function to delete an employee
const deleteEmployee = (employeeId) => {
	employees = employees.filter((emp) => emp.employeeId !== employeeId);
	displayEmployees();
};

// Initial display (show View Employees page)
showViewEmployees();

// ------------ Event Listeners ------------

// Call addEmployee on form submit of add employee
document.getElementById("add-employee-form").addEventListener("submit", addEmployee);
// Call updateEmployee on form submit of edit employee
document.getElementById("edit-employee-form").addEventListener("submit", updateEmployee);
