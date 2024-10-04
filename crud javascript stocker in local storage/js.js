let Form = document.getElementById("Form");
let nom = document.getElementById("nom");
let email = document.getElementById("email");
let dataTable = document.getElementById("dataTable").querySelector("tbody");
let create = document.getElementById('Create');
let deleteAllBtn = document.getElementById('DeleteAll'); // Add this line
let mood = 'create'; // It was created to distinguish between create and update
let tmp;
//declaration vide darray
let ClientForm;

if (localStorage.Client != null) {
    ClientForm = JSON.parse(localStorage.Client);
} else {
    ClientForm = [];
}


// Fct to clear form data after adding or updating
function clearData() {
    nom.value = '';
    email.value = '';
}
// Fct to display data in the table
function showData() {
    let tableContent = ''; // Initialize table content

    for (let i = 0; i < ClientForm.length; i++) {
        tableContent += `<tr>
            <td>${ClientForm[i].nom}</td>
            <td>${ClientForm[i].email}</td>
            <td>
                <button onclick="editData(${i})">Edit</button>
                <button onclick="deleteData(${i})">Delete</button>
            </td>
        </tr>`;
    }

    deleteAllBtn.style.display = ClientForm.length > 0 ? 'block' : 'none'; // Show or hide the button
    dataTable.innerHTML = tableContent; // Populate the table
}

// Fct to handle form submission
create.onclick = function () {
    let newClient = {
        nom: nom.value,
        email: email.value
    };

    if (mood === 'create') {
        ClientForm.push(newClient);
    } else {
        ClientForm[tmp] = newClient;
        mood = 'create';
        create.innerHTML = 'Ajouter';
    }

    localStorage.setItem('Client', JSON.stringify(ClientForm));

    clearData();
    showData();
};

// Fct to edit data
function editData(index) {
    nom.value = ClientForm[index].nom;
    email.value = ClientForm[index].email;
    mood = 'update';
    create.innerHTML = 'Update';
    tmp = index;
}

// Fct to delete data
function deleteData(index) {
    ClientForm.splice(index, 1);
    localStorage.setItem('Client', JSON.stringify(ClientForm));
    showData();
}

// Fct to delete all data
function deleteAll() {
    ClientForm = []; // Clear the array
    localStorage.removeItem('Client'); // Remove the 'Client' item from localStorage
    showData(); // Update the table to reflect the changes
}

// Initial call to display data on page load
showData();
