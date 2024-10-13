import http from "http";
const server = http.createServer(async (req, res) => {
    res.end(JSON.stringify({ message: "new server test" }));
});
server.listen(6789, () => console.log(`server running on 6789`));