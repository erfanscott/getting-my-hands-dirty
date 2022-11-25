const currentUser = users[Number(sessionStorage.getItem("user"))-1]
console.log(currentUser)
document.getElementsByTagName("main")[0].innerHTML =
`
                    <div class="card" style="width: 18rem;">
                    <img src="https://picsum.photos/200/300?random=1" class="card-img-top" alt="..." style="height: 18rem;">
                    <div class="card-body">
                    <h2 class="card-title">${currentUser.firstName} ${currentUser.lastName}</h2>
                    </div>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">Address: ${currentUser.address}</li>
                    <li class="list-group-item">Phone: ${currentUser.phone}</li>
                    </ul>
                    </div>
`

