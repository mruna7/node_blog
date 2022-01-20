interface user 
{    id:String,
    name:String,
    userType:Usertype,
    email:String
}

enum Usertype{
    BLOGGER,
    READER,
    GUEST
}