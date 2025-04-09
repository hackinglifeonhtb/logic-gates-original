const express = require("express");
const cors = require("cors");
const User = require('./app/models/User.model')
const Course = require('./app/models/Course.model')
const Comment = require('./app/models/Comment.model')
const Ticket = require('./app/models/Ticket.model')
const Product = require('./app/models/Product.model')
const TicketComments = require('./app/models/TicketComments.model')
const Notification = require('./app/models/Notification.model')
const Exams = require('./app/models/Exam.model')
const Cart = require('./app/models/Cart.model')
const Consultation = require('./app/models/Consultation.model')
const { create_post_as_ticket, send_comment } = require('./Bot')
const app = express();
const db = require('./app/config/db.config')
const mongoose = require('mongoose')
var corsOptions = {
  origin: "http://localhost:3000"
};
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1801542",
  key: "19c2eb03ffadb575a377",
  secret: "de83506a624ba01d3193",
  cluster: "ap2",
  useTLS: true
});

app.use(express.static(__dirname + '/build'));
app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));
//server.js// parse requests of content-type - application/json
app.use(express.json());
/*db.sequelize.sync().then(() => {
  console.log('Users table created successfully!');
  User.create({
    firstName: "Clean Code",
    secondName: "Robert Cecil Martin",
    email: "logic2tubes@gmail.com",
    password: "",
    release_date: "2021-12-14",
  }).then(res => {
    console.log(res)
  }).catch((error) => {
    console.error('Failed to create a new record : ', error);
  });
}).catch((error) => {
  console.error('Unable to create table : ', error);
});*/

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Tafkeer platform!" });
});
app.post("/users/register", (req,res)=>{
  console.log(req.body)
  User.find({email: req.body.email})
      .then((user)=>{
        if(user.length > 0) res.status(405).json({message: 'الايميل مكرر'}); else {
          const newPassword = bcrypt.hash(req.body.password, 10, (err, hash)=>{
            User.create({
              'firstName': req.body.firstName,
              'secondName': req.body.secondName,
              'email': req.body.email,
              'password': hash,
              'token':'##',
              'curr_status': 'student',
            }).then(async (data)=>{
                console.log(data)
                await Cart.create({user_id: data._id.toString(), products_id: [], number: 0})
                res.status(200).json({message:'تم تسجيلك بنجاح!'})
            }).catch((err)=>{
                console.error('Failed to create a new record : ', err);
                res.status(405).json({message: 'يرجى التأكد من البيانات'})
            });
          });
        }
      }).catch((err)=>{
        console.log(err)
      })
})
app.post("/users/login", (req,res)=>{
  const user = User.findOne({
		email: req.body.email,
	}).then(async (user)=>{
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    )
    console.log(isPasswordValid)
  
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.firstName,
          email: user.email,
        },
        '30SecretTafkeerSecret101', 
        {
          expiresIn: '6h'
        }
      )
      return res.status(200).json({ firstName: user.firstName, secondName: user.secondName, email: user.email, token: token, curr_status: user.curr_status, manager: user.manager })
      await User.updateOne({email: req.body.email}, {token: token})
    } else {
      return res.status(405).json({ status: 'error', user: false })
    }
  }).catch((err)=>{
    res.status(404).json({ status: 'error', error: 'Invalid login' })
  })
})
app.post('/api/verify', async (req, res) => {
  console.log(req.headers)
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, '30SecretTafkeerSecret101')
		const email = decoded.email
		User.findOne({email: email}).then((user)=>{
      res.status(200).json({ firstName: user.firstName, secondName: user.secondName, token: user.token, curr_status: user.curr_status, user_id: user._id.toString(), email: user.email, manager: user.manager })
    }).catch((error)=>{
      console.log(error)
      res.status(404).json({ status: 'error', error: 'invalid token' })
    })
	} catch (error) {
    console.log(error)
		res.status(404).json({ status: 'error', error: 'invalid token' })
	}
})
// getCourses and add field in every course if the user enrolled in!
app.post("/getCourses", (req,res)=>{
  User.find({email:req.body.email}).lean()
    .then(async (result)=>{
      console.log('wawwww', result)
      /*let IDs = await [];
      for(let i=0; i<result.length; i++) {
        await coursesData.push(result[i]._id);
      }*/
      Course.find({
        /*_id:{
          $in: IDs
        }*/
      })
        .then(async (data)=>{
          console.log(data[0]._id)
          console.log(data)
          let courses = await data;
          let resultArray = {};
          /*await result.forEach(async (resultItem)=>{*/
            await result[0].courses_enrolled_in.forEach(async (item)=>{
              resultArray[item.id] = await item;
            })
          /*})*/
          for(let i=0; i < data.length; i++) {
            courses[i] = courses[i].toObject();
            console.log(resultArray, data[i]._id.toString())
            console.log(resultArray[data[i]._id]!==undefined)
            if(resultArray[data[i]._id]!==undefined)
              courses[i].course_data = await resultArray[data[i]._id];
              console.log(courses[i].course_data, resultArray[data[i]._id])
            /*if(data[i]._id === result[0].courses_enrolled_in[i]._id) {
              courses[i].course_data = await result[0].courses_enrolled_in[i];
            }*/
          }
          console.log('\n\n\n\n', courses[0], courses[0].course_data, resultArray[data[0]._id], '\n\n\n\n')
          console.log('resultArray', resultArray)
          console.log(courses)
          res.status(200).json(courses)
        }).catch((err)=>{
          console.log(err)
          res.status(404).json({message:'No course found!'})
        })
    }).catch((err)=>{
      console.log(err);
    })
})

app.post("/getCourse/:course_id",(req,res)=>{
  Course.findOne({_id:new mongoose.Types.ObjectId(req.params.course_id)})
    .then(async (course)=>{
      let courseAndTeacherData = await course.toObject();
      User.findOne({email:course.OwnerEmail})
        .then(async (Teacher)=>{
          courseAndTeacherData.Teacher = await {Teacher_id: Teacher._id, full_name: Teacher.firstName + ' ' + Teacher.secondName, email: Teacher.email};
          await User.findOne({email: req.body.email})
            .then(async (user)=>{
              let found = await false
              await user.courses_enrolled_in.forEach(async (courseEnrolledIn)=>{
                console.log(courseEnrolledIn.id, req.params.course_id)
                if(courseEnrolledIn.id && courseEnrolledIn.id.toString() === req.params.course_id) {
                  courseAndTeacherData.progress = courseEnrolledIn;
                  console.log(courseAndTeacherData,"Yeah")
                  found = await true
                }
              })
              console.log(found)
              if(!found) {
                console.log("Kkkkk")
                let obj = {}
                await course.lessons.forEach((lesson)=>{
                  obj[lesson.Name] = false;
                })
                courseEnrolledIn = await JSON.stringify(user.courses_enrolled_in)
//                console.log(courseEnrolledIn)
                let x = {}
                x.id = courseAndTeacherData._id
                x.inProgress = "0"
                x.Lessons = obj
                let y = []
                console.log(courseEnrolledIn)
                console.log(2)
                await User.updateOne({email:req.body.email}, {$push : {courses_enrolled_in: x}})
                    .then((updateRes)=>{
                      console.log("Enrolled In!")
                      courseAndTeacherData.progress = user.courses_enrolled_in[user.courses_enrolled_in.length-1]
                      courseAndTeacherData.NewJoin = true
                    }).catch((err)=>{
                      console.log(err)
                    })
              }
            }).catch((err)=>res.status(404))
            res.status(200).json({message: 'Course data are ready!', courseAndTeacherData, EnrolledIn: courseAndTeacherData.progress !== undefined});
        })
    }).catch((err)=>{
      console.log(err)
      res.status(404).json({message:'No course found!'})
    })
})
app.post("/lessonCompleted/:course_id/:lesson", (req,res)=>{
  User.findOne({email: req.body.email})
    .then(async (data)=>{
      //let res2 = res.toObject();
      console.log(data)
      let found = false;
      data.courses_enrolled_in.forEach(async (course, index)=>{
        if(course.id && course.id.toString() === req.params.course_id) { 
          data.courses_enrolled_in[index].Lessons[req.params.lesson] = await true;
          found = await true;
          data.courses_enrolled_in[index].inProgress=(Object.keys(data.courses_enrolled_in[index].Lessons).filter((lesson)=>data.courses_enrolled_in[index].Lessons[lesson]).length*100/(Object.keys(data.courses_enrolled_in[index].Lessons).length)).toString()
          data.courses_enrolled_in[index].completed = (data.courses_enrolled_in[index].inProgress === "100")
          User.updateOne({email: req.body.email}, {courses_enrolled_in: data.courses_enrolled_in})
            .then((updateRes)=>{
              res.status(200).json({message:'Updated Successfully!', EnrolledIn: true})
            }).catch((err)=>{
              console.log(err)
            })
        }
      })
      //if(!found) res.status(404).json({EnrolledIn: false})
    })
})
app.post("/getUserID", (req,res)=>{
  User.findOne({email:req.body.email})
    .then((user)=>{
      res.status(200).json({message: 'User ID got successfully!', id: user._id.toString()})
    }).catch((err)=>{
      res.status(404).json({message: "User not found!"})
    })
})
app.post("/social/comments/:course_id/:lesson_name", (req,res)=>{
  Course.findOne({_id:new mongoose.Types.ObjectId(req.params.course_id)})
    .then((data)=>{
      data.lessons.forEach(async (lesson, index)=>{
        if(lesson.Name === req.params.lesson_name) { 
          res.status(200).json({message: "Comments got!", comments: lesson.Comments})
        }
      })
    }).catch((err)=>{
      res.status(404).json({message: 'Course not found!'})
      console.log(err)
    })
})
app.post("/social/new_comment/:course_id/:lesson_name/:user_id", (req,res)=>{
  Course.findOne({_id:new mongoose.Types.ObjectId(req.params.course_id)})
    .then((data)=>{
      data.lessons.forEach(async (lesson, index)=>{
        if(lesson.Name === req.params.lesson_name) { 
          await Course.updateOne({_id:new mongoose.Types.ObjectId(req.params.course_id), lessons: { $elemMatch: { Name: req.params.lesson_name } } },{ $push : { lessons: { Comments: {id: req.params.user_id, Name: req.body.name, Comment:  req.body.comment } } } })
            .then((comment)=>{
              res.status(200).json({message: "Comment Added Successfully!", comment_details: { Name: req.body.name, Comment:  req.body.comment }})
            }).catch((err)=>{
              console.log(err)
              res.status(405).json({message: 'An error occured!'})
            })
        }
      })
    }).catch((err)=>{
      res.status(404).json({message: 'Course not found!'})
      console.log(err)
    })
})
app.post("/social/tickets", (req,res)=>{
  Ticket.find({})
    .then((tickets)=>{
      res.status(200).json({message: 'Tickets got successfully!', tickets: tickets, commenters: tickets.comments_length})
    }).catch((err)=>{
      console.log(err)
      res.status(404).json({message: "We didn't found any tickets!"})
    })
})
app.post("/social/new_ticket", async (req,res)=>{
  const user = await User.findOne({email: req.body.email})
  Ticket.create({
    ticket_opener_id: user._id.toString(),
    ticket_opener_full_name: `${user.firstName} ${user.secondName}`,
    ticket_title: req.body.title,
    ticket_question: req.body.question,
    tags: req.body.tags,
    status: 'O'
  })
    .then(async (ticket)=>{
      await create_post_as_ticket("1171464326570328166", ticket._id.toString(), req.body.question, req.body.title)
      res.status(200).json({message: 'Ticket Created Successfully!', ticket_id: ticket._id.toString()})
    }).catch((err)=>{
      console.log(err)
      res.status(405).json({message: 'unSuccessful request!'})
    })
  /* We can create Ticket Comments document here if needed */
})
app.post("/social/ticket/correct_answer/:ticket_id/:comment_id/:user_id", async (req,res)=>{
  const user = await User.findOne({_id: new mongoose.Types.ObjectId(req.params.user_id)})
  TicketComments.updateOne({_id: new mongoose.Types.ObjectId(req.params.comment_id), ticket_id:req.params.ticket_id, correct_answer: false}, {correct_answer: true})
        .then((data)=>{
          console.log(data)
          res.status(200).json({message: 'Corrected!'})
        })
})
app.post("/social/ticket_details/:ticket_id", (req,res)=>{
  Ticket.findOne({_id:new mongoose.Types.ObjectId(req.params.ticket_id)})
    .then((ticket)=>{
      TicketComments.find({ticket_id: req.params.ticket_id})
          .then((comments)=>{
            res.status(200).json({message: 'Ticket got Successfully!', ticket: ticket, comments: comments})
          }).catch((err)=>{
            console.log(err)
            res.status(404).json({message: 'No comments!', ticket: ticket})
          })
    }).catch((err)=>{
      console.log(err)
      res.status(404).json({message: 'No ticket found by this id'})
    })
})
app.post("/social/ticket_title_edit/:ticket_id", (req,res)=>{
  Ticket.updateOne({_id: req.params.ticket_id}, {ticket_title: req.body.title})
    .then((ticket)=>{
      res.status(200).json({message: 'Ticket title updated Successfully!'})
    }).catch((err)=>{
      console.log(err)
      res.status(404).json({message: 'No ticket found by this id'})
    })
})
app.post("/social/ticket_question_edit/:ticket_id", (req,res)=>{
  Ticket.updateOne({_id: req.params.ticket_id}, {ticket_question: req.body.question})
    .then((ticket)=>{
      res.status(200).json({message: 'Ticket question updated Successfully!'})
    }).catch((err)=>{
      console.log(err)
      res.status(404).json({message: 'No ticket found by this id'})
    })
})
app.post("/social/close_ticket/:ticket_id", (req,res)=>{
  Ticket.updateOne({_id: req.params.ticket_id}, {status: 'C'})
    .then((ticket)=>{
      res.status(200).json({message: 'Ticket closed Successfully!'})
    }).catch((err)=>{
      console.log(err)
      res.status(404).json({message: 'No ticket found by this id'})
    })
})
app.post("/social/open_ticket/:ticket_id", (req,res)=>{
  Ticket.updateOne({_id: req.params.ticket_id}, {status: 'O'})
    .then((ticket)=>{
      res.status(200).json({message: 'Ticket closed Successfully!'})
    }).catch((err)=>{
      console.log(err)
      res.status(404).json({message: 'No ticket found by this id'})
    })
})
app.post("/social/ticket/add_comment/:ticket_id", async (req,res)=>{
  const user = await User.findOne({email: req.body.email})
  TicketComments.create({
    ticket_id: req.params.ticket_id,
    commenter_id: user._id.toString(),
    commenter_full_name: `${user.firstName} ${user.secondName}`,
    comment: req.body.comment
  })
    .then((comment)=>{
      Ticket.updateOne({_id: new mongoose.Types.ObjectId(req.params.ticket_id)}, { $inc: { comments_length: 1 } }).then(async (ticket)=>{
        console.log(ticket)
        await send_comment(req.body.comment, "1171464326570328166", req.params.ticket_id, req.body.title)
        res.status(200).json({message: 'Comment Added Successfully!', comment_id: comment._id.toString(), commenter_full_name: comment.commenter_full_name})
      }).catch((err)=>{
        console.log(err)
        res.status(405).json({message: 'Failed to update!'})
      })
    }).catch((err)=>{
      console.log(err)
      res.status(405).json({message: 'There is problem in creating it!'})
    })
})
app.post("/products", (req,res)=>{
  Product.find({})
        .then((products)=>{
          console.log(products)
          res.status(200).json({message: '', products: products})
        }).catch((err)=>{
          console.log(err)
          res.status(404).json({message: 'fkf'})
        })
})
app.post("/products/:product_id", (req,res)=>{
  console.log(req.params.product_id)
  Product.findOne({_id: new mongoose.Types.ObjectId(req.params.product_id)})
    .then((product)=>{
      res.status(200).json({product})
    }).catch((err)=>{
      console.log(err)
      res.status(404).json({message: 'Not Found 404'})
    })
})
app.post("/add_to_cart/:user_id/:product_id", (req,res)=>{
  console.log(req.params)
  Cart.findOne({user_id: new mongoose.Types.ObjectId(req.params.user_id)})
      .then(async (data3)=>{
        let duplicated = await false;
        let index = await 0;
        await data3.products_id.forEach((product_id)=>{
          if(product_id.product_id == req.params.product_id) {
            duplicated = true;
          }
          if(!duplicated) index++;
        })
        if(duplicated) {
          let duplicate = await data3.products_id;
          await duplicate[index].number++;
          Cart.updateOne({user_id: new mongoose.Types.ObjectId(req.params.user_id)}, {products_id : duplicate })
              .then((data)=>{
                res.status(200).json({})
              }).catch((err)=>{
                console.log(err)
                res.status(405).json({})
              })
        } else {
          Cart.updateOne({user_id: new mongoose.Types.ObjectId(req.params.user_id)}, {$push : {products_id : {product_id: req.params.product_id, number: 1, choosedSize:req.body.choosedSize} } })
              .then((data)=>{
                res.status(200).json({})
              }).catch((err)=>{
                console.log(err)
                res.status(405).json({})
              })
        }
      })
})
app.post("/get_cart_info", (req,res)=>{
  console.log(req.body.email)
  User.findOne({email: req.body.email})
      .then((user)=>{
        Cart.findOne({user_id: new mongoose.Types.ObjectId(user._id)})
            .then((cart)=>{
              res.status(200).json({cart})
            }).catch((err)=>{
              console.log(err)
              res.status(405).json({message: 'Problem!'})
            })
      }).catch((err)=>{
        console.log(err)
      })
})
app.post("/get_cart_products/:cart_id", (req,res)=>{
  Cart.findOne({_id: new mongoose.Types.ObjectId(req.params.cart_id)})
            .then(async (cart)=>{
              let arr = await []
              await cart.products_id.forEach((product_details)=>{
                arr.push(product_details.product_id)
              })
              Product.find({_id: { $in: arr}})
                  .then(async (products)=>{
                    console.log(products, cart.products_id)
                    let obj = await {}
                    await cart.products_id.forEach(async (p)=>{
                      obj[p.product_id] = await {quantity: p.number, choosed_size: p.choosedSize}
                    })
                    res.status(200).json({products, quantity: obj})
                  }).catch((err)=>{
                    console.log(err)
                  })
            }).catch((err)=>{
              console.log(err)
              res.status(405).json({message: 'Problem!'})
            })
})
app.post("/new_product", (req,res)=>{
  console.log(req.body)
  Product.create({product_name: req.body.product_name, product_describe: req.body.product_describe, tags: req.body.tags, sizes: req.body.sizes, price:req.body.price, product_pic: req.body.product_pic})
          .then((data)=>{
            console.log(data)
            res.status(200).json({message: 'OK!', product_id: data._id})
          }).catch((err)=>{
            console.log(err)
            res.status(405).json({message: 'Failed!'})
          })
})
app.post("/cart/:cart_id/plus_quantity_of_product/:product_id", (req,res)=>{
  Cart.findOne({_id: new mongoose.Types.ObjectId(req.params.cart_id)})
      .then(async (cart)=>{
        let clone_of_products_id = await cart.products_id;
        for(let i=0; i < clone_of_products_id.length; i++) {
          if(clone_of_products_id[i].product_id == req.params.product_id) {
            await clone_of_products_id[i].number++;
            await Cart.updateOne({_id: new mongoose.Types.ObjectId(req.params.cart_id)}, {products_id: clone_of_products_id})
                .then((data)=>{
                  res.status(200).json({message:'Quantity+ Successfully!'})
                }).catch((err)=>{
                  console.log(err)
                  res.status(405).json({message:'Quantity+ Failed!'})
                })
            break;
          }
        }
      }).catch((err)=>{
        console.log(err)
        res.status(405).json({message: 'حدث خطأ'})
      })
})
app.post("/cart/:cart_id/minus_quantity_of_product/:product_id", (req,res)=>{
  Cart.findOne({_id: new mongoose.Types.ObjectId(req.params.cart_id)})
      .then(async (cart)=>{
        let clone_of_products_id = await cart.products_id;
        for(let i=0; i < clone_of_products_id.length; i++) {
          if(clone_of_products_id[i].product_id == req.params.product_id) {
            if(clone_of_products_id[i].number < 2) {
              res.status(405).json({message: "لا يمكنك لأن الكمية ليست أكثر من واحد"});
              break;
            }
            await clone_of_products_id[i].number--;
            await Cart.updateOne({_id: new mongoose.Types.ObjectId(req.params.cart_id)}, {products_id: clone_of_products_id})
                .then((data)=>{
                  res.status(200).json({message:'Quantity- Successfully!'})
                }).catch((err)=>{
                  console.log(err)
                  res.status(405).json({message:'Quantity- Failed!'})
                })
            break;
          }
        }
      }).catch((err)=>{
        console.log(err)
        res.status(405).json({message: 'حدث خطأ'})
      })
})
app.post("/cart/:cart_id/delete_product/:product_id", (req,res)=>{
  Cart.findOne({_id: new mongoose.Types.ObjectId(req.params.cart_id)})
      .then(async (cart)=>{
        let clone_of_products_id = await cart.products_id;
        for(let i=0; i < clone_of_products_id.length; i++) {
          if(clone_of_products_id[i].product_id == req.params.product_id) {
            await clone_of_products_id.splice(i,1);
            await Cart.updateOne({_id: new mongoose.Types.ObjectId(req.params.cart_id)}, {products_id: clone_of_products_id})
                .then((data)=>{
                  res.status(200).json({message:'Deleted Successfully!'})
                }).catch((err)=>{
                  console.log(err)
                  res.status(405).json({message:'Delete Failed!'})
                })
            break;
          }
        }
      }).catch((err)=>{
        console.log(err)
        res.status(405).json({message: 'حدث خطأ'})
      })
})

