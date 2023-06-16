// eylemlerle ilgili ara katman yazılımları yazın


// projects ara yazılımları buraya
//imports
const actionsModel = require('../actions/actions-model')
const projectModel =require('../projects/projects-model')

async function validateIdPayload (req,res,next){
  try {  
  const { id } = req.params;
  const isExistProject = await actionsModel.get(id);
  !isExistProject ? res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" }): 
  req.current = isExistProject;
  next(); 
 
  } catch (error) {
    next(error)
  }
}
 
async function validateProjectPostPayload (req,res,next){
  try {  
  const {description,notes,project_id} = req.body;
  if (!description||!notes||!project_id||typeof(project_id)!="number"){
    res.status(400).json({message:"Gerekli alanlar eksiktir."})
  }else{
    const existProject = await projectModel.get(project_id);
    if(!existProject){
      res.status(400).json({message:"Geçerli Id olup olmadığını kontrol ediniz"});
    }else{
      next()
    }
  }
  } catch (error) {
    next(error)
  }
}

module.exports = {validateIdPayload,validateProjectPostPayload};