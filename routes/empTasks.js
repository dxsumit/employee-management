
const router = require("express").Router();
const Task = require('../models/Task');
const Employee = require('../models/employee')
const authorize = require('../middleware/authorization')



router.get('/', (req, res) => {

    res.status(200).json({status: "success", msg: "This is Task page"});
});

// add task to the user...
router.post('/add/:empId', authorize, async (req, res) => {

    try{

        const {empId} = req.params;
        const {title, description, dueDate} = req.body

        if( !(title && description))
            return res.status(400).json({status: "error", msg: "All fields are required.."});

        
        // check if employee exist or not
        try{
            const isTabel = await Employee.findOne({_id: empId});
            if(!isTabel){
                return res.status(404).json({status: 'failed', msg: "Employee does not exist"});
            }

        }
        catch(err){
            return res.status(404).json({status: 'failed', msg: "Employee does not exist"});
        }


        const newData = new Task({
            empID: empId,
            title,
            description,
            dueDate
        })
 
        // save user in database..
        await newData.save()

        res.status(201).json({status: 'successful', msg: newData});

    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }
})


// get all tasks assigned to everyone of the table..
router.get('/all', authorize, async (req, res) => {

    try{

        const allTasks = await Task.find();

        res.status(200).json({status: 'successful', msg: allTasks});
    }
    catch(err) {

        res.status(500).json({status: 'failed', msg: err});
    }

})


// find all tasks of a employee..
router.get('/find/:empId', authorize, async (req, res) => {

    try{

        const {empId} = req.params;

        // check if employee exist or not
        try{
            const isTabel = await Employee.findOne({_id: empId});
            if(!isTabel){
                return res.status(404).json({status: 'failed', msg: "Employee does not exist"});
            }

        }
        catch(err){
            return res.status(404).json({status: 'failed', msg: "Employee does not exist"});
        }


        // access the unique employee
        const foundEmployee = await Task.find({empID: empId});

        if(!foundEmployee)
            return res.status(404).json({status: 'failed', msg: 'ID not found.'});
        

        res.status(200).json({status: 'successful', msg: foundEmployee});
    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }
})


// delete a task in table
router.delete('/delete/:id', authorize, async (req, res)=>{

    try{
        const {id} = req.params

        // access the unique employee
        const foundTask = await Task.findOneAndDelete({_id:id});

        if(!foundTask)
            return res.status(404).json({status: 'failed', msg: 'ID not found.'});
        
        res.status(200).json({status: 'successful', msg: foundTask});
    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }
});


// patch perticular task..
router.patch('/update/:id', authorize, async (req, res)=>{
 
    try{
        
        const {id} = req.params;

        // access the unique table of the user
        const updatedTask = await Task.findOneAndUpdate({_id:id }, req.body, {
            new: true,
            runValidators: true
        });

        if(!updatedTask)
            return res.status(404).json({status: 'failed', msg: 'ID not found.'});
        
        res.status(200).json({status: 'successful', msg: updatedTask});
    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }

});




module.exports = router;


