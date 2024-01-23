/*
1. What is Pseudocode?
- Pseudocode is a way of outlining a computer program using plain language
  and informal syntax to convey the logic and structure without adhering
  to specific programming language rules.

2. What is Flow Charts?
- Flow charts are graphical representations that use symbols and arrows
  to illustrate the sequence of operations and decision points within a program,
  aiding in visualizing its control flow.

3. What is Internal Comments in code?
- Internal comments in code are explanatory notes or annotations placed within the source code
  by developers to provide context, explanations, or reminders about the functionality
  and logic of the program for themselves and other developers working on the codebase.
*/

/*
1. How does function validatePostcode() work?
This function operates as an onblur event,
which means it is triggered when the user leaves the postcode input field.
It employs a switch statement to efficiently handle different regex patterns,
providing better readability compared to an if statement in this case.

The function fetches the state value
and overwrites the regex for the postcode based on the input state,
allowing it to validate whether the input postcode matches the state.
If it does not match, an error message is displayed,
and the postcode input field turns red.


2. How has local storage been implemented?
Local storage is utilized to store input data in case the browser crashes or is mistakenly closed.
The function saveData() is responsible for this task,
automatically executing every 3 seconds using setInterval(saveData, 3000).
Conversely, the function retrieveData() is employed to restore saved data back into the inputs.
This function is triggered when the page loads, as it is set in the body tag as an onload event.
*/

// Change fields color depending on input value
function validateErrors(formField, errorField) {
    //create a variable for the form field
    theField = document.getElementById(formField);
    //create a variable for the error field
    theError = document.getElementById(errorField);
    //create a new pattern by reading in pattern from HTML and adding delimiters
    var thePattern = new RegExp("^"+theField.pattern+"$");

    //test data in field against regex pattern from HTML
    if(!thePattern.test(theField.value)) {
        //sets field background to red
        theField.style.background ='#FF9999';
        //displays the <span> containing the error msg
        theError.style.display = "block";
        //displays the error message by reading the HTML title and writing it to the span
        theError.innerHTML= theField.title;
        //set focus to field
        theField.focus();
        return false;
    } 
    else {
        //sets field background to green
        theField.style.background ='#CCFFCC';
    }
    //removes error message
        theError.style.display = "none";
        return true;
}

// Dynamically populate states based on country chosen
function changeState() {
    // store a reference to country and state select lists
    var country = document.getElementById('country').value;
    var state = document.getElementById('state');
    state.style.background = '#ffffff';

    // if country selected is Australia
    // populate state select list with Australian states
    if (country === 'AU') {
        state.innerHTML = '';
        state.options[state.options.length] = new Option('-- select state --', '0');
        state.options[state.options.length] = new Option('South Australia', 'SA');
        state.options[state.options.length] = new Option('New South Wales', 'NSW');
        state.options[state.options.length] = new Option('Victoria', 'VIC');
        state.options[state.options.length] = new Option('Queensland', 'QLD');
        state.options[state.options.length] = new Option('Tasmania', 'TAS');
        state.options[state.options.length] = new Option('Western Australia', 'WA');
        state.options[state.options.length] = new Option('Australian Capital Territory', 'ACT');
        state.options[state.options.length] = new Option('Northern Territory', 'NT');
    }

    // if country selected is New Zealand
    // populate state select list with New Zealand regions     
    else if (country === 'NZ') {
        state.innerHTML = '';
        //added in 0 for the value on the line below
        state.options[state.options.length] = new Option('-- select region --', '0');
        state.options[state.options.length] = new Option('Auckland', 'AU');
        state.options[state.options.length] = new Option('Northland', 'NO');
        state.options[state.options.length] = new Option('Southland', 'SO');
    }

    // if no country selected populate state select list
    // with one option that tells user to select country first
    else {
        state.innerHTML = '';
        state.options[state.options.length] = new Option('-- select country first --', '');
    }

    // if country hasn't been chosen
    if (document.getElementById("country").value == '0') {
        // change its background colour to red
        document.getElementById("country").style.background = '#FF9999';
    }
    else {
        // otherwise, change its background colour to green
        document.getElementById("country").style.background = '#CCFFCC';
    }
}

