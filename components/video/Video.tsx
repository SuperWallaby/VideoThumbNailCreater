import React from "react";

interface IProp extends React.VideoHTMLAttributes<HTMLVideoElement> {}
export const Video = React.forwardRef<HTMLVideoElement, IProp>(
 ({ ...props }, ref) => {
  return <video controls ref={ref} className="JDvideo" {...props} />;
 }
);

Video.displayName = "Video";

// interface IProp {
//     file:Ffile
//  }

// export const VideoOrImg: React.FC<IProp> = ({file}) => {
//     const isVideo = !isImg(file.extension)
//     return <div />;
// };
