import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

(async () => {
  await imagemin(["public/images/**/*"], {
    destination: "public/images",
    plugins: [imageminWebp({ quality: 50 })],
  });
})();
