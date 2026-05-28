import asyncHandler
from "../utils/asyncHandler.js";

import User
from "../models/user.model.js";

import ApiResponse
from "../utils/ApiResponse.js";

export const
getUsers =
asyncHandler(
 async (
   req,
   res
 ) => {

   const users =
     await User.find({

       _id: {
         $ne:
         req.user._id
       }

     }).select(
       "name email avatar isOnline"
     );

   return res
     .status(200)
     .json(
       new ApiResponse(
         200,
         "Users fetched",
         users
       )
     );
 });