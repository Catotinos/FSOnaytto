const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
   if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  // Deletes oldest if 5 already exists
    const blogCount = await Blog.countDocuments({});
  if (blogCount >= 5) {
    const oldestBlog = await Blog.findOne({}).sort({ createdAt: 1 });
    if (oldestBlog) {
      await Blog.findByIdAndDelete(oldestBlog._id);
    }
  }

  const blog = new Blog({
    date: body.date,
    text: body.text,
    user: user._id
  })
  const savedBlog = await blog.save().catch(error => {
      console.log(error)
      response.status(400).end()
    })
  response.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  const userid = decodedToken.id
  if ( blog.user.toString() === userid.toString() ){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }else{
    return response.status(401).json({ error: "you are not the author of this post!"})
  }
  
})

blogsRouter.put('/:id', async (request, response) => {
  let blog = await Blog.findById(request.params.id)
  blog.date = request.body.date
  blog.text = request.body.date
  const savedblog = await blog.save()
  response.status(201).json(savedblog)
})
module.exports = blogsRouter