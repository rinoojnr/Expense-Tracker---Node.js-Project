let userName =document.getElementById('username');
let userEmail = document.getElementById('useremail');
let userPassword = document.getElementById('userpassword');
let signUpForm = document.getElementById('signup');
let status = document.getElementById('status');
let baseURL ='http://localhost:3000';
// let baseURL ='http://51.20.132.39:3000';



signUpForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let userData = {
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value
    }
    axios.post(`${baseURL}/user/signup`,userData)
    .then((res)=>{
        window.location.href = "/home/anupama/Desktop/Sharpener Main/9.trackerApp/FrontEnd/login.html";
        console.log(res,"success");
    }).catch((err)=>{
        console.log(err,"..")
        let statusHTML = ``;
        statusHTML+=`<font color="red">Error : `+ err.response.data.message+`</font>`;
        document.getElementById('status').innerHTML = statusHTML;
    })
})