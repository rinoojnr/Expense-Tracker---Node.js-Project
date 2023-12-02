let userEmail = document.getElementById('email');
let userPassword = document.getElementById('password');
let loginForm = document.getElementById('login');

let baseURL ='http://localhost:3000';


loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let data ={
        email: userEmail.value,
        password: userPassword.value
    }
    axios.post(`${baseURL}/user/login`,data)
    .then((res)=>{
        console.log("success")
    })
    .catch((err)=>{
        let statusHTML = ``;
        statusHTML+=`<font color="red">Error : `+err.message+`</font>`;
        document.getElementById('status').innerHTML = statusHTML
    });
})