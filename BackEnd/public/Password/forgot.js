let emailForm = document.getElementById('forgot-password-form');
let mail = document.getElementById('forgot-password-email');
// let baseURL ='http://localhost:3000';
let baseURL ='http://13.51.6.80/:3000';

emailForm.addEventListener('submit',(e)=>{
    console.log("lll")
    e.preventDefault();
    const mailid = mail.value;
    console.log(mailid)
    const token = localStorage.getItem('token');
    axios.post(`${baseURL}/password/forgotpassword`,{mailid: mailid},{
        headers: {"Authentication" : token}
    })
    .then((res)=>{{
        console.log(res)
        if(res.data.sucess=false){
            throw new Error()
            console.log("kk")
        }
        let statusHTML = ``;
        statusHTML+=`<font color="green"> `+ `Please Check Your Email`+`</font>`;
        document.getElementById('status').innerHTML = statusHTML;
    }})
    .catch((err)=>{
        let statusHTML = ``;
        console.log(err,"//")
        statusHTML+=`<font color="red">Error : `+ err.message+`</font>`;
        document.getElementById('status').innerHTML = statusHTML;
    })
        
});
