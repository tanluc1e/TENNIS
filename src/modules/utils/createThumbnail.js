import path from "path";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import ffprobeStatic from "ffprobe-static";

ffmpeg.setFfmpegPath(ffmpegStatic);
ffmpeg.setFfprobePath(ffprobeStatic.path);

export default (file, dest, thumbFilename) => {
  return new Promise((resolve, reject) => {
    ffmpeg(file)
      .screenshots({
        folder: path.join(
          __dirname,
          "..",
          "..",
          "..",
          "public",
          dest,
          "thumbnails"
        ),
        filename: thumbFilename,
        timestamps: ["1%"],
        size: "480x?",
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        resolve(thumbFilename);
      });
  });
};
