import { createConnection } from "node:net";

const PORT = Number(process.env.PORT ?? 3000);
const HOST = "127.0.0.1";
const TIMEOUT_MS = 1500;

function probePort(port) {
  return new Promise((resolve) => {
    const socket = createConnection({ host: HOST, port });

    const done = (result) => {
      socket.destroy();
      resolve(result);
    };

    socket.setTimeout(TIMEOUT_MS);
    socket.on("connect", () => done("open"));
    socket.on("timeout", () => done("hung"));
    socket.on("error", (error) => {
      if (error.code === "ECONNREFUSED") {
        done("free");
        return;
      }
      done("error");
    });
  });
}

const state = await probePort(PORT);

if (state === "hung") {
  console.error("");
  console.error(`  ✖ Port ${PORT} is in use but not responding (hung dev server).`);
  console.error(`    This often causes Chrome's chrome-error://chromewebdata/ page.`);
  console.error("");
  console.error(`    Fix: kill the stale process, then restart dev:`);
  console.error(`      lsof -ti :${PORT} | xargs kill`);
  console.error(`      npm run dev`);
  console.error("");
  process.exit(1);
}

if (state === "open") {
  console.log(`  ℹ Port ${PORT} already has a running server — Next.js may pick another port.`);
  console.log(`    Use the Local URL printed below (not always :${PORT}).`);
  console.log("");
}
