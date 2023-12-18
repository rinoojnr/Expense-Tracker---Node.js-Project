let amount = document.getElementById('amount');
let description = document.getElementById('description')
let category = document.getElementById('category');
let addExpenseForm = document.getElementById('addexpense');
let status = document.getElementById('status');
let buyPremiumButton = document.getElementById('payment-button');
let showLeaderBoard = document.getElementById('show-leaderboard');
let leaderBoard = document.getElementById('ldrbd');
let downLoadButton = document.getElementById('download-button');
let paginationDiv = document.getElementById('pagination');
let selectLimit = document. getElementById('select-limit');
// let addedExpens = document.getElementById('addedexpense');
// let deleteExpense = document.getElementById('delete-expense-div');


let baseURL ='http://localhost:3000';
// let baseURL ='http://16.16.213.212/:3000';

function selectLimits(){
    const token = localStorage.getItem('token');
    axios.get(`${baseURL}/expense/getexpense?page=${1}&limit=${selectLimit.value}`,{headers: {"Authentication" : token}})
    .then((res)=>{
        showPagination(res.data);
        showOnScreen(res.data.expenses)
    })
    .catch(err=>console.log(err))
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function showButton(){ 
    let statusHTML = ``;
    statusHTML+=``;
    statusHTML+=` You are a premium user now `;
    document.getElementById('status').innerHTML = statusHTML;
    document.getElementById('payment-button').style.visibility = 'hidden';
    document.getElementById('show-leaderboard').style.visibility = 'visible'
}


window.addEventListener('DOMContentLoaded',()=>{
    const token = localStorage.getItem('token');
    // const isPremium = localStorage.getItem("isPremium");
    const decodedToken = parseJwt(token);
    const isPremium = decodedToken.isPremium
    if(isPremium){
        showButton()
    }
    let page = 1;
    let sLimit = selectLimit.value;
    axios.get(`${baseURL}/expense/getexpense?page=${page}&limit=${sLimit}`,{headers: {"Authentication" : token}})
    .then((res)=>{
        showPagination(res.data);
        showOnScreen(res.data.expenses)
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
        refresh(1)
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
            // let statusHTML = ``;
            // statusHTML+=``;
            // statusHTML+=`<font color="red"> You are a premium user now </font>`;
            // document.getElementById('status').innerHTML = statusHTML;
            // document.getElementById('payment-button').style.visibility = 'hidden';
            console.log(res2)
            localStorage.setItem('token',res2.data.token);
            showButton()
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



function deleteItem(id) {
    const token = localStorage.getItem("token")
    axios.delete(`${baseURL}/expense/deleteexpense/${id}`,{headers:{"Authentication": token}})
    .then((res)=>{
        refresh(1)
    })
    .catch(err=>{
        console.log(err);
        let statusHTML = ``;
        statusHTML+=`<font color="red">Error : `+err.response.data.message+`</font>`;
        document.getElementById('status').innerHTML = statusHTML
    })
}

function showOnScreen(data){
        let innerExpense = ``;
        if(data.length==0){
            innerExpense+=`<font color="white"><h1 align="center" >No Expenses<h1></font>`
            document.getElementById('addedexpense').innerHTML = innerExpense;
        }
        if(data.length){
            for(let i=0;i<data.length;i++){
                innerExpense+=`<li class="display-expense">${data[i].category} -- ${data[i].description} -- ${data[i].amount}Rs.`+
                `<button type="button" id=${data[i].id} class=\"delete-buttton\" onclick="deleteItem(id)">`+`Delete Expense`+`</button>`+`</li>`;
                document.getElementById('addedexpense').innerHTML = innerExpense;
            }
        }else{
            document.getElementById('addedexpense').innerHTML = innerExpense;
        }
        


    

    // let li = document.createElement('li');
    // let text = document.createTextNode(`${data.category} -- ${data.description} -- ${data.amount}Rs.`);
    // li.appendChild(text);
    // let deleteButton = document.createElement('input');
    // deleteButton.type = 'button';
    // deleteButton.value = 'Delete Expense';
    // li.appendChild(deleteButton);
    // addedExpense.appendChild(li);
    // deleteButton.onclick = () =>{
    //     console.log(data.id)
    //     const token = localStorage.getItem("token")
    //     axios.delete(`${baseURL}/expense/deleteexpense/${data.id}`,{headers:{"Authentication": token}})
    //     .then((res)=>{
    //         addedExpense.removeChild(li); 
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //         let statusHTML = ``;
    //         statusHTML+=`<font color="red">Error : `+err.response.data.message+`</font>`;
    //         document.getElementById('status').innerHTML = statusHTML
    //     })
    // }
}

showLeaderBoard.addEventListener('click',(e)=>{
    e.preventDefault();
    const token = localStorage.getItem("token")
    axios.get(`${baseURL}/premium/leaderboard`,{headers: {"Authentication": token}})
    .then((res)=>{
        for(let i=0;i<res.data.length;i++){
            showLeaderBoardFunction(res.data[i])
        }
        console.log(res.data.totlaExpenseWithUser);
    
    })
})



function showLeaderBoardFunction(data){
    const username = data.username;
    const total_cost = (data.totalexpense === null)? 0:data.totalexpense;
    let li = document.createElement('li');
    let text = document.createTextNode(`Name: ${username} -- ${total_cost}Rs.`);
    li.appendChild(text);
    leaderBoard.appendChild(li);
}

downLoadButton.addEventListener('click',()=>{
    let token = localStorage.getItem('token');
    axios.get(`${baseURL}/user/download/`,{headers: {"Authentication": token} })
    .then((response)=>{
        if(response.status === 200){
            let a = document.createElement('a');
            a.href = response.data.fileUrl;
            a.download = 'expense.txt';
            a.click();
        }else{
            throw new Error(response.data.message);
        }
        
    })
    .catch((err)=>{
        let statusHTML = ``;
        statusHTML+=`<font color="red">Error : `+err.response.data.message+`</font>`;
        document.getElementById('status').innerHTML = statusHTML
    })
})

function showPagination({
    curendPage,hasPrevPage,hasNextPage
}){
    if(hasPrevPage){
        // let inner = ``;
        // inner+=`<font color="red">Error :</font> `;
        // document.getElementById('paginations').innerHTML = inner

        // let prev = document.createElement('input');
        // prev.type = "button";
        // prev.value = "Previous"
        // paginationDiv.appendChild(prev);
        // prev.onclick = () =>{
        //     getExpense(JSON.parse(curendPage)-1)
        // }
        let innerPrev = ``;
        innerPrev+=`<input id=\"previous-buttton\" type = "button" value = "Previous">`;
        document.getElementById('pagination-previous').innerHTML = innerPrev
        document.getElementById('previous-buttton').onclick = function() {
            getExpense(JSON.parse(curendPage)-1)
        }
    }else{
        let innerPrev = ``;
        document.getElementById('pagination-previous').innerHTML = innerPrev
    }
    if(curendPage){
        // let curend = document.createElement('input');
        // curend.type = "button";
        // curend.value = curendPage;
        // paginationDiv.appendChild(curend);
        let innerCurrend = ``;
        innerCurrend+=`<input type = "button" value = ${curendPage}>`;
        document.getElementById('paginations-currend').innerHTML = innerCurrend
    }
    if(hasNextPage){
    //     let next = document.createElement('input');
    //     next.type = "button";
    //     next.value = "Next"
    //     paginationDiv.appendChild(next);
    //     next.onclick = () =>{
    //         getExpense(JSON.parse(curendPage)+1)
    //     }
        let innerNext = ``;
        innerNext+=`<input id=\"next-buttton\" type = "button" value = "Next">`;
        document.getElementById('paginations-next').innerHTML = innerNext
        document.getElementById('next-buttton').onclick = function() {
            getExpense(JSON.parse(curendPage)+1)
            refresh(curendPage+1)
        }
    
    }else{
        let innerNext = ``;
        document.getElementById('paginations-next').innerHTML = innerNext

    }
}


function getExpense(page){
    const token = localStorage.getItem('token');
    const sLimit = selectLimit.value;
    console.log(sLimit,"..");
    axios.get(`${baseURL}/expense/getexpense?page=${page}&limit=${sLimit}`,{headers: {"Authentication": token}})
    .then((res)=>{
        showPagination(res.data)
        showOnScreen(res.data.expenses)

    })
    .catch()
}


function refresh(c){
    const token = localStorage.getItem('token');
    let page = c;
    let sLimit = selectLimit.value;
    axios.get(`${baseURL}/expense/getexpense?page=${page}&limit=${sLimit}`,{headers: {"Authentication" : token}})
    .then((res)=>{
        showPagination(res.data);
        showOnScreen(res.data.expenses)
    })
    .catch(err=>console.log(err))
}