import { FFmpeg } from "@ffmpeg/ffmpeg";
import {
 fileExtendDivider,
 getFileMine,
} from "../../../utils/file/fileExtendDivider";
import { toHHMMSS } from "../../../utils/format/secondHHMMSS";
import { FFmpegArgManager, IffmpegVideoFilterOption } from "./ffmpegArgManage";

export interface IEditData extends Partial<IffmpegVideoFilterOption> {
 start?: number;
 end?: number;
 quality?: number; //0 ~ 50
 width?: number; // px
 output?: string;
 skipAudio?: boolean;
}

interface IEditVideo extends IEditData {
 video: File;
 ffmpeg: FFmpeg;

 progessMessage?: (msg: string) => void;
}
export const editVideo = async ({
 video,
 ffmpeg,
 end,
 quality = 35,
 setpts,
 selectOf,
 selectSkip,
 width,
 start = 0,
 output = "out.mp4",
 skipAudio,
 progessMessage,
}: IEditVideo) => {
 progessMessage?.("코어 파일 불러오기");
 await ffmpeg.load();
 const { extend } = fileExtendDivider(video.name);
 const mine = getFileMine(video);

 progessMessage?.("파일 준비중");
 ffmpeg.FS("writeFile", video.name, new Uint8Array(await video.arrayBuffer()));

 const ffmpegArgSetting = new FFmpegArgManager([], mine);

 ffmpegArgSetting.setInput(video.name);
 if (end || start) ffmpegArgSetting.setStart(toHHMMSS(start));
 if (end) ffmpegArgSetting.setEnd(toHHMMSS(end));
 ffmpegArgSetting.removeAudio();
 if (skipAudio) ffmpegArgSetting.setQuality(quality);
 ffmpegArgSetting.setVideoFilter({
  width,
  selectOf,
  selectSkip,
  setpts,
 });
 ffmpegArgSetting.setOutput(output);

 const args = ffmpegArgSetting.getArgs();

 console.log({ args });

 progessMessage?.("동영상 편집중");
 await ffmpeg.run(...args);
 progessMessage?.("편집완료");
 const data = ffmpeg.FS("readFile", "out.mp4");

 const urlVideoObject = URL.createObjectURL(
  new Blob([data.buffer], { type: mine })
 );
 return { urlVideoObject };
};

// //  const args = [
//   "-i",
//   video.name,
//   "-ss",
//   "00:00:00",
//   "-t",
//   "00:04:30",
// //   "-an",
// //   extend?.includes("mp4") ? "-crf" : "-q",
// //   "35",
// //   "-vf",
// //   "scale=480:-1,select='lt(mod(t,62),2)',setpts=N/FRAME_RATE/TB",
// //   "out.mp4",
// //  ];

// "-i"
// 1: "sample.mp4"
// 2: "-ss"
// 3: "00:00:00"
// 4: "-t"
// 5: "00:02:10"
// 6: "-crf"
// 7: "35"
// 8: "-vf"
// 9: "scale=480:-1,select=lt(mod(t,62),2),setpts=N/FRAME_RATE/TB"
// 10: "out.mp4"
