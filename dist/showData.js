import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";
export const showData = (registrationData) => {
    let dataTableBody = document.getElementById('dataTableBody');
    let resultTable = document.getElementById('resultTable');
    let resultEdit = document.getElementById('resultEdit');
    dataTableBody.innerHTML = '';
    resultTable.style.display = 'block';
    registrationData.forEach((reg) => {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        tdName.innerHTML = reg.name;
        const tdSurname = document.createElement('td');
        tdSurname.innerHTML = reg.surname;
        const tdBirthYear = document.createElement('td');
        tdBirthYear.innerHTML = reg.birthYear.toString();
        tdBirthYear.classList.add('tdCenter');
        tr.appendChild(tdName);
        tr.appendChild(tdSurname);
        tr.appendChild(tdBirthYear);
        dataTableBody.appendChild(tr);
        tr.onclick = () => {
            resultTable.style.display = 'none';
            resultEdit.style.display = 'block';
            document.getElementById('nameEdit').value = reg.name;
            document.getElementById('surnameEdit').value = reg.surname;
            document.getElementById('yearEdit').valueAsNumber = reg.birthYear;
            if (reg.gender === 'Vaikinas') {
                document.getElementById('maleEdit').checked = true;
            }
            else if (reg.gender === 'Mergina') {
                document.getElementById('femaleEdit').checked = true;
            }
            else {
                document.getElementById('maleEdit').checked = false;
                document.getElementById('femaleEdit').checked = false;
            }
            document.getElementById('emailEdit').value = reg.email;
            document.getElementById('phoneEdit').value = reg.phone;
            document.getElementById('updateRegistration').onclick = () => {
                const genderEdit = document.getElementById('maleEdit').checked ? 'Vaikinas' : document.getElementById('femaleEdit').checked ? 'Mergina' : 'nepasirinkta';
                const upReg = {
                    name: document.getElementById('nameEdit').value,
                    surname: document.getElementById('surnameEdit').value,
                    birthYear: document.getElementById('yearEdit').valueAsNumber,
                    gender: genderEdit,
                    email: document.getElementById('emailEdit').value,
                    phone: document.getElementById('phoneEdit').value,
                };
                fetchRegistrations(`registrations/${reg.id}`, 'PUT', upReg)
                    .then((response) => {
                    return response.json();
                })
                    .then((data) => {
                    console.log(data);
                    resultTable.style.display = "block";
                    resultEdit.style.display = "none";
                    loadData();
                });
            };
            document.getElementById('deleteRegistration').onclick = () => {
                fetchRegistrations(`registrations/${reg.id}`, 'DELETE', null)
                    .then((response) => {
                    return response.json();
                })
                    .then((data) => {
                    resultTable.style.display = "flex";
                    resultEdit.style.display = "none";
                    loadData();
                });
            };
        };
    });
};
