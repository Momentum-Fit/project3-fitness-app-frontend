import axios from "axios";

const api = axios.create({
    baseUrl: "http://localhost:5005/api",
    withCredentials: true,
});

const errorHandler = err => {
    throw err;
  };

const uploadImage = file => {
    return api
        .post("/upload", file)
        .then(res => res.data)
        .catch(errorHandler)
};

export default uploadImage;

