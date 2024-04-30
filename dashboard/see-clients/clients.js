var form = document.getElementById("myForm"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    city = document.getElementById("city"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()


function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td>${element.employeeName}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>


            <td>
                <button class="btn btn-success" onclick="readInfo('${element.employeeName}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(name, city, email, phone){
    document.querySelector('#showName').value = name,
    document.querySelector("#showCity").value = city,
    document.querySelector("#showEmail").value = email,
    document.querySelector("#showPhone").value = phone
}

const goToDash = document.getElementById('go-to-dash');
goToDash.addEventListener('click', () => {
    window.location.href = '../../dashboard/dashboard.html'
})

const returnBtn = document.getElementById('return');
returnBtn.addEventListener('click', () => {
    window.location.href = '../../index.html'
})