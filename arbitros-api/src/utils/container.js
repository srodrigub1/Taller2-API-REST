import os from "os";

export const containerInfo = () => ({
  hostname: os.hostname(),
  pid: process.pid,
  node: process.version,
  time: new Date().toISOString(),
});