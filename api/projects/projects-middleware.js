// projects ara yazılımları buraya
//imports
const projectsModel = require('./projects-model')

//Functions

// async function IdCreator (){
//   const allProjects = await projectsModel.get().length
//   let id = allProjects+1;
//   return id;
// }

async function validateIdPayload (req,res,next){
  try {  
  const { id } = req.params;
  const isExistProject = await projectsModel.get(id);
  !isExistProject ? res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" }): 
  req.current = isExistProject;
  next(); 
 
  } catch (error) {
    next(error)
  }
}
 
function validateProjectPostPayload (req,res,next){
  try {  
  const {name,description,completed } = req.body;
  if (!name||!description||completed.length==0){
    res.status(400).json({message:"Geçerli"})
  }else{
    next()
  }
  } catch (error) {
    next(error)
  }
}

module.exports = {validateIdPayload,validateProjectPostPayload};