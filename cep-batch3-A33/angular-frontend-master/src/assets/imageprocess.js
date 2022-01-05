var awsS3Url = 'https://s3.amazonaws.com/';
var albumBucketName = 'cepslsupload';
var albumUrl = awsS3Url + albumBucketName + "/";
var bucketRegion = 'us-east-1';
var IdentityPoolId = 'us-east-1:b7dd4112-7759-466b-99d0-7c8edf3e244d';
var albumName = 'test-album';
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:b7dd4112-7759-466b-99d0-7c8edf3e244d',
});
AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});
var s3 = new AWS.S3({
apiVersion: "2006-03-01",
params: { Bucket: albumBucketName }
});
function getHtml(template) {
    return template.join('\n');
}
function viewAlbum(albumName) {
var albumPhotosKey = encodeURIComponent(albumName) + "/";
s3.listObjects({ Prefix: albumPhotosKey }, function(err, data) {
    if (err) {
        return alert("There was an error viewing your album: " + err.message);
    }
    var href = this.request.httpRequest.endpoint.href;
    var bucketUrl = href + albumBucketName + "/";
                
    var photos = data.Contents.map(function(photo) {
        var photoKey = photo.Key;
        var photoUrl = bucketUrl + encodeURIComponent(photoKey);
        return photoUrl + "<br>";
    });
    
    var htmlTemplate = [
    getHtml(photos),
    '<input id="photoupload" type="file" accept="image/*">',
    '<button id="addphoto" onclick="addPhoto(\'' + albumName + "')\">",
    "Upload",
    "</button>"
    ];
    document.getElementById("app").innerHTML = getHtml(htmlTemplate);
});
}

function addPhoto(albumName, file) {
// var files = document.getElementById("photoupload").files;
// if (!files.length) {
//     return alert("Please choose a file to upload first.");
// }
// var file = files[0];
var file = file
var fileName = file.name; 
var albumPhotosKey = encodeURIComponent(albumName) + "/";
var photoKey = albumPhotosKey + fileName;
var upload = new AWS.S3.ManagedUpload({
    params: {
    Bucket: albumBucketName,
    Key: photoKey,
    Body: file,
    ACL: "public-read"
    }
});
var promise = upload.promise();
// promise.then(
//     function(data) {
//     alert("Uploaded photo URL:" + albumUrl + photoKey);
//     //viewAlbum(albumName);
//     return albumUrl + photoKey;
//     },
//     function(err) {
//         return alert("There was an error uploading your photo: ", err.message);
//     }
// );
return promise

}
//viewAlbum(albumName);