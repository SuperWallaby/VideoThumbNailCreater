import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";

const VideoThumbNailGenerator = dynamic(
 () => import("../components/videoThumbNailGenderator/VideoThumbNailGenerator"),
 {
  ssr: false,
 }
);

import styles from "../styles/Home.module.css";
import { useContext, useState } from "react";
import { IEditData } from "../components/videoThumbNailGenderator/helpers/eidtVidoe";
import { AppContext } from "../type/context";

const Home: NextPage = () => {
 const { s } = useContext(AppContext);
 const [editOpen, setEditOpen] = useState(false);
 const [editInfo, seteditInfo] = useState<IEditData>({
  end: 350,
  start: 0,
  selectOf: 3,
  selectSkip: 60,
  width: 480,
  skipAudio: true,
  quality: 35,
 });

 return (
  <div
   style={{
    display: "flex",
    justifyContent: "center",
   }}
  >
   <div className="mt-20 container px-4 max-w-lg">
    <Head>
     <title>Video ThumNailFy</title>
     <meta name="description" content="Generated by create next app" />
     <link rel="icon" href="/favicon.ico" />
    </Head>

    <article className=" prose lg:prose-lg">
     <h1>{s("title")}</h1>
     <b>{s("description")}</b>
     <h3>기본규칙</h3>
     <ul>
      <li>
       결과값이 마음에 들지 않는다면, 설정 수정하기 버튼을 통해서 결과를 바꿀 수
       있습니다.{" "}
      </li>
      <li>아래쪽에서 동영상 업로드를 클릭하여 편집할 동영상을 등록합니다.</li>
     </ul>
    </article>
    <button
     onClick={() => {
      setEditOpen(true);
     }}
     className="border disabled:opacity-50 border-gray-300 hover:bg-gray-100 mb-10 p-2.5 w-1/3 flex items-center justify-center rounded-md"
    >
     설정 수정하기
    </button>
    <VideoThumbNailGenerator
     editOpen={editOpen}
     setEditOpen={setEditOpen}
     editInfo={editInfo}
     seteditInfo={seteditInfo}
    />

    <footer className={styles.footer}>
     <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
     >
      Powered by <b className="ml-1">SuperWallaby</b>
     </a>
    </footer>
   </div>
  </div>
 );
};

export default Home;
