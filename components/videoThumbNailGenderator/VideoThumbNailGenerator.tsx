import { createFFmpeg } from "@ffmpeg/ffmpeg";
import React, { useState, useRef, useCallback } from "react";
import { useEffect } from "react";
import { useUpdateComponent } from "../../hook/useUpdateComponent";
import { downloadURI } from "../../utils/file/downloadUrl";
import { getFileFromRef } from "../../utils/file/getFileFrom";
import { percentFy } from "../../utils/format/percent";
import Configer from "../configer/Configer";
import HiddenImageInput from "../hiddenInput/HiddenImageInput";
import { Preloader } from "../preloader/Preloader";
import { Video } from "../video/Video";
import { editVideo, IEditData } from "./helpers/eidtVidoe";

interface IProp {
 onChange?: (file: File) => void;
 editInfo: IEditData;
 seteditInfo: any;
 editOpen?: boolean;
 setEditOpen?: any;
}
const ffmpeg = createFFmpeg({
 log: true,
 corePath: "/ffmpeg/ffmpeg-core.js",
});

export const VideoThumbNailGenerator: React.FC<IProp> = ({
 onChange,
 editOpen,
 setEditOpen,
 editInfo,
 seteditInfo,
}) => {
 const videoRefContainer = useRef<HTMLInputElement>(null);
 const insertFile = getFileFromRef(videoRefContainer);
 const [originalUrlObject, setOriginalUrlObject] = useState<string>();
 const [rate, setRate] = useState<number>();
 const [message, setMessage] = useState<string>();

 const [downloadLink, setDownloadLink] = useState("편집 시작하기");

 ffmpeg.setProgress(({ ratio }) => {
  setRate(ratio);
 });

 const eidtStart = async () => {
  if (!insertFile) throw Error("Insert File is not exist");
  const { urlVideoObject } = await editVideo({
   video: insertFile,
   ffmpeg,
   setpts: "N/FRAME_RATE/TB",
   progessMessage: setMessage,
   ...editInfo,
  });
  setDownloadLink(urlVideoObject);
 };

 useEffect(() => {
  if (insertFile) {
   setOriginalUrlObject(URL.createObjectURL(insertFile));
   if (originalUrlObject) URL.revokeObjectURL(originalUrlObject);
  }
 }, [insertFile?.name]);

 const isCompleted = (rate || 0) > 0.99;
 const rateStr = rate ? `(${percentFy(rate * 100)}/100)` : "";
 const rateLoading = rate ? <Preloader /> : "";
 const onEditing = (rate || 0) > 0;

 const hasFile = insertFile?.name;

 return (
  <div>
   <button
    className="hover:bg-green-600 mb-2.5 p-2.5 w-full flex items-center justify-center rounded-md bg-green-500 text-white"
    onClick={() => {
     videoRefContainer.current?.click();
    }}
   >
    동영상 업로드하기
   </button>
   <Video className="mb-5 w-full" src={originalUrlObject} />

   {hasFile && (
    <div>
     {!isCompleted && (
      <button
       disabled={onEditing}
       className=" hover:bg-green-600 mb-2.5 p-2.5 w-full flex items-center justify-center rounded-md bg-green-500 text-white "
       onClick={eidtStart}
      >
       {rateLoading}
       {message}
       {rateStr}
      </button>
     )}

     {isCompleted && (
      <div>
       <button
        onClick={() => {
         downloadURI(downloadLink, insertFile?.name || "");
        }}
        className=" hover:bg-green-600 mb-2.5 p-2.5 w-full flex items-center justify-center rounded-md bg-green-500 text-white"
       >
        다운로드
       </button>
       <Video className="mb-5 w-full" src={downloadLink} />
      </div>
     )}
    </div>
   )}
   <Configer
    setOpen={setEditOpen}
    open={editOpen}
    key={editOpen ? "opned" : "closed"}
    defaultInfo={editInfo}
    onChange={seteditInfo}
   />

   <HiddenImageInput
    ref={videoRefContainer}
    onChange={() => {
     setRate(undefined);
     setMessage("편집 시작하기");
     if (downloadLink) URL.revokeObjectURL(downloadLink);
     setDownloadLink("");
    }}
    accept="video/mp4,video/x-m4v,video/*"
   />
  </div>
 );
};

export default VideoThumbNailGenerator;
