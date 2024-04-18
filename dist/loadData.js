import { fetchRegistrations } from "./fetchData.js";
import { showData } from "./showDate.js";
import { registrationData } from "./app.js";
export const loadData = () => {
    let resultEdit = document.getElementById('resultEdit');
    resultEdit.style.display = 'none';
    fetchRegistrations('registrations', 'get', null)
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        registrationData.splice(0, registrationData.length);
        Object.keys(data).forEach((k) => {
            registrationData.push(Object.assign({ id: k }, data[k]));
        });
        showData(registrationData);
    });
};
