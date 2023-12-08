const AWS = require('aws-sdk');

const uploadToS3 = (data,filename) => {
    const BUCKET_NAME = '';
    const IAM_USER_KEY = '';
    const IAM_USER_SECRET = '';

    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        ACL: 'public-read'

    })

    // s3bucket.createBucket(()=>{  //WHEN NEEDED A NEW BUCKET
        var params = {
            Bucket: BUCKET_NAME,
            Key: filename,
            Body: data
        }
        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,(err,s3response)=>{
                if(err){
                    console.log(err)
                    reject(err);
                }else{
                    console.log('successw',s3response);
                    resolve(s3response.Location);   
                }
            // });
        })
        })
        
}


module.exports ={
    uploadToS3
}