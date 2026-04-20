const cluster = require("cluster");
const os = require("os");

const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master process ${process.pid} running`);

  // CPU core অনুযায়ী worker তৈরি
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  // worker মারা গেলে নতুন worker চালু
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {
  // Worker process → server run
  require("./server");
}
