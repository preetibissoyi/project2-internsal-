const collegeModel = require("../model/CollegeModel");
const InternModel = require("../model/InternModel");

const {
  isValidShortName,
  isValidLink,
  isValidFullName,
} = require("../validator/validator");

// API MADE BY JIVAN
const CreateCollege = async function (req, res, next) {
  try {
    const collage = await collegeModel.create(req.body);
    res.status(201).json({
      status: true,
      data: {
        logoLink: collage.logoLink,
        fullName: collage.fullName,
        name: collage.name,
      },
    });
  } catch (error) {
    return next(error);
  }
};
// JIVAN

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
    if (!isValidShortName(collegeName))
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
        status: false,
        message: "there is no students is applied for internship",
      });
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
