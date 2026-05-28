import api
from "../api/axios";

const getUsers =
(token) => {

 return api.get(
   "/users",

   {
     headers: {
       Authorization:
       `Bearer ${token}`
     }
   }
 );
};

export default {
 getUsers
};