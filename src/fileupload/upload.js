const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
  

        cb(null,"../public/images/uploads")
    },
    filename: function (req, file, cb) {
      cb(null,"image-" + Date.now()+".jpg")
    }
  })
  const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
  

        cb(null,"../public/images/users")
    },
    filename: function (req, file, cb) {
      cb(null,"image-" + Date.now()+".jpg")
    }
  })
const imageUpload = multer({
    storage: storage,
    limits: {
      fileSize: 1000000 
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
})
const userImageUpload = multer({
  storage: storage2,
  limits: {
    fileSize: 1000000 
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) { 
       return cb(new Error('Please upload a Image'))
     }
   cb(undefined, true)
}
})
module.exports = {imageUpload,userImageUpload}