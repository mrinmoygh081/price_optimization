const request = require("supertest");
const app = require("../app");

describe("User API", () => {
  it("should return list of users", async () => {
    const res = await request(app).get("/api/users");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("name");
  });

  it("should create a new user", async () => {
    const res = await request(app).post("/api/users").send({
      name: "Bob",
      email: "bob@example.com",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Bob");
  });

  it("should return 400 for missing fields", async () => {
    const res = await request(app).post("/api/users").send({ name: "Charlie" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Name and email are required");
  });
});
