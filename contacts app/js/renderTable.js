
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
                <button  data-detail-btn-id=${user.id} type="button" class="btn btn-warning detail-btn" >Detail</button>
            </div>
        </td>
    `;

        tableBodyEl.append(newContact);


})
// sortEventSetup()
// sortEventSetup()
deleteEventsSetup()
editEventsSetup()
detailEventSetup()


}

// const sortByEl = document.getElementById("sort-by")
// const sortOrder = document.getElementById("sort-order")

sortByEl.addEventListener("change",event =>{
    const sortedUsers = sort(event.currentTarget.value,sortOrder.value,searchUser(searchEl.value,users))
    renderTable(sortedUsers ) 
})

sortOrder.addEventListener("change",event =>{
    const sortedUsers = sort(sortByEl.value,event.currentTarget.value,searchUser(searchEl.value,users))
    renderTable(sortedUsers) 
})






// const searchEl = document.getElementById("search-box")

searchEl.addEventListener("input", event => {
    
    const filteredUsers = searchUser(event.target.value,users)
    renderTable(sort(sortByEl.value,sortOrder.value,filteredUsers))
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

    saveUsersToTheLocalStorage()

    const filteredUsers = searchUser(searchEl.value,users)
    renderTable(sort(sortByEl.value,sortOrder.value,filteredUsers))

    document.querySelector("#edit-contact-first-name-field").value = ''
    document.querySelector("#edit-contact-last-name-field").value = ''
    document.querySelector("#edit-contact-address-field").value = ''
    document.querySelector("#edit-contact-phone-field").value = ''
    
}

function deleteConfirmClickHandler(){
    const deleteConfirmationBtn = document.querySelector("#delete-confirmation")
    deleteUser(parseInt(deleteConfirmationBtn.dataset.clickedUser))
}


function detailEventSetup(){
    const detailBtns = document.querySelectorAll(".detail-btn")
    detailBtns.forEach(btn => {
        btn.addEventListener("click",() => {
            window.location.assign("./user.html")
            sessionStorage.setItem("user",btn.dataset.detailBtnId)
        })
    })
}

