// eylemlerle ilgili ara katman yazılımları yazın


// projects ara yazılımları buraya
//imports
const actionsModel = require('../actions/actions-model')

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
 
function validateProjectPostPayload (req,res,next){
  try {  
  const {description,notes,completed } = req.body;
  if (!description||!notes||completed.length==0){
    res.status(400).json({message:"Gerekli alanlar eksiktir."})
  }else{
    next()
  }
  } catch (error) {
    next(error)
  }
}

module.exports = {validateIdPayload,validateProjectPostPayload};