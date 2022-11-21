
function renderTable(users){
    const tableBodyEl = document.querySelector("tbody");
    tableBodyEl.innerHTML = ``;
    users.forEach(user => {
        const newContact = document.createElement("tr");
        newContact.innerHTML = `
        <th scope="row">${user.id}</th>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.address}</td>
        <td>${user.phone}</td>
        <td>
            <div class="btn-group btn-group-md">
                <button  data-edit-btn-id=${user.id} type="button" class="btn btn-info edit-btn" data-bs-toggle="modal" data-bs-target="#edit-modal">Edit</button>
                <button  data-delete-btn-id=${user.id} type="button" class="btn btn-danger del-btn" data-bs-toggle="modal" data-bs-target="#delete-modal">Delete</button>
            </div>
        </td>
    `;

        tableBodyEl.append(newContact);


})

deleteEventsSetup()
editEventsSetup()


}

const sortByEl = document.getElementById("sort-by")
const sortOrder = document.getElementById("sort-order")

sortByEl.addEventListener("change",event =>{
    const sortedUsers = sort(event.currentTarget.value,sortOrder.value)
    renderTable(sortedUsers) 
})

sortOrder.addEventListener("change",event =>{
    if(!sortByEl.value){return}
    const sortedUsers = sort(sortByEl.value,event.currentTarget.value)
    renderTable(sortedUsers) 
})






const searchEl = document.getElementById("search-box")

searchEl.addEventListener("input", event => {
    searchUser(event.target.value)
})

function editEventsSetup(){
    const editSubmitBtnEl = document.querySelector("#edit-submit")
    const editBtnEls = document.querySelectorAll(".edit-btn")


    
    editBtnEls.forEach(editBtnEl => editBtnEl.addEventListener('click',()=>{


        
        const clickedUsertId = Number(editBtnEl.dataset.editBtnId)
        const clickedUsertIndex = users.findIndex(user => user.id === clickedUsertId)
        editSubmitBtnEl.setAttribute("data-clicked-user-index",`${clickedUsertIndex}`)

        document.querySelector("#edit-contact-first-name-field").value = users[clickedUsertIndex].firstName
        document.querySelector("#edit-contact-last-name-field").value = users[clickedUsertIndex].lastName
        document.querySelector("#edit-contact-address-field").value = users[clickedUsertIndex].address
        document.querySelector("#edit-contact-phone-field").value = users[clickedUsertIndex].phone
    
        })


    )

    
}



function deleteEventsSetup(){
    const delBtnEls = document.querySelectorAll(".del-btn")
    const deleteConfirmationBtn = document.querySelector("#delete-confirmation")
    delBtnEls.forEach(delBtnEl => {
        delBtnEl.addEventListener("click",()=>{
            deleteConfirmationBtn.dataset.clickedUser = `${delBtnEl.dataset.deleteBtnId}`
    })
    })
}

function addSuubmitHandler(){
    const newName = document.querySelector("#add-contact-first-name-field").value
    const newLastName = document.querySelector("#add-contact-last-name-field").value
    const newAddress = document.querySelector("#add-contact-address-field").value
    const newPhone = document.querySelector("#add-contact-phone-field").value
    addUser(newName,newLastName,newAddress,newPhone)
    document.querySelector("#add-contact-first-name-field").value = ''
    document.querySelector("#add-contact-last-name-field").value = ''
    document.querySelector("#add-contact-address-field").value = ''
    document.querySelector("#add-contact-phone-field").value = ''

}

function editSuubmitHandler(){
    const editSubmitBtnEl = document.querySelector("#edit-submit")
    const clickedUsertId = parseInt(editSubmitBtnEl.dataset.clickedUserIndex)

    users[clickedUsertId].firstName = document.querySelector("#edit-contact-first-name-field").value
    users[clickedUsertId].lastName = document.querySelector("#edit-contact-last-name-field").value
    users[clickedUsertId].address = document.querySelector("#edit-contact-address-field").value
    users[clickedUsertId].phone = document.querySelector("#edit-contact-phone-field").value

    renderTable(users);

    document.querySelector("#edit-contact-first-name-field").value = ''
    document.querySelector("#edit-contact-last-name-field").value = ''
    document.querySelector("#edit-contact-address-field").value = ''
    document.querySelector("#edit-contact-phone-field").value = ''
    
}

function deleteConfirmClickHandler(){
    const deleteConfirmationBtn = document.querySelector("#delete-confirmation")
    deleteUser(parseInt(deleteConfirmationBtn.dataset.clickedUser))
}