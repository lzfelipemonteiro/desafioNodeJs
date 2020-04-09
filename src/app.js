const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4')

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO
  const likes = 0
  const id = uuid()

  const {title, url, techs} = request.body

  const result = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories.push(result)

  return response.json(result)
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params
  const {title, url, techs} = request.body

  const index = repositories.findIndex(repository => repository.id === id)

  if (index < 0){
    return response.status(400).json({ error: "Repository not found."})
  }

  const likes = repositories[index].likes

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[index] = repository

  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params

  const index = repositories.findIndex(repository => repository.id === id)

  if (index < 0){
    return response.status(400).json({ error: "Repository not found."})
  }

  repositories.splice(index, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params

  const index = repositories.findIndex(repository => repository.id === id)

  if (index < 0){
    return response.status(400).json({ error: "Repository not found."})
  }

  let like = repositories[index].likes
  like += 1

  repositories[index].likes = like

  return response.json(repositories[index])
});

module.exports = app;
