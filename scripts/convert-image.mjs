import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import imageminMozjpeg from "imagemin-mozjpeg";

(async () => {
  await imagemin(["dist/images/**/*"], {
    destination: "dist/images/jpg",
    plugins: [imageminMozjpeg({ quality: 60 })],
  });

  await imagemin(["dist/images/jpg/*"], {
    destination: "dist/images/webp",
    plugins: [imageminWebp({ quality: 50 })],
  });
})();