app.post("/explore_exams_progress", (req,res)=>{
  Exams.find({})
        .then(async (exams)=>{
          let exams_tests = await exams;
          console.log(req.body.email)
          User.findOne({email:req.body.email})
              .then(async (user_details)=>{
                let user_exams = await user_details.exams;
                for(let i=0; i < user_exams.length; i++) {
                  if((exams_tests[i]._id).toString() === (user_exams[i].id).toString()) {
                    exams_tests[i].result = await user_exams[i].result;
                  }
                }
                console.log(exams)
                res.status(200).json({message:'Succeded!', exams: exams_tests})
              }).catch((err)=>{
                console.log(err)
                res.status(405).json({message: 'Something went wrong!2',err:err})
              })
        }).catch((err)=>{
          console.log(err)
          res.status(405).json({message: 'Something went wrong!'})
        })
})
app.post('/exam_details', (req,res)=>{
  Exams.findOne({_id: new mongoose.Types.ObjectId(req.body.exam_id)})
      .then(async (exam)=>{
        await User.findOne({email: req.body.email})
              .then(async (user_details)=>{
                let user_exams = await user_details.exams;
                let found = await false;
                await user_exams.forEach(async (user_exam)=>{
                  if((user_exam.id).toString() === (exam._id).toString()) found = await user_exam;
                })
                res.status(200).json({message:'Exam got it!!', exam_topic: exam.topic, exam_description: exam.desc, results: found === false || found.results.length == 0 ? undefined : found.results})
              })
      }).catch((err)=>{
        console.log(err)
      })
})
app.post('/exam_join', (req,res)=>{
  Exams.findOne({_id: new mongoose.Types.ObjectId(req.body.exam_id)})
        .then(async (exam)=>{
          let found = await false;
          await User.findOne({email:req.body.email})
          .then(async (user_details)=>{
            let user = await user_details;
            if(user.subscribed) found = await true;
            else {
              user.tests_bought.forEach(async (test)=>{
                if((test.id).toString() == (exam._id).toString()) found = await true;
              })
            }
          })
          if(found) res.status(200).json({message: 'Eligible to join!', exam}); else res.status(405).json({message: 'unEligible to join!'});
        }).catch((err)=>{
          console.log(err)
          res.status(405).json({message:'Exam not found!'})
        })
})
app.post('/exam_ended', (req,res)=>{
  Exams.findOne({_id: new mongoose.Types.ObjectId(req.body.exam_id)})
        .then((exam)=>{
          User.findOne({email:req.body.email})
                .then(async (user)=>{
                  let user_exams = await user.exams;
                  for(let i=0; i < user_exams.length; i++){
                    if((user_exams[i].id).toString() == (exam._id).toString()) {
                      let user_exam_results = await user_exams[i].results
                      await user_exam_results.push({result: req.body.result})
                      user_exams[i].results = await user_exam_results;
                      await User.findOneAndUpdate({email:req.body.email}, {exams:user_exams});
                    }
                  }
                  res.status(200).json({message: 'Test Ended Successfully!'})
                }).catch((err)=>{
                  console.log(err)
                  res.status(405).json({message: 'User not found!'})
                })
        }).catch((err)=>{
          console.log(err)
          res.status(405).json({message:'Exam not found!'})
        })
})

