export interface IffmpegVideoFilterOption {
 width: number;
 setpts: string;
 selectSkip?: number;
 selectOf?: number;
}

export class FFmpegArgManager {
 constructor(private args: string[], private mine: string) {}

 private setVF() {
  let targetIndex = this.args.findIndex((arg) => arg === "-vf");

  if (targetIndex === -1) {
   this.args.push("-vf");
   targetIndex = this.args.length - 1;
  }
  return targetIndex;
 }

 private getVFValueindex() {
  const VFindex = this.setVF();
  return VFindex + 1;
 }

 public setInput(name: string) {
  this.args.push("-i");
  this.args.push(name);
 }

 public removeAudio() {
  this.args.push("-an");
 }

 public setStart(
  start: string //00:00:00
 ) {
  this.args.push("-ss");
  this.args.push(start);
 }

 public setEnd(
  end: string //00:00:00
 ) {
  this.args.push("-t");
  this.args.push(end);
 }

 public setQuality(
  quality: number //0 ~ 50
 ) {
  this.args.push(this.mine?.includes("mp4") ? "-crf" : "-q");
  this.args.push(`${quality}`);
 }

 public setVideoFilter(
  { width, selectOf, selectSkip, setpts }: Partial<IffmpegVideoFilterOption> //0 ~ 50
 ) {
  const vfValueIndex = this.getVFValueindex();
  const filterValues: string[] = [];

  if (width) filterValues.push(`scale=${width}:-1`);
  if (selectOf)
   filterValues.push(
    `select='lt(mod(t,${(selectSkip || 0) + (selectOf || 0)}),${selectOf})'`
   );
  if (setpts) filterValues.push(`setpts=${setpts}`);

  this.args[vfValueIndex] = filterValues.join(",");
 }

 public setOutput(name: string) {
  this.args.push(name);
 }

 public getArgs() {
  return this.args;
 }
}