//Call this function using an onchange event on the state select
function stateColours() {
    // if state hasn't been chosen
    if (document.getElementById("state").value == '0') {
        // change its background colour to red
        document.getElementById("state").style.background = '#FF9999';
    }
    else {
        // otherwise, change its background colour to green
        document.getElementById("state").style.background = '#CCFFCC';

        // if user input some value into postcode field
        if (document.getElementById("postcode").value != "") {
            // Jump to function validatePostcode()
            validatePostcode();
        }
    }
}

// Validate postcode
// Add new Regex patterns depending on a chosen state
function validatePostcode() {
    theField = document.getElementById("postcode");
    theError = document.getElementById("postcodeError");
    var state = (document.getElementById("state").value);
    var thePattern = new RegExp("^" + theField.pattern + "$");

    switch (state) {
        // Australia
        case "NSW":
            theField.pattern = "1[0-9]{3}|2[0-5][0-9]{2}|2619|26[2-9][0-9]|2[7-8][0-9]{2}|292[1-9]|29[3-9][0-9]";
            thePattern = new RegExp("^" + theField.pattern + "$");
            break;

        case "ACT":
            theField.pattern = "02[0-9]{2}|260[0-9]|261[0-8]|29[0-1][0-9]|2920";
            thePattern = new RegExp("^" + theField.pattern + "$");
            break;

        case "VIC":
            theField.pattern = "3[0-9]{3}|8[0-9]{3}";
            thePattern = new RegExp("^" + theField.pattern + "$");
            break;

        case "QLD":
            theField.pattern = "4[0-9]{3}|9[0-9]{3}";
            thePattern = new RegExp("^" + theField.pattern + "$");
            break;

        case "SA":
            theField.pattern = "5[0-9]{3}";
            thePattern = new RegExp("^" + theField.pattern + "$");
            break;

        case "WA":
            theField.pattern = "6[0-6][0-9]{2}|67[0-8][0-9]|679[0-7]|6[8-9][0-9]{2}";
            thePattern = new RegExp("^" + theField.pattern + "$");
            break;

        case "TAS":
            theField.pattern = "7[0-9]{3}";
            thePattern = new RegExp("^" + theField.pattern + "$");
            break;

        case "NT":
            theField.pattern = "0[8-9][0-9]{2}";
            thePattern = new RegExp("^" + theField.pattern + "$");
            break;

        // New Zealand
        case "AU":
            // Dummy postcode 1000-1999
            theField.pattern = "1[0-9]{3}";
            thePattern = new RegExp("^" + theField.pattern + "$");
            break;

        case "NO":
            //Dummy postcode 2000-2999
            theField.pattern = "2[0-9]{3}";
            thePattern = new RegExp("^" + theField.pattern + "$");
            break;

        case "SO":
            //Dummy postcode 3000-3999
            theField.pattern = "3[0-9]{3}";
            thePattern = new RegExp("^" + theField.pattern + "$");
            break;

        default:
            alert("Choose country, and state first. Then input your postcode.");
            theField.value = "";
            return;
    }

    // Test data in field against regex pattern from HTML
    // If it doesn't match
    if (!thePattern.test(theField.value)) {
        // Display error message
        theField.title = "Your postcode doesn't match your state.";
        // Sets field background to red
        theField.style.background = '#FF9999';
        //Displays the <span> containing the error msg
        theError.style.display = "block";
        //displays the error message by reading the HTML title and writing it to the span
        theError.innerHTML = theField.title;
        //set focus to field
        theField.focus();
        return false;
    }
    else {
        // Sets field background to green
        theField.style.background = '#CCFFCC';
        // Removes error message
        theError.style.display = "none";
        return true;
    }
}


// Check all fields have been filled in
function validate() {
    // Create variable for elements in form1
    var elements = document.getElementById("form1").elements;

    //Loops through all of the elements in the form 
    for (var i = 0, element; element = elements[i++];) {
        //Checks if the element in the form is <input> or <select>
        //and check if backgroundcolor is not green
        //(<input> && not green)
        if (((element == '[object HTMLInputElement]') || (element == '[object HTMLSelectElement]')) && (element.style.backgroundColor != 'rgb(204, 255, 204)')) {
            //if element type is not a color picker or submit
            if (element != document.getElementById("colorpicker") && element.type != 'submit') {   //Show an alert message
                alert("Please enter data for any fields that are not green except for select fields.");
                // Back to form1       
                return false;
            }
        }
    }

    // If color in the color picker is not black (#000000)
    if (document.getElementById("colorpicker").value != "#000000") {
        // Show an alert message
        alert("Please select a colour from the colour picker.");
        // Focus on the color picker
        document.getElementById("colorpicker").focus();
        // Back to form1
        return false;
    }
}

// Local Storage
// Save input automatically
var myInterval = setInterval(savedata, 3000);

// Save data
function savedata() {
    var username = document.querySelector("#username").value;
    var name = document.querySelector("#name").value;
    var address = document.querySelector("#address").value;
    var suburb = document.querySelector("#suburb").value;
    var city = document.querySelector("#city").value;
    var country = document.querySelector("#country").value;
    var state = document.querySelector("#state").value;
    var postcode = document.querySelector("#postcode").value;
    var email = document.querySelector("#email").value;
    var phone = document.querySelector("#phone").value;
    var website = document.querySelector("#website").value;
    var age = document.querySelector("#age").value;
    var colorpicker = document.querySelector("#colorpicker").value;

    localStorage.setItem('username', username);
    localStorage.setItem('name', name);
    localStorage.setItem('address', address);
    localStorage.setItem('suburb', suburb);
    localStorage.setItem('city', city);
    localStorage.setItem('country', country);
    localStorage.setItem('state', state);
    localStorage.setItem('postcode', postcode);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);
    localStorage.setItem('website', website);
    localStorage.setItem('age', age);
    localStorage.setItem('colorpicker', colorpicker);
}

// Put back the saved data
// this is called when the page is loaded
function retrievedata() {
    var username = localStorage.getItem("username");
    var name = localStorage.getItem("name");
    var address = localStorage.getItem("address");
    var suburb = localStorage.getItem("suburb");
    var city = localStorage.getItem("city");
    var country = localStorage.getItem("country");
    var state = localStorage.getItem("state");
    var postcode = localStorage.getItem("postcode");
    var email = localStorage.getItem("email");
    var phone = localStorage.getItem("phone");
    var website = localStorage.getItem("website");
    var age = localStorage.getItem("age");
    var colorpicker = localStorage.getItem("colorpicker");

    document.querySelector("#username").value = username;
    document.querySelector("#name").value = name;
    document.querySelector("#address").value = address;
    document.querySelector("#suburb").value = suburb;
    document.querySelector("#city").value = city;
    document.querySelector("#country").value = country;
    document.querySelector("#postcode").value = postcode;
    document.querySelector("#email").value = email;
    document.querySelector("#phone").value = phone;
    document.querySelector("#website").value = website;
    document.querySelector("#age").value = age;
    document.querySelector("#colorpicker").value = colorpicker;

    //If country is not blank, run state population code
    if (country != 0) {
        // Run function changeState()
        changeState();
        // Restore saved data for state
        document.querySelector("#state").value = state;
        // Run function stateColors()
        stateColours();
    }

    //only IF anything is in localStorage
    if (username != null && username != "") {
        // Run function reFillForm()
        reFillForm();
    }
}

// Test retrieved data 
function reFillForm() {
    // Gets all of the elements in the form with id="form1" 
    var elements = document.getElementById("form1").elements;

    //Loops through all of the elements in the form
    for (var i = 0, element; element = elements[i++];) {

        //Checks if the element in the form is either <input> or <select> 
        // - ignores other elements such as <fieldset>
        //Also checks if backgroundcolor is not green
        //(<input> or <select> && not green) 
        //NOTE: RGB value used here
        if ((element == '[object HTMLInputElement]')) {
            //If element does not have id colorpicker
            //and its type is not submit
            if (element != document.getElementById("colorpicker") && element.type != 'submit') {
                // Build string with elementid + Error
                var errorField = element.id + "Error";
                // Call validation routine to run on each field
                validateErrors(element.id, errorField);
            }
        }
    }
}


// Delete all data in local storage
// This is trigged when clicking a submit button on form 2.
function clearData() {
    localStorage.clear();
}