app.post("/results", (req,res)=>{
  User.findOne({email:req.body.email})
      .then(async (user)=>{
        let found = await false;
        let exam1 = [];
        await user.exams.forEach(async (exam)=>{
          if((exam.id).toString() == (req.body.exam_id).toString()) {
            found = true;
            exam1 = exam.results;
            console.log(exam1)
            console.log(exam.results)
          }
        })
        console.log(exam1)
        if(found) res.status(200).json({message: 'Results Found!', results: exam1}); else res.status(404).json({message:'Results Not Found!'})
      })
})
app.post('/user-consultations', (req,res)=>{
  User.findOne({email:req.body.email})
        .then((user)=>{
          res.status(200).json({message:'Got it!', user_consultations:user.consultations})
        }).catch((err)=>{
          console.log(err)
          res.status(405).json({message:'Forbidden!'})
        })
})
app.post('/create-consultation', (req,res)=>{
  User.findOne({email:req.body.email})
        .then((user)=>{
          Consultation.create({consultation_opener_id: (user._id).toString()})
                      .then((consultation)=>{
                        User.updateOne({email:req.body.email},{$push:{consultations:{consultation_id: (consultation._id).toString()}}})
                            .then((user2)=>{
                              res.status(200).json({message:'Done!', consultation_id: (consultation._id).toString()})
                            }).catch((err)=>{
                              console.log(err)
                              res.status(405).json({message:'Forbidden!'})
                            })
                      }).catch((err)=>{
                        console.log(err)
                        res.status(405).json({message:'Forbidden!'})
                      })
        }).catch((err)=>{
          console.log(err)
          res.status(405).json({message:'Forbidden!'})
        })
})
app.post('/consultation/:consultation_id',(req,res)=>{
  User.findOne({email:req.body.email})
      .then(async (user)=>{
        let found = await false;
        user.consultations && user.consultations.forEach(async (consultation)=>{
          if(consultation.consultation_id === req.params.consultation_id) {
            found = await true;
          }
        })
        user.taken_consultations && user.taken_consultations.forEach(async (consultation)=>{
          if(consultation.consultation_id === req.params.consultation_id) {
            found = await true;
          }
        })
        if(found) {
          Consultation.findOne({_id:new mongoose.Types.ObjectId(req.params.consultation_id)})
                    .then((consultation)=>{
                      res.status(200).json({message: 'Allowed!', messages: consultation.messages, consultationer: user.consultationer})
                    }).catch((err)=>{
                      console.log(err)
                      res.status(405).json({message:'Forbidden!'})
                    })
        } else {
          res.status(405).json({message:'Forbidden!'})
        }
      }).catch((err)=>{
        console.log(err)
        res.status(405).json({message:'Forbidden!'})
      })
})
app.post('/consultation-send-message/:consultation_id', (req,res)=>{
  Consultation.updateOne({_id: new mongoose.Types.ObjectId(req.params.consultation_id)},{$push:{messages: {username:req.body.username, message:req.body.message}}})
              .then(async (consultation)=>{
                await pusher.trigger("logic-gates", `send-message-consultation-number-${req.params.consultation_id}`, {
                  username: req.body.username,
                  message: req.body.message
                });
                res.status(200).json({message:'Sent!'})
              }).catch((err)=>{
                console.log(err)
                res.status(405).json({message:'Forbidden!'})
              })
})
app.post('/consultation-take/:consultation_id', (req,res)=>{
  User.findOne({email:req.body.email, consultationer: true})
        .then((user)=>{
          User.updateOne({email:req.body.email, consultationer: true}, {$push: {taken_consultations: {consultation_id: req.params.consultation_id}}})
                .then((user2)=>{
                  Consultation.updateOne({_id: new mongoose.Types.ObjectId(req.params.consultation_id)},{Taken: true, TakenFromID: (user._id).toString()})
                                .then((consultation)=>{
                                  res.status(200).json({message: 'Taken!'})
                                }).catch((err)=>{
                                  res.status(405).json({message: 'Forbidden!'})
                                })
                }).catch((err)=>{
                  console.log(err)
                  res.status(405).json({messsage: 'Forbidden!'})
                })
        }).catch((err)=>{
          console.log(err)
          res.status(405).json({message: 'Forbidden!'})
        })
})
app.post('/all-consultations', (req,res)=>{
  User.findOne({email:req.body.email, consultationer: true})
        .then((user)=>{
          Consultation.find({Taken: false})
                        .then((consultations)=>{
                          res.status(200).json({message: 'Got it!', available_to_take_consultations: consultations, user_taken_consultations: user.taken_consultations})
                        }).catch((err)=>{
                          console.log(err)
                          res.status(405).json({message: 'Forbidden!'})
                        })
        }).catch((err)=>{
          console.log(err)
          res.status(405).json({message: 'Forbidden!'})
        })
})

app.post('/consultationer-permission', (req,res)=>{
  User.findOne({email: req.body.email}) 
        .then((user)=>{
          res.status(200).json({message: 'Got it!', consultationer: user.consultationer})
        }).catch((err)=>{
          console.log(err)
        })
})
/*app.post("/getCoursesEnrolledIn", (req,res)=>{
  Course.find({})
    .then((data)=>{
      console.log(data)
      res.status(200).json(data)
    }).catch((err)=>{
      console.log(err)
      res.status(404).json({message:'No course found!'})
    })
})*/
app.post("/UserInfo", (req,res)=>{
    db.sequelize.sync().then(()=>{
      User.findOne({
        where: {
          id: "1"
        }
      }).then((data)=>{
        console.log('Sent Successfully')
        //console.log(data.dataValues.firstName)
        console.log(JSON.stringify(data))

        res.status(200).json(data.dataValues)
      }).catch((err)=>{
        console.log('Error in sending the response of findOne function', err)
        res.status(404).json({})
      })
    }).catch(()=>{
      console.log('Error in sync!')
    })
})

// set port, listen for requests
const PORT = 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});