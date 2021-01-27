const express = require("express");
const multer = require("multer");
const path = require("path");
const setFilePathToBody = require("../middlewares/setFilePathToBody");
const { catchErrors } = require("../handlers/errorHandlers");

const router = express.Router();

const userController = require("../controllers/userController");
const patientController = require("../controllers/patientController");

// //_______________________________ User management_______________________________

var userPhotoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/user");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const userPhotoUpload = multer({ storage: userPhotoStorage });

router
  .route("/user/create")
  .post(
    [userPhotoUpload.single("photo"), setFilePathToBody],
    catchErrors(userController.create)
  );
router.route("/user/read/:id").get(catchErrors(userController.read));
router.route("/user/update/:id").patch(catchErrors(userController.update));
router.route("/user/delete/:id").delete(catchErrors(userController.delete));
router.route("/user/search").get(catchErrors(userController.search));
router.route("/user/list").get(catchErrors(userController.list));
router.route("/user/profile").get(catchErrors(userController.profile));
router.route("/user/status/:id").patch(catchErrors(userController.status));
router
  .route("/user/photo")
  .post(
    [userPhotoUpload.single("photo"), setFilePathToBody],
    catchErrors(userController.photo)
  );
router
  .route("/user/password-update/:id")
  .patch(catchErrors(userController.updatePassword));
//list of users ends here

// //_______________________________________API for patients_____________________
router.route("/patient/create").post(catchErrors(patientController.create));
router.route("/patient/read/:id").get(catchErrors(patientController.read));
router
  .route("/patient/update/:id")
  .patch(catchErrors(patientController.update));
router
  .route("/patient/delete/:id")
  .delete(catchErrors(patientController.delete));
router.route("/patient/search").get(catchErrors(patientController.search));
router.route("/patient/list").get(catchErrors(patientController.list));
router.route("/patient/filter").get(catchErrors(patientController.filter));

module.exports = router;
