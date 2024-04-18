import { Registration } from "./registration.js";
import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";

export const showData = (registrationData: Registration[]) => {
    let dataTableBody = <HTMLElement>document.getElementById('dataTableBody');
    let resultTable = <HTMLElement>document.getElementById('resultTable');
    let resultEdit = <HTMLElement>document.getElementById('resultEdit');

    dataTableBody.innerHTML = '';
    resultTable.style.display = 'flex';

    registrationData.forEach((reg) => {
        const tr = document.createElement('tr');

        const tdName = document.createElement('td');
        tdName.innerHTML = reg.name;

        const tdSurname = document.createElement('td');
        tdSurname.innerHTML = reg.surname;

        const tdBirthYear = document.createElement('td');
        tdBirthYear.innerHTML = reg.birthYear.toString();

        tr.appendChild(tdName);
        tr.appendChild(tdSurname);
        tr.appendChild(tdBirthYear);
    
        dataTableBody.appendChild(tr);

        tr.onclick=()=>{
            resultTable.style.display = 'none';
            resultEdit.style.display = 'flex';

            (<HTMLInputElement>document.getElementById('nameEdit')).value = reg.name;
            (<HTMLInputElement>document.getElementById('surnameEdit')).value = reg.surname;
            (<HTMLInputElement>document.getElementById('yearEdit')).valueAsNumber = reg.birthYear;
            if (reg.gender === 'Vaikinas') {
                (<HTMLInputElement>document.getElementById('maleEdit')).checked = true;
            } else if (reg.gender === 'Mergina') {
                (<HTMLInputElement>document.getElementById('femaleEdit')).checked = true;
            } else {
                (<HTMLInputElement>document.getElementById('maleEdit')).checked = false;
                (<HTMLInputElement>document.getElementById('femaleEdit')).checked = false;
            }
            (<HTMLInputElement>document.getElementById('emailEdit')).value = reg.email;
            (<HTMLInputElement>document.getElementById('phoneEdit')).value = reg.phone;
            
            (<HTMLButtonElement>document.getElementById('updateRegistration')).onclick = () => {
                const genderEdit = (<HTMLInputElement>document.getElementById('maleEdit')).checked ? 'Vaikinas' : (<HTMLInputElement>document.getElementById('femaleEdit')).checked ? 'Mergina' : 'nepasirinkta';

                const upReg: Registration = {
                    name: (<HTMLInputElement>document.getElementById('nameEdit')).value,
                    surname: (<HTMLInputElement>document.getElementById('surnameEdit')).value,
                    birthYear: (<HTMLInputElement>document.getElementById('yearEdit')).valueAsNumber,
                    gender: genderEdit,
                    email: (<HTMLInputElement>document.getElementById('emailEdit')).value,
                    phone: (<HTMLInputElement>document.getElementById('phoneEdit')).value,
                }
                fetchRegistrations(`registrations/${reg.id}`, 'PUT', upReg)
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    console.log(data);
                    resultTable.style.display="flex";
                    resultEdit.style.display="none";
                    loadData();
                })
            }
            (<HTMLButtonElement>document.getElementById('deleteRegistration')).onclick = () => {
                fetchRegistrations(`registrations/${reg.id}`, 'DELETE', null)
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    resultTable.style.display="flex";
                    resultEdit.style.display="none";
                    loadData();
                })
            }
        }
    })
}