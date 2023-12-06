let amount = document.getElementById('amount');
let description = document.getElementById('description')
let category = document.getElementById('category');
let addExpenseForm = document.getElementById('addexpense');
let addedExpense = document.getElementById('addedexpense');
let status = document.getElementById('status');
let buyPremiumButton = document.getElementById('payment-button');
let showLeaderBoard = document.getElementById('show-leaderboard');
let leaderBoard = document.getElementById('ldrbd')

let baseURL ='http://localhost:3000';

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function showButton(name){
    let statusHTML = ``;
        statusHTML+=``;
        statusHTML+=`<font color="red"> is premium user now </font>`;
        document.getElementById('status').innerHTML = statusHTML;
        document.getElementById('payment-button').style.visibility = 'hidden';
}

window.addEventListener('DOMContentLoaded',()=>{
    const token = localStorage.getItem('token');
    // const isPremium = localStorage.getItem("isPremium");
    const decodedToken = parseJwt(token);
    console.log(decodedToken)
    const isPremium = decodedToken.isPremium
    if(isPremium){
        showButton()
    }
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
    const response = await axios.get(`${baseURL}/premium/purchase`,{headers: {"Authentication": token}})
    var options = {
            "key": response.data.key_id,
            "order_id": response.data.order.id,
            "handler": async function(response){
                res2 = await axios.post(`${baseURL}/premium/purchaseu`,{
                    order_id: options.order_id,
                      payment_id: response.razorpay_payment_id,
                },{headers: {"Authentication": token}})
            alert("You are a premium user now")
            localStorage.setItem("isPremium",true)
            let statusHTML = ``;
            statusHTML+=``;
            statusHTML+=`<font color="red"> You are a premium user now </font>`;
            document.getElementById('status').innerHTML = statusHTML;
            document.getElementById('payment-button').style.visibility = 'hidden';
            console.log(res2)
            localStorage.setItem('token',res2.data.token)
            }
    }
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed',function(response){
        console.log(response);
        alert("somthing went wrong")
        localStorage.setItem("isPremium",false)
        let statusHTML = ``;
        statusHTML+=``;
        statusHTML+=`<font color="red"> Transaction failes </font>`;
        document.getElementById('status').innerHTML = statusHTML;
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


showLeaderBoard.addEventListener('click',(e)=>{
    e.preventDefault();
    const token = localStorage.getItem("token")
    axios.get(`${baseURL}/premium/leaderboard`,{headers: {"Authentication": token}})
    .then((res)=>{
        console.log(res,"/////")
        for(let i=0;i<res.data.length;i++){
            showLeaderBoardFunction(res.data[i])
        }
        console.log(res.data.totlaExpenseWithUser);
    
    })
})


function showLeaderBoardFunction(data){
    console.log(data)
    let li = document.createElement('li');
    let text = document.createTextNode(`Name: ${data.username} -- ${data.total_cost}Rs.`);
    li.appendChild(text);
    leaderBoard.appendChild(li);
}