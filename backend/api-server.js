import http from "node:http";

const allowedRollNumber = "250151000146";

const server = http.createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "https://hsbte-result-lpn0.onrender.com/");
  response.setHeader("Content-Type", "application/json");
  const url = new URL(request.url, "https://hsbte-result-backend.onrender.com");

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
