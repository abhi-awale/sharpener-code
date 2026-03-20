const API = "http://localhost:4000/api"

let token = localStorage.getItem("token")

if (token) showDashboard()

function showDashboard(){
document.getElementById("authSection").style.display="none"
document.getElementById("dashboard").style.display="block"

loadCategories()
loadExpenses()
}


// REGISTER

async function register(){

const name=document.getElementById("regName").value
const email=document.getElementById("regEmail").value
const password=document.getElementById("regPassword").value

const res=await fetch(`${API}/auth/register`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name,email,password,confirmPassword:password})
})

const data=await res.json()

alert(data.message)
}


// LOGIN

async function login(){

const email=document.getElementById("loginEmail").value
const password=document.getElementById("loginPassword").value

const res=await fetch(`${API}/auth/login`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email,password})
})

const data=await res.json()

token=data.data.accessToken

localStorage.setItem("token",token)

showDashboard()
}


// LOGOUT

function logout(){
localStorage.removeItem("token")
location.reload()
}


// CREATE CATEGORY

async function createCategory(){

const name=document.getElementById("categoryName").value

await fetch(`${API}/categories`,{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({name})
})

loadCategories()
}


// LOAD CATEGORIES

async function loadCategories(){

const res=await fetch(`${API}/categories`,{
headers:{Authorization:`Bearer ${token}`}
})

const data=await res.json()

const select=document.getElementById("categorySelect")

select.innerHTML=""

data.data.forEach(c=>{

const option=document.createElement("option")

option.value=c.id
option.textContent=c.name

select.appendChild(option)

})

}


// CREATE EXPENSE

async function createExpense(){

const amount=document.getElementById("amount").value
const categoryId=document.getElementById("categorySelect").value
const paymentMethod=document.getElementById("paymentMethod").value
const description=document.getElementById("description").value

await fetch(`${API}/expenses`,{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({amount,categoryId,paymentMethod,description})
})

loadExpenses()

}


// LOAD EXPENSES

async function loadExpenses(){

const res=await fetch(`${API}/expenses`,{
headers:{Authorization:`Bearer ${token}`}
})

const data=await res.json()

const table=document.getElementById("expenseTable")

table.innerHTML=""

data.data.forEach(e=>{

const row=document.createElement("tr")

row.innerHTML=`
<td>${e.id}</td>
<td>${e.amount}</td>
<td>${e.category?.name || ""}</td>
<td>${e.description || ""}</td>
<td>
<button class="btn btn-sm btn-danger" onclick="deleteExpense(${e.id})">Delete</button>
</td>
`

table.appendChild(row)

})

}


// DELETE EXPENSE

async function deleteExpense(id){

await fetch(`${API}/expenses/${id}`,{
method:"DELETE",
headers:{Authorization:`Bearer ${token}`}
})

loadExpenses()

}