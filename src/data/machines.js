// Machine / service catalog. Each item's `image` is a Vite-imported asset, so
// it is hashed, optimized, and resolves correctly under the GitHub Pages base.
// Photos are Dynamic Robotics' own shop floor — welding cells, control-panel
// builds and enclosures (originals in src/assets/main, web-optimized in
// src/assets/site). Tap any card on /services to add it to a quote request.
import laserWelding from "../assets/site/laser-welding.jpg";
import cobotCell from "../assets/site/cobot-cell.jpg";
import migWelding from "../assets/site/mig-welding.jpg";
import weldDetail from "../assets/site/weld-detail.jpg";
import controlPanel from "../assets/site/control-panel.jpg";
import panelWiring from "../assets/site/panel-wiring.jpg";
import plcVfd from "../assets/site/plc-vfd.jpg";
import enclosure from "../assets/site/enclosure.jpg";

export const MACHINES = [
  { id: "laser",     title: "Robotic Laser Welding",        category: "Welding",     spec: "RBW cobot · production-proven",  image: laserWelding },
  { id: "cobot",     title: "Collaborative Welding Cell",   category: "Cobot",       spec: "Cobot + fixture · ISO/TS 15066", image: cobotCell },
  { id: "mig",       title: "MIG & Structural Welding",     category: "Welding",     spec: "Multi-pass · heavy plate",       image: migWelding },
  { id: "fab",       title: "Weld Quality & Finishing",     category: "Quality",     spec: "Lap & fillet · clean bead",      image: weldDetail },
  { id: "panel",     title: "Custom Control Panels",        category: "Controls",    spec: "UL-ready · PLC + safety",        image: controlPanel },
  { id: "wiring",    title: "Panel Wiring & Assembly",      category: "Controls",    spec: "Point-to-point · labeled",       image: panelWiring },
  { id: "drives",    title: "PLC & VFD Integration",        category: "Controls",    spec: "AB PowerFlex · networked",       image: plcVfd },
  { id: "enclosure", title: "Machine Enclosures & Guarding", category: "Fabrication", spec: "Fabricated · powder-coat",      image: enclosure },
];
