// function add(){
//     let name=document.getElementById("name").value;
//     let amt=document.getElementById("amt").value;
//     let category=document.getElementById("category").value;
//     let date=document.getElementById("date").value;

//     let output=document.getElementById("output");

//     let row= output.insertRow(output.rows.length);

//     row.insertCell(0).innerHTML=name;
//     row.insertCell(1).innerHTML=amt;
//     row.insertCell(2).innerHTML=category;
//     row.insertCell(3).innerHTML=date;
//     row.insertCell(4).innerHTML= '<button onclick="editRow(this)">Edit</button>' +"  "+ '<button onclick="deleteRow(this)">Delete</button>';
    
//     clear();
// }

// function deleteRow(btn){
//     let row=btn.parentNode.parentNode;
//     row.parentNode.removeChild(row);
// }



// function editRow(btn){

// }



// function updateTotal(){
//     let table=document.getElementById("output");
//     let total=0;
//     for (let i=1; i<table.rows.length; i++){
//         let amountValue=parseFloat(table.rows[i].cells[1].innerHTML);
//         if (!isNaN(amountValue)) {
//             total+=amountValue;
//         }
//     }
//     document.getElementById("totalDisplay").innerHTML="Total: $" + total.toFixed(2);
// }


// function clear(){
//     document.getElementById("name").value="";
//     document.getElementById("amt").value="";
//     document.getElementById("category").value="";
//     document.getElementById("date").value="";
// }



// Store all expenses in an array
let expenses = [];

function add() {
  let name = document.getElementById("name").value;
  let amt = document.getElementById("amt").value;
  let category = document.getElementById("category").value;
  let date = document.getElementById("date").value;

  if (name === "" || amt === "" || category === "" || date === "") {
    alert("Please fill in all fields!");
    return;
  }

  if (isNaN(amt) || Number(amt) <= 0) {
    alert("Please enter a valid amount!");
    return;
  }

  let expense = {
    id: Date.now(),
    name: name,
    amt: parseFloat(amt),
    category: category,
    date: date
  };

  expenses.push(expense);

  renderTable();
  updateTotal();
  clearInputs();
}

function renderTable() {
  let table = document.getElementById("output");

  // Remove all rows except the header
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  let filter = document.getElementById("filterCategory").value;

  for (let i = 0; i < expenses.length; i++) {
    let expense = expenses[i];

    if (filter !== "" && expense.category !== filter) {
      continue;
    }

    let row = table.insertRow();
    row.setAttribute("data-id", expense.id);

    row.insertCell(0).innerHTML = expense.name;
    row.insertCell(1).innerHTML = "$" + expense.amt.toFixed(2);
    row.insertCell(2).innerHTML = expense.category;
    row.insertCell(3).innerHTML = expense.date;
    row.insertCell(4).innerHTML =
      '<button onclick="openEditModal(' + expense.id + ')">Edit</button>' +
      "&nbsp;&nbsp;" +
      '<button onclick="deleteRow(' + expense.id + ')">Delete</button>';
  }
}

function deleteRow(id) {
  // Remove that expense from the array by ID
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });

  renderTable();
  updateTotal();
}

// ─── EDIT MODAL ───────────────────────────────────────────────

function openEditModal(id) {
  // Find the expense we want to edit
  let expense = expenses.find(function (e) {
    return e.id === id;
  });

  // Fill the modal inputs with the existing data
  document.getElementById("editId").value = expense.id;
  document.getElementById("editName").value = expense.name;
  document.getElementById("editAmt").value = expense.amt;
  document.getElementById("editCategory").value = expense.category;
  document.getElementById("editDate").value = expense.date;

  // Show the modal
  document.getElementById("editModal").style.display = "flex";
}

function saveEdit() {
  // Get the ID of the expense being edited
  let id = Number(document.getElementById("editId").value);

  let newName = document.getElementById("editName").value;
  let newAmt = document.getElementById("editAmt").value;
  let newCategory = document.getElementById("editCategory").value;
  let newDate = document.getElementById("editDate").value;

  if (newName === "" || newAmt === "" || newCategory === "" || newDate === "") {
    alert("Please fill in all fields!");
    return;
  }

  if (isNaN(newAmt) || Number(newAmt) <= 0) {
    alert("Please enter a valid amount!");
    return;
  }

  // Find the expense in the array and update it
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id === id) {
      expenses[i].name = newName;
      expenses[i].amt = parseFloat(newAmt);
      expenses[i].category = newCategory;
      expenses[i].date = newDate;
      break;
    }
  }

  closeEditModal();
  renderTable();
  updateTotal();
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

// ─── TOTAL & FILTER ───────────────────────────────────────────

function updateTotal() {
  let total = 0;
  let filter = document.getElementById("filterCategory").value;

  for (let i = 0; i < expenses.length; i++) {
    let expense = expenses[i];
    if (filter === "" || expense.category === filter) {
      total += expense.amt;
    }
  }

  document.getElementById("totalDisplay").innerHTML =
    "Total: $" + total.toFixed(2);
}

function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("amt").value = "";
  document.getElementById("category").value = "";
  document.getElementById("date").value = "";
}

// Re-render when filter changes
document.getElementById("filterCategory").addEventListener("change", function () {
  renderTable();
  updateTotal();
});

