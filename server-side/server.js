var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var response = {};

//10 employees loaded on page load
var employee = [{
		id: 51680756,
		firstName: 'Sanjai',
		lastName: 'kumar',
		email: 'sanjaikumars@hcl.com',
		position: 'Consultant'
	},{
		id: 51680752,
		firstName: 'Suresh',
		lastName: 'kumar',
		email: 'sureshkumars@hcl.com',
		position: 'Associate-Consultant'
	},{
		id: 51680753,
		firstName: 'Mahesh',
		lastName: 'jeyagopal',
		email: 'maheshjeyagopal@hcl.com',
		position: 'Senior-Consultant'
	},{
		id: 51680766,
		firstName: 'Rajesh',
		lastName: 'kumar',
		email: 'rajeshjekumar@hcl.com',
		position: 'Senior-Consultant'
	},{
		id: 51680755,
		firstName: 'Anitha',
		lastName: 'jeyagopal',
		email: 'anithajeyagopal@hcl.com',
		position: 'Consultant'
	},{
		id: 51680556,
		firstName: 'Deepika',
		lastName: 'gayathri',
		email: 'deepikagayathri@hcl.com',
		position: 'Senior-Consultant'
	},{
		id: 51680757,
		firstName: 'Sathish',
		lastName: 'kumar',
		email: 'sathishkumar@hcl.com',
		position: 'Tech-Lead'
	},{
		id: 51680758,
		firstName: 'Srini',
		lastName: 'vasan',
		email: 'srinivasan@hcl.com',
		position: 'Architech'
	},{
		id: 51680759,
		firstName: 'Ritesh',
		lastName: 'sagar',
		email: 'riteshsagar@hcl.com',
		position: 'Associate-Consultant'
	},{
		id: 51680750,
		firstName: 'Rajesh',
		lastName: 'jeyagopal',
		email: 'rajeshjeyagopal@hcl.com',
		position: 'Consultant'
	}];
	
var userAttempt = 0;
	
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));


/**
 * ToDoList
 */
app.get('/todolist', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.send({ data : employee });
});

/**
 * Add Employee
 */
app.post('/add', function (req, res) {
	employee.push(req.body);
	res.send({ data : employee });
});

/**
 * Delete Employee
 */
app.get('/delete/:id', function (req, res) {
	var response = req.params.id;
	for(var i=0; i<employee.length; i++) {
		if(employee[i].id == response) {
			employee.splice( i, 1 );
		}
	}
	res.send({ data : employee });
});

/**
 * Retrieve Employee
 */
app.get('/retrieve/:id', function (req, res) {
	var response = req.params.id;
	var editEmployee = [];
	for(var i=0; i<employee.length; i++) {
		if(employee[i].id == response) {
			editEmployee.push(employee[i]);
		}
	}
	res.send({ data : editEmployee });
});

/**
 * Modify Employee
 */
app.post('/modify', function (req, res) {
	var response = req.body;
	for(var i=0; i<employee.length; i++) {
		if(employee[i].id == response.id) {
			employee[i] = response;
		}
	}
	res.send({ message : 'success' });
});

/**
 * Login
 */
app.post('/login', function (req, res) {
	response = req.body;
	userAttempt = 0;
	if(response.userName === 'admin' && response.password === 'admin') {
		res.send({ message : 'success' });
	} else {
		res.send({ message : 'error' });
	}
});

/**
 * Login
 */
app.post('/userAttempt', function (req, res) {
	
	response = req.body;
	console.log('response' + response.data);
	if(response.data === 'test') {
		userAttempt = 0;
	} else {
		userAttempt = userAttempt + 1;
	}
	
	if (userAttempt >=3 ) {
		res.send({ message : 'You tried three attempt. Redirecting to login page' });
	} else if(userAttempt === 0) {		
		res.send({ message : 'success' });
	} else {
		res.send({ message : 'Wrong number entered! User attempt: ' +userAttempt });
	}
});



app.listen(PORT, function () {
  console.log('Server listening on '+PORT);
});