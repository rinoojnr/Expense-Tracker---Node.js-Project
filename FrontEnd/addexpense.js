let amount = document.getElementById('amount');
let description = document.getElementById('description')
let category = document.getElementById('category');
let addExpenseForm = document.getElementById('addexpense');
let addedExpense = document.getElementById('addedexpense');

let baseURL ='http://localhost:3000';

window.addEventListener('DOMContentLoaded',()=>{
    const token = localStorage.getItem('token');
    axios.get(`${baseURL}/expense/getexpense`,{headers: {"Authentication" : token}})
    .then((res)=>{
        console.log(res)
        for(let i = 0;i<res.data.length;i++){
            showOnScreen(res.data[i])
        }
    })
    .catch(err=>console.log(err))
})

addExpenseForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token');
    let expenseData = {
        amount: amount.value,
        description: description.value,
        category: category.value,
        userId: token
    }
    axios.post(`${baseURL}/expense/addexpense`,expenseData)
    .then((res)=>{
        showOnScreen(res.data)

    }).catch(err=>console.log(err))
});

function showOnScreen(data){
    let li = document.createElement('li');
    let text = document.createTextNode(`${data.category} -- ${data.description} -- ${data.amount}Rs.`);
    li.appendChild(text);
    let deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.value = 'Delete Expense';
    li.appendChild(deleteButton);
    addedExpense.appendChild(li);
    deleteButton.onclick = () =>{
        console.log(data.id)
        
        axios.delete(`${baseURL}/expense/deleteexpense/${data.id}`)
        .then((res)=>{
            addedExpense.removeChild(li); 
        })
        .catch(err=>console.log(err))
    }
}