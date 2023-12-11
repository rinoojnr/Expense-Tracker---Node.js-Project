const AWS = require('aws-sdk');

const uploadToS3 = (data,filename) => {
    let s3bucket = new AWS.S3({
        accessKeyId: process.env.IAM_USER_KEY,
        secretAccessKey: process.env.IAM_USER_SECRET,

    })

    // s3bucket.createBucket(()=>{  //WHEN NEEDED A NEW BUCKET
        var params = {
            Bucket: process.env.BUCKET_NAME,
            Key: filename,
            Body: data,
            ACL: 'public-read'
        }
        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,(err,s3response)=>{
                if(err){
                    console.log(err)
                    reject(err);
                }else{
                    console.log('success',s3response);
                    resolve(s3response.Location);   
                }
            // });
        })
        })
        
}


module.exports ={
    uploadToS3
}