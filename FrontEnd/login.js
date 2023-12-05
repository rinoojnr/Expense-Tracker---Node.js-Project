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
        console.log(res)
        let statusHTML = ``;
        statusHTML+=``;
        document.getElementById('status').innerHTML = statusHTML;
        alert("Login Successfully");
        console.log(res.data,"////////////////////////")
        localStorage.setItem('token',res.data.token)
        window.location.href = "file:///home/anupama/Desktop/trackerApp/FrontEnd/addexpense.html";
    })
    .catch((err)=>{
        console.log(err)
        let statusHTML = ``;
        statusHTML+=`<font color="red">Error : `+err.response.message+`</font>`;
        document.getElementById('status').innerHTML = statusHTML
    });
})