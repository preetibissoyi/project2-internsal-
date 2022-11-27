const InternModel = require('../model/InternModel');
const CollegeModel = require('../model/CollegeModel')
const { isValidName, isValidEmail, isValidMobile, isValidId } = require('../validator/validator')



let CreateIntern = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        let data = req.body;
        const { name, email, mobile , collegeName } = data
     if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, msg:"Oops Body is Empty" })
        if (!name) return res.status(400).send({ status: false, msg: "Intern Name is mandatory" });
        if (!isValidName(name)) return res.status(400).send({ status: false, msg: "invalid Intern Name" });
       
        if (!email) return res.status(400).send({ status: false, msg: " Intern email is Mandatory" });
        if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: "invalid email" });

        let DuplicateEmail = await InternModel.findOne({ email: data.email })
        if (DuplicateEmail) return res.status(400).send({ status: false, msg: "this email is already exist" })


        if (!mobile) return res.status(400).send({ status: false, msg: " mobile Number is  Mandatory" });
        if (!isValidMobile(mobile)) return res.status(400).send({ status: false, msg: "invalid mobile Number " });

        let DuplicateNumber = await InternModel.findOne({ mobile: data.mobile})
     if (DuplicateNumber) return res.status(400).send({ status: false, msg: "this number is already exist" });

       const getCollegeDetails = await CollegeModel.findOne({ name: collegeName})
 if (!getCollegeDetails) return res.status(404).send({ status: false, message: "college not found" })

       const collegeId = getCollegeDetails._id
       if (!isValidId(collegeId)) return res.status(400).send({ status: false, msg: "invalid  College Id" });
       const allInternsData = { name, email, mobile,  collegeId}

       const intern = await InternModel.create(allInternsData) 

       return res.status(201).send({status:true,data: intern })
        
        

        
    }
    catch(error){
        return res.status(500).send({status: false, message: error.message})

    }
}

//*********************************************************************************** */


module.exports.CreateIntern = CreateIntern;
