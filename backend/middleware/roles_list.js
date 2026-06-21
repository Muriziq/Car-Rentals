const rolesList = {
    users: 1324,
    editior: 4321,
    admin: 5876
}
const verifyRoles = (...allowedRoles)=>{
    return (
        (req,res,next)=>{
            const roles = req.roles || []
            const matchRoles = roles.some(role=>allowedRoles.includes(role))
            if(!matchRoles){
                return res.status(403).json({msg:"Forbidden"})
            }
            
            next();
        }
    )
    }


module.exports = {rolesList,verifyRoles}