import http from "node:http";

const allowedRollNumber = "250151000146";

const server = http.createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  response.setHeader("Content-Type", "application/json");
  const url = new URL(request.url, "http://localhost:3001");

  if (request.method === "GET" && url.pathname === "/api/result") {
    const rollNo = url.searchParams.get("rollNo")?.trim();
    const found = rollNo === allowedRollNumber;
    response.writeHead(found ? 200 : 404);
    response.end(JSON.stringify(found ? { found: true, rollNo } : { found: false, message: "Wrong roll number" }));
    return;
  }

  response.writeHead(404);
  response.end(JSON.stringify({ message: "Not found" }));
});

server.listen(3001, () => console.log("Result API running on http://localhost:3001"));
