import fs from "fs";
import { createReadStream } from "fs";

for (let i = 0; i <= 10000; i++) {
  fs.writeFileSync("./test.txt", `${i}\n`, { flag: "a" });
}

const stream = createReadStream("./test.txt", { encoding: "utf8" });

stream.on("data", (data) => {
  console.log(data);
});

stream.on("error", (err) => console.log(err));
