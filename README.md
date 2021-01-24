# Reto_Back_Erix_mamaniVillacresis
Postman - https://www.postman.com/collections/005b7597975f30073791

ENDPOINTS: 

# /api/course/getCourses
# /api/course/getCourse/:id

# /api/course/createCourse (protegida)

Headers: 
{
    Authorization: Bearer (token generado por el login)
}

{
    "newCourse": {
        "name": "Flutter course edited test",
        "description": "40h Flutter course from 0.1!",
        "picture": "https://media.zeemly.com/zeemly/product/flutter.png...",
        "price": "17.99"      
    }
}


# /api/course/editCourse/:id (protegida)
{
    "actualCourse": {
        "name": "Flutter course edited test",
        "description": "40h Flutter course from 0!",
        "picture": "https://media.zeemly.com/zeemly/product/flutter.png",
        "price": "17.99"      
    }
}

# /api/course/delete/:id (protegida)

# /api/users/getUserByEmail
{
    "email": "erix12@gmail.com"
}



