const request = require("supertest");
const app = require("../app");

describe("GET /api/ping", () => {
  it("should return success", async () => {
    const res = await request(app).get("/api/ping");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "success");
  });
});
