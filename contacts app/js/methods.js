

function deleteUser(id){

    users.splice(id-1,1);
    for(let i=id-1; i<users.length; i++){
        users[i].id--;
    }
    console.log(users);


   
    renderTable(users);
}

function addUser(newFirstName,newLastName,newAddress,newPhone){
    const newId = users.length+1;
    users.push({
        id:newId,
        firstName:newFirstName,
        lastName:newLastName,
        address:newAddress,
        phone:newPhone
    }) 

    renderTable(users);
//     const newContactEl = document.createElement("tr");
//     newContactEl.innerHTML = `
//     <th scope="row">${newId}</th>
//     <td>${firstName}</td>
//     <td>${lastName}</td>
//     <td>${address}</td>
//     <td>${phone}</td>
//     <td>
//         <div class="btn-group btn-group-md">
//             <button  data-edit-btn-id=${newId} type="button" class="btn btn-info edit-btn">Edit</button>
//             <button  data-delete-btn-id=${newId} type="button" class="btn btn-danger del-btn" data-bs-toggle="modal" data-bs-target="#delete-modal">Delete</button>
//         </div>
//     </td>
// `;

    // const tableBodyEl = document.querySelector("tbody");
    // tableBodyEl.append(newContactEl);
   
}