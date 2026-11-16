const request = require("supertest");
const app = require("./app");

describe("GET /api/health", () => {
    test("should return status 200 and correct response", async () => {
        const response = await request(app).get("/api/health");

        expect(response.statusCode).toBe(200);

        expect(response.body).toEqual({
            status: "ok",
            message: "Server is running"
        });
    });
});