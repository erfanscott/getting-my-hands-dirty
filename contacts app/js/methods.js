function sort(sortBy,sortOrder){
    let toBeSortedUsers = users
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
    

    return  toBeSortedUsers.sort(function(a,b){
                let x = a[_sortBy].toLowerCase()
                let y = b[_sortBy].toLowerCase()

                if(x<y) {return sortOrder==="ascending" ? -1 : 1}
                if(x>y) {return sortOrder==="ascending" ? 1 : -1}
                return 0
            })
    

}
// return sortOrder==="ascending" ? -1 : 1






function searchUser(searchedKey){
    const  searchResults = users.filter(user => {
        for(let key in user) {
            if(String(user[key]).search(searchedKey) != -1){
                return true
            }
        }
        return false
    })
    renderTable(searchResults)
   
}









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
   
}