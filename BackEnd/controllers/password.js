const uuid = require('uuid');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');


const User = require('../models/signup');
const Forgotpassword = require('../models/forgotpassword');

exports.forgotpassword = async (req, res) => {
    try {
        const email =  req.body.mailid;
        const user = await User.findOne({where: {useremail: email}});;
        if(user){
            const id = uuid.v4();
            Forgotpassword.create({id,active:true,userId: user.id})
                .catch(err => {
                    throw new Error(err)
                })


            sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

            const msg = {
                to: email,
                from: 'rinoojnr2003@gmail.com',
                subject: 'Hey user, lost your password?',
                html: `<h1>Click Here And Change Your Password</h1><br>
                <a href="http://13.51.6.80/:3000/password/resetpassword/${id}">Reset password</a>`
            }
            
            sgMail
            .send(msg)
            .then((response) => {
                return res.json({message: 'okeay', sucess: true})

            })
            .catch((error) => {
                throw new Error(error);
            })
        }else {
            throw new Error('User not found')
        }
    } catch(err){
        return res.json({ message: err, sucess: false });
    }

}

exports.restPassword = async(req,res) =>{
    const id = req.params.id;
    const fpasswordReq = await Forgotpassword.findOne({where:{id}})
    if(fpasswordReq){
        fpasswordReq.update({active: false});
        res.status(200).send(`<html>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
            res.end()
    }
}

exports.updatePassword = async(req,res) =>{
    const newpassword = req.query.newpassword;
    const resetpasswordId = req.params.id;
    const fpasswordReq = await Forgotpassword.findOne({where: {id: resetpasswordId}}); 
    const findUser = await User.findOne({where: {id:fpasswordReq.userId}});
    if(findUser){
        const salt = 10;
        const passwordHash = await bcrypt.hash(newpassword,salt);
        findUser.update({userpassword: passwordHash})
        res.send(`<h1>Password Updated</h1>`);
    }
    
}