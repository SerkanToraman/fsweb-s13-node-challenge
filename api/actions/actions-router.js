// "eylem" routerını buraya yazın
// 1 Imports
const router = require('express').Router();
const actionModel = require('./actions-model');
const {validateIdPayload,validateProjectPostPayload} = require('./actions-middlware')

// 2 Middlewares 

// 3 Routers
//Task 1 [GET] /api/actions
router.get('/',async (req,res,next)=>{
  try {
    const allActions = await actionModel.get()
    res.json(allActions)
    
  } catch (error) {
    next(error);
  }
})
//Task 2 [GET] /api/actions/:id
router.get('/:id',validateIdPayload,async (req,res,next)=>{
  try {
    res.json(req.current)
    
  } catch (error) {
    next(error);
  }
})
//Task 3 [POST] /api/actions
router.post('/',validateProjectPostPayload,async(req,res,next)=>{
  try {
    const insertedAction = req.body;
    insertedAction.project_id = 2;
    await actionModel.insert(insertedAction)
    res.json(insertedAction);
  } catch (error) {
    next(error);
  }
})

//Task 4 [PUT] //api/actions/:id
router.put('/:id',validateIdPayload,validateProjectPostPayload, async(req,res,next)=>{
  try {
    const updatedActionBody = req.body;
    updatedActionBody.project_id = 1;
    const updatedAction = await actionModel.update(req.current.id,updatedActionBody)
    res.status(201).json(updatedAction);
   
  } catch (error) {
    next(error);
  }
})

//Task 5 [DELETE] /api/actions/:id
router.delete('/:id',validateIdPayload, async(req,res,next)=>{
  try {
    const deletedAction = req.current;
    await actionModel.remove(req.current.id)
    res.status(200).json(deletedAction);
  } catch (error) {
    next(error);
  }
})
// 4 Errors


// 5 Exports

module.exports = router;