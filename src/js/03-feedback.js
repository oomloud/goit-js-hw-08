//the script will handle forms with any number of fields with unique 'name' attribute
import throttle from "lodash/throttle";
const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector(".feedback-form");
form.addEventListener("input", throttle(inputHandler, 500));
form.addEventListener("submit", submitHandler);

let formData = {}; // variable for storing data
const storageFormData = JSON.parse(localStorage.getItem(STORAGE_KEY)); // variable for reading data from localstorage

// checking if localstorage contains saved data 
if (storageFormData) {
    // making sure the restored values are updated on input, not overwritten
    formData = storageFormData;
    // populating the form with saved data from localstorage
    [...form.elements].forEach(element => {
        if (storageFormData.hasOwnProperty(element.name)) {
            element.value = storageFormData[element.name];
        } else {
            element.value = null;
        }
    })
}

// saving data to localstorage regardless the number of fields
function inputHandler(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// cleaning the storage and input fields, returning the saved object from localstorage to console
function submitHandler(evt) {
    evt.preventDefault();
    console.log(formData);
    form.reset();
    localStorage.removeItem(STORAGE_KEY);
}
