import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import imageminMozjpeg from "imagemin-mozjpeg";

(async () => {
  await imagemin(["public/images/**/*"], {
    destination: "dist/images/webp",
    plugins: [imageminWebp({ quality: 50 })],
  });

  await imagemin(["public/images/**/*"], {
    destination: "dist/images/jpg",
    plugins: [imageminMozjpeg({ quality: 60 })],
  });
})();
