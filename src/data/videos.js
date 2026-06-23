// Shop-floor clips of Dynamic Robotics' cells in motion. Each source is a
// web-optimized H.264 file (originals in src/assets/main were HEVC/oversized;
// these were transcoded + cropped to a clean 9:16 portrait, ~720p). They drive
// the autoplaying video wall on /services. `poster` is the first-frame still
// shown before the clip loads, so the grid paints instantly.
import rbw20 from "../assets/site/video/rbw20.mp4";
import rbw20Poster from "../assets/site/video/rbw20.jpg";
import rb10e from "../assets/site/video/rb10e.mp4";
import rb10ePoster from "../assets/site/video/rb10e.jpg";
import weld1 from "../assets/site/video/weld-1.mp4";
import weld1Poster from "../assets/site/video/weld-1.jpg";
import weld2 from "../assets/site/video/weld-2.mp4";
import weld2Poster from "../assets/site/video/weld-2.jpg";
import weld3 from "../assets/site/video/weld-3.mp4";
import weld3Poster from "../assets/site/video/weld-3.jpg";

export const VIDEOS = [
  { id: "rbw20", src: rbw20, poster: rbw20Poster, title: "RBW Laser Welding Cell", caption: "Robotic torch on a rotary fixture" },
  { id: "rb10e", src: rb10e, poster: rb10ePoster, title: "RB10E Cobot Welding",     caption: "Operator-guided seam on heavy plate" },
  { id: "weld1", src: weld1, poster: weld1Poster, title: "Enclosure Seam Welding",  caption: "Cobot welding a stainless enclosure" },
  { id: "weld2", src: weld2, poster: weld2Poster, title: "Precision Seam Weld",     caption: "Consistent bead, start to finish" },
  { id: "weld3", src: weld3, poster: weld3Poster, title: "Flange Plate Welding",    caption: "Welding cut-and-drilled steel plate" },
];
