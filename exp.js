function add(){
    document.getElementById("message").innerHTML="New expense added successfully.";

    let name=document.getElementById("name").value;
    let amt=document.getElementById("amt").value;
    let category=document.getElementById("category").value;
    let date=document.getElementById("date").value;
    let output=document.getElementById("output");

    if (editingRow!==null){
      editingRow.cells[0].innerHTML=name;
      editingRow.cells[1].innerHTML=amt;
      editingRow.cells[2].innerHTML=category;
      editingRow.cells[3].innerHTML=date;

      editingRow=null;
      document.getElementById("message").innerHTML="Expense edited successfully.";
    } 

    else{
      let row= output.insertRow(output.rows.length);
      row.insertCell(0).innerHTML=name;
      row.insertCell(1).innerHTML=amt;
      row.insertCell(2).innerHTML=category;
      row.insertCell(3).innerHTML=date;
      row.insertCell(4).innerHTML= '<button onclick="editRow(this)">Edit</button>' +"  "+ '<button onclick="deleteRow(this)">Delete</button>';
    }

    clear();
    updateTotal();
}



//row bata value liyera input fields ma halera store garne
let editingRow = null;
function editRow(btn){

    document.getElementById("message").innerHTML="Edit your details in the input field and click Add Expense button to save your updates."


    let row = btn.parentNode.parentNode;

    let name=row.cells[0].innerHTML;
    let amt=row.cells[1].innerHTML;
    let category=row.cells[2].innerHTML;
    let date=row.cells[3].innerHTML;

    document.getElementById("name").value = name;
    document.getElementById("amt").value = amt;
    document.getElementById("category").value = category;
    document.getElementById("date").value = date;

    editingRow = row;
}




function deleteRow(btn){

    let row=btn.parentNode.parentNode;
    row.parentNode.removeChild(row);

    document.getElementById("message").innerHTML = "Expense deleted successfully.";
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

    document.getElementById("totalDisplay").innerHTML="Total: $" +total.toFixed(2);
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

    for (let i=1; i<table.rows.length; i++){
        let row=table.rows[i];
        let rowCategory= row.cells[2].innerHTML;

        if (selected==="" || rowCategory===selected){
            row.style.display="";
            
        } 
        else{
            row.style.display="none";
        }
    }

    if (selected===""){
        document.getElementById("message").innerHTML="All expenses are shown.";
    } 
    else{
        document.getElementById("message").innerHTML="Expenses filtered by " +selected + ".";
    }
    updateTotal();
}


