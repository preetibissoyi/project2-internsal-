
const collegeModel = require("../model/CollegeModel");
const InternModel = require("../model/InternModel");
const { isValidFullName, isValidLink, isValidShortName } = require("../validator/validator");




 const CreateCollege = async function(req, res){
  try{
let data = req.body
const{name, fullName, logoLink} = data

if(Object.keys(req.body).length==0) return res.status(400).send({status: false , msg: "body is empty"})
if(!name) return res.status(400).send({status: true, msg: "name is mandatory"});
if(!isValidShortName(name)) return res.status(400).send({status: false, msg: "invalid College name"});

let DuplicateName = await collegeModel.findOne({name:data.name});
if(DuplicateName) return res.status(400).send({status: false, msg: "name is already exist"});


if(!fullName)  return res.status(400).send({status: false, msg: " full name is mandatory"});
if(!isValidFullName(fullName)) return res.status(400).send({status: false,msg: "invalid college"});

if(!logoLink) return res.status(400).send({status: false, msg: "logoLink is mandatory"});
if(!isValidLink(logoLink)) return res.status(400).send({status: false, msg:" invalid logoLink"});

let savedData = await collegeModel.create(data);
return res.status(201).send({status: true, msg: "College Created",data: savedData})
  }
  catch(error){
    return res.status(500).send({status: false, messag: error.message})
  }
 }

//****************************************************************************************/
const collegeDetails = async function (req, res) {
  try {
    if (Object.keys(req.query).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "Query param is empty" });
    let collegeName = req.query.collegeName;

    if (collegeName.length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "please provide college name" });
    if (!isValidFullName(collegeName))
      return res.status(400).send({ status: false, msg: "invalid collegName" });

    let college = await collegeModel
      .findOne({
        name: collegeName.toLowerCase(),
      })
      .select({ name: 1, fullName: 1, logoLink: 1 });
    if (!college)
      return res.status(400).send({ status: false, msg: "college not found" });
    let internName = await InternModel.find({ collegeId: college._id }).select({
      name: 1,
      email: 1,
      mobile: 1,
      _id: 1,
    });
    if (internName.length === 0)
      return res.status(404).send({
        status: false,message: "there is no students is applied for internship  from this college", College:college.fullName,});
    let allInterns = {
      name: college.name,
      fullName: college.fullName,
      logoLink: college.logoLink,
      interns: internName,
    };
    return res.status(200).send({ status: true, data: allInterns });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
module.exports.CreateCollege = CreateCollege;
module.exports.collegeDetails = collegeDetails;
