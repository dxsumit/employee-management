
const router = require("express").Router();
const Employee = require('../models/employee');
const authorize = require('../middleware/authorization')



router.get('/', (req, res) => {

    res.status(200).json({status: "success", msg: "This is employee page"});
});

// add employee in table...
router.post('/add', authorize, async (req, res) => {

    try{

        const {name, email, phone, hireDate, position} = req.body

        if( !(name && email && phone && position))
            return res.status(400).json({status: "error", msg: "All fields are required.."});


        const newData = new Employee({
            name,
            email,
            phone,
            hireDate,
            position
        })
 
        // save user in database..
        await newData.save()

        res.status(201).json({status: 'successful', msg: newData});

    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }
})


// get all contacts of the table..
router.get('/all', authorize, async (req, res) => {

    try{

        const allEmployees = await Employee.find();

        res.status(200).json({status: 'successful', msg: allEmployees});
    }
    catch(err) {

        res.status(500).json({status: 'failed', msg: err});
    }

})


// find an contact in table..
router.get('/find/:id', authorize, async (req, res) => {

    try{

        const {id} = req.params;

        // access the unique employee
        const foundContact = await Employee.findOne({_id:id});

        if(!foundContact)
            return res.status(404).json({status: 'failed', msg: 'ID not found.'});
        
        res.status(200).json({status: 'successful', msg: foundContact});
    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }
})


// delete an employee in table
router.delete('/delete/:id', authorize, async (req, res)=>{

    try{
        const {id} = req.params

        // access the unique employee
        const foundTask = await Employee.findOneAndDelete({_id:id});

        if(!foundTask)
            return res.status(404).json({status: 'failed', msg: 'ID not found.'});
        
        res.status(200).json({status: 'successful', msg: foundTask});
    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }
});


// patch perticular fields..
router.patch('/update/:id', authorize, async (req, res)=>{

    try{
        
        const {id} = req.params;

        // access the unique table of the user
        const updatedTask = await Employee.findOneAndUpdate({_id:id }, req.body, {
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


