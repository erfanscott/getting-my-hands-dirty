function saveUsersToTheLocalStorage(){
    const stringifiedUsers = JSON.stringify(users)
    localStorage.setItem("users",stringifiedUsers)
}

function loadUsersFromTheLocalStorage(){
    return localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : []
}








function sort(sortBy,sortOrder,sortInputArray){
    console.log(sortBy);
    console.log(sortOrder);
    console.log(sortInputArray);
   
   
    if(!sortBy){return sortInputArray}

    let _sortBy
     

    switch (sortBy){

        case "first-name":
            _sortBy = "firstName"
        break

        case "last-name":
            _sortBy = "lastName"
        break 
        case "address":
            _sortBy = "address"

    }
    

    return  sortInputArray.sort(function(a,b){
                let x = a[_sortBy].toLowerCase()
                let y = b[_sortBy].toLowerCase()

                if(x<y) {return sortOrder==="ascending" ? -1 : 1}
                if(x>y) {return sortOrder==="ascending" ? 1 : -1}
                return 0
            })
    

}
// return sortOrder==="ascending" ? -1 : 1






function searchUser(searchedKey,searchedArray){
    
    const  searchResults = searchedArray.filter(user => {
        for(let key in user) {
            if(String(user[key]).search(searchedKey) != -1){
                return true
            }
        }
        return false
    })
   
    return searchResults
   
}









function deleteUser(id){

    users.splice(id-1,1);
    for(let i=id-1; i<users.length; i++){
        users[i].id--;
    }
    saveUsersToTheLocalStorage()


    const filteredUsers = searchUser(searchEl.value,users)
    renderTable(sort(sortByEl.value,sortOrder.value,filteredUsers))
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

    saveUsersToTheLocalStorage()
    const filteredUsers = searchUser(searchEl.value,users)
    renderTable(sort(sortByEl.value,sortOrder.value,filteredUsers))
   
}