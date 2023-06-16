// "project" routerını buraya yazın!
// 1 Imports
const router = require('express').Router();
const projectsModel = require('./projects-model')
const {validateIdPayload,validateProjectPostPayload} = require('./projects-middleware')

// 2 Middlewares 


// 3 Routers
//Task 1 [GET] /api/projects
router.get('/',async (req,res,next)=>{
  try {
    const allProjects = await projectsModel.get()
    res.json(allProjects)
    
  } catch (error) {
    next(error);
  }
})
//Task 2 [GET] /api/projects/:id
router.get('/:id',validateIdPayload,async (req,res,next)=>{
  try {
    res.json(req.current)
    
  } catch (error) {
    next(error);
  }
})

//Task 3 [POST] /api/projects
router.post('/',validateProjectPostPayload,async(req,res,next)=>{
  try {
    const insertedProject = await projectsModel.insert(req.body)
    res.json(insertedProject);
  } catch (error) {
    next(error);
  }
})
//Task 4 [PUT] //api/projects/:id
router.put('/:id',validateIdPayload,validateProjectPostPayload, async(req,res,next)=>{
  try {
    const updatedProject = await projectsModel.update(req.current.id,req.body)
    res.status(201).json(updatedProject);
   
  } catch (error) {
    next(error);
  }
})

//Task 5 [DELETE] /api/projects/:id
router.delete('/:id',validateIdPayload, async(req,res,next)=>{
  try {
    const deletedProject = req.current;
    await projectsModel.remove(req.current.id)
    res.status(200).json(deletedProject);
  } catch (error) {
    next(error);
  }
})
//Task 6 [GET] /api/projects/:id/actions

router.get('/:id/actions',validateIdPayload, async(req,res,next)=>{
  try {
    const projectActions = await projectsModel.getProjectActions(req.current.id)
    res.status(200).json(projectActions);
  } catch (error) {
    next(error);
  }
})

// 4 Errors


// 5 Exports
module.exports = router;