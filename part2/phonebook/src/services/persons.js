import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
    .then(response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
    .then(response => response.data)
}
const deletePerson = newObject => {
  return axios.delete(`${baseUrl}/${newObject.id}`)
    .then(response => response.data)
}

const replaceNumber = (oldObject, newObject) => {
  return axios.put(`${baseUrl}/${oldObject.id}`, newObject)
    .then(response => response.data)
}

const exportedObject = {
  getAll,
  create,
  deletePerson,
  replaceNumber
}
export default exportedObject