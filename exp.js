let editingRow=null;

function editRow(btn){
    editingRow=btn.parentNode.parentNode;

    document.getElementById("editName").value=editingRow.cells[0].innerHTML;
    document.getElementById("editAmt").value=editingRow.cells[1].innerHTML;
    document.getElementById("editCategory").value=editingRow.cells[2].innerHTML;
    document.getElementById("editDate").value=editingRow.cells[3].innerHTML;

    document.getElementById("editModal").style.display="block";
}

function closeModal(){
    document.getElementById("editModal").style.display="none";
    editingRow=null;
}

function saveEdit(event){
    event.preventDefault();

    if (editingRow) {
        editingRow.cells[0].innerHTML=document.getElementById("editName").value;
        editingRow.cells[1].innerHTML=parseFloat(document.getElementById("editAmt").value).toFixed(2);
        editingRow.cells[2].innerHTML=document.getElementById("editCategory").value;
        editingRow.cells[3].innerHTML=document.getElementById("editDate").value;

        updateTotal();
    }
    closeModal();
}

function add(event){
    event.preventDefault();

    let name=document.getElementById("name").value.trim();
    let amt=parseFloat(document.getElementById("amt").value);
    let category=document.getElementById("category").value;
    let date=document.getElementById("date").value;
    let output=document.getElementById("output");

    if (editingRow!==null) {
        editingRow.cells[0].innerHTML=name;
        editingRow.cells[1].innerHTML=amt.toFixed(2);
        editingRow.cells[2].innerHTML=category;
        editingRow.cells[3].innerHTML=date;

        editingRow=null;
    } 
    else {
        let row=output.insertRow(output.rows.length);
        row.insertCell(0).innerHTML=name;
        row.insertCell(1).innerHTML=amt.toFixed(2);
        row.insertCell(2).innerHTML=category;
        row.insertCell(3).innerHTML=date;
        row.insertCell(4).innerHTML=
            '<button onclick="editRow(this)">Edit</button>' +
            '<button onclick="deleteRow(this)">Delete</button>';
    }
    clear();
    updateTotal();
}



function deleteRow(btn){
    let row=btn.parentNode.parentNode;
    row.parentNode.removeChild(row);

    updateTotal();
    document.getElementById("filterCategory").value="";
    filterFunction();
}

function updateTotal(){
    let table=document.getElementById("output");
    let total=0;

    for (let i=1; i<table.rows.length; i++) {
        let row=table.rows[i];
        if (row.style.display!=="none") {
            let amountValue=parseFloat(row.cells[1].innerHTML);
            if (!isNaN(amountValue)){
                total+=amountValue;
            }
        }
    }

    document.getElementById("totalDisplay").innerHTML="Total: $" + total.toFixed(2);
}

function clear(){
    document.getElementById("name").value="";
    document.getElementById("amt").value="";
    document.getElementById("category").value="";
    document.getElementById("date").value="";
}

function filterFunction(){
    let selected=document.getElementById("filterCategory").value;
    let table=document.getElementById("output");

    for (let i=1; i<table.rows.length; i++) {
        let row=table.rows[i];
        let rowCategory=row.cells[2].innerHTML;

        if (selected==="" || rowCategory===selected){
            row.style.display="";
        } else{
            row.style.display="none";
        }
    }
    updateTotal();
}
