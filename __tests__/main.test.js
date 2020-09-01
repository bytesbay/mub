import Dotenv from 'dotenv';
Dotenv.config({
  path: process.cwd() + '/__tests__/.env'
});

import request from 'supertest';
import { app } from 'src/config/app';

describe("Test the root path", () => {
  
  test("It should response the GET method", done => {

    request(app)
      .get("/")
      .then(res => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});


describe("Uploading file", () => {
  
  test("It should response the POST method", done => {

    request(app)
      .post("/file")
      .set("Authorization", "Bearer qweqwe")
      .attach('file', '__tests__/text.txt')
      .then(res => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});


describe("Deleting all files", () => {
  
  test("It should response the DELETE method", done => {

    request(app)
      .delete("/file/all")
      .set("Authorization", "Bearer qweqwe")
      .then(res => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});