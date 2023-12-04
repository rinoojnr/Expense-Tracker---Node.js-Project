// const { options } = require("../BackEnd/routes/expens");

let amount = document.getElementById('amount');
let description = document.getElementById('description')
let category = document.getElementById('category');
let addExpenseForm = document.getElementById('addexpense');
let addedExpense = document.getElementById('addedexpense');
let status = document.getElementById('status');
let buyPremiumButton = document.getElementById('payment-button');

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
    axios.post(`${baseURL}/expense/addexpense`,expenseData,{headers: {"Authentication": token}})
    .then((res)=>{
        showOnScreen(res.data)

    }).catch(err=>console.log(err))
});

buyPremiumButton.addEventListener('click',async(e)=>{
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseURL}/payment/purchasepremium`,{headers: {"Authentication": token}})
    var options = {
            "key": response.data.key_id,
            "order_id": response.data.order.id,
            "handler": async function(response){
                await axios.post(`${baseURL}/payment/purchasepremiumupdate`,{
                    order_id: options.order_id,
                      payment_id: response.razorpay_payment_id,
                },{headers: {"Authentication": token}})
            alert("You are a premium user now")
            },
    }
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed',function(response){
        console.log(response);
        alert("somthing went wrong")
    })
})





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
        const token = localStorage.getItem("token")
        axios.delete(`${baseURL}/expense/deleteexpense/${data.id}`,{headers:{"Authentication": token}})
        .then((res)=>{
            addedExpense.removeChild(li); 
        })
        .catch(err=>{
            console.log(err);
            let statusHTML = ``;
            statusHTML+=`<font color="red">Error : `+err.response.data.message+`</font>`;
            document.getElementById('status').innerHTML = statusHTML
        })
    }
}