function add(){
    let name=document.getElementById("name").value;
    let amt=document.getElementById("amt").value;
    let category=document.getElementById("category").value;
    let date=document.getElementById("date").value;

    let output=document.getElementById("output");

    let row= output.insertRow(output.rows.length);

    row.insertCell(0).innerHTML=name;
    row.insertCell(1).innerHTML=amt;
    row.insertCell(2).innerHTML=category;
    row.insertCell(3).innerHTML=date;
    row.insertCell(4).innerHTML= '<button onclick="editRow(this)">Edit</button>' + '<button onclick="deleteRow(this)">Delete</button>';
    
    clear();
}

function deleteRow(btn){
    let row=btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}



function editRow(btn){

}


function clear(){
    document.getElementById("name").value="";
    document.getElementById("amt").value="";
    document.getElementById("category").value="";
    document.getElementById("date").value="";
}


