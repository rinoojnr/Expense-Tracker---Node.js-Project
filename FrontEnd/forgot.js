let emailForm = document.getElementById('forgot-password-form');
let mail = document.getElementById('forgot-password-email');
let baseURL ='http://localhost:3000';

emailForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const mailid = mail.value;
    axios.get(`password/forgot`)
});