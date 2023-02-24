import sharp from "sharp";
import { readdirSync } from "fs";
import { extname } from "path";
import path from "path";

// just want to transform images in heros for now
const target = path.resolve(process.cwd(), "dist/images/heros");

readdirSync(target).forEach((image) => {
  sharp(`${target}/${image}`)
    .resize(480)
    .toFile(
      path.resolve(target, `${image.split(".").slice(0, -1).join(".")}-small${extname(image)}`)
    );
});
