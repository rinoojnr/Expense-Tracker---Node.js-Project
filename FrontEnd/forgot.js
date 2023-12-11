let emailForm = document.getElementById('forgot-password-form');
let mail = document.getElementById('forgot-password-email');
let baseURL ='http://localhost:3000';

emailForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const mailid = mail.value;
    console.log(mailid)
    const token = localStorage.getItem('token');
    axios.post(`${baseURL}/password/forgotpassword`,{mailid: mailid},{
        headers: {"Authentication" : token}
    })
    .then((res)=>console.log("its okeay"))
});
