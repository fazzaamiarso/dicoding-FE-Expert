import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync } from "fs";
import { resolve } from "path";
import path from "path";

const target = path.resolve(__dirname, "public/images");
const destination = path.resolve(__dirname, "dist/images");

if (!existsSync(destination)) {
  mkdirSync(destination);
}

readdirSync(target).forEach((image) => {
  sharp(`${target}/${image}`)
    .resize(800)
    .toFile(resolve(`${destination}/${image.split(".").slice(0, -1).join(".")}-large.jpg`));

  sharp(`${target}/${image}`)
    .resize(480)
    .toFile(resolve(`${destination}/${image.split(".").slice(0, -1).join(".")}-small.jpg`));
});
