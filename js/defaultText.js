export const defaultText = `/* 
@version: v0.2.0

Melexis Inductive Position Sensor Target PCB designer
*/

/* -- DECLARE_PCB -- */
const board = new PCB();

/* -- DECLARE_COMPONENTS -- */

/* -- CONSTANTS -- */
const boardOD_mm = 50; // Outer diameter of your circular PCB
const boardID_mm = 10; // Inner diameter of the hold in the center of your PCB

const noniusEnable = 1;
const noniusID = 14;
const noniusOD = 27;
const noniusPoles = 5;
const noniusPhase = 0;

const masterID = 29;
const masterOD = 45;
const masterPoles = 32;
const masterPhase = 0;



const numSegments = 128; // Resolution (number of sides for the polygon)

// --- LOGIC ---
// Helper to generate points on a circle
function generateCirclePath(diameter_mm, segments) {
  const radius = diameter_mm / 2 / 25.4;
  const points = [];

  for (let i = 0; i < segments; i++) {
    // Calculate the angle for this point in radians
    const theta = (i / segments) * 2 * Math.PI; // 0 to 2π radians

    // Basic trigonometry to get Cartesian (X, Y) coordinates
    // We keep the center at (0, 0)
    const x = Math.cos(theta) * radius;
    const y = Math.sin(theta) * radius;

    // Use the pt() helper from svg-pcb API to define the point
    points.push(pt(x, y));

  }

  // Use the path() helper from svg-pcb API to join points into a loop
  return path(...points);
}

function generateArc(diameter_mm, begin_angle_deg, end_angle_deg, segments) {
  const radius = diameter_mm / 2 / 25.4;
  const points = [];

  if (end_angle_deg > begin_angle_deg) {
    for (let angle = begin_angle_deg; angle < end_angle_deg; angle += (end_angle_deg - begin_angle_deg) / segments) {
      // Calculate the angle for this point in radians
      const angle_rad = (angle / 360) * 2 * Math.PI; // 0 to 2π radians

      // Basic trigonometry to get Cartesian (X, Y) coordinates
      // We keep the center at (0, 0)
      const x = Math.cos(angle_rad) * radius;
      const y = Math.sin(angle_rad) * radius;

      // Use the pt() helper from svg-pcb API to define the point
      points.push(pt(x, y));
    }
  } else {
    for (let angle = begin_angle_deg; angle > end_angle_deg; angle += (end_angle_deg - begin_angle_deg) / segments) {
      // Calculate the angle for this point in radians
      const angle_rad = (angle / 360) * 2 * Math.PI; // 0 to 2π radians

      // Basic trigonometry to get Cartesian (X, Y) coordinates
      // We keep the center at (0, 0)
      const x = Math.cos(angle_rad) * radius;
      const y = Math.sin(angle_rad) * radius;

      // Use the pt() helper from svg-pcb API to define the point
      points.push(pt(x, y));
    }
  }

  const angle_rad = (end_angle_deg / 360) * 2 * Math.PI; // 0 to 2π radians

  // Basic trigonometry to get Cartesian (X, Y) coordinates
  // We keep the center at (0, 0)
  const x = Math.cos(angle_rad) * radius;
  const y = Math.sin(angle_rad) * radius;

  // Use the pt() helper from svg-pcb API to define the point
  points.push(pt(x, y));

  // Use the path() helper from svg-pcb API to join points into a loop
  return points;
}

/* -- ADD_COMPONENTS -- */

/* -- BOARD_SIZE_SHAPE -- */
const outline = generateCirclePath(boardOD_mm, numSegments);
const cutout = generateCirclePath(boardID_mm, numSegments);

board.addShape("outline", cutout);
board.addShape("outline", outline);
board.addShape("do-not-manufacture", cutout); //

/* -- ADD the IPS Targets -- */
if (noniusEnable) {
  for (let pole = 0; pole < noniusPoles; pole += 1) {
    const begin_angle = pole * (360 / noniusPoles) + noniusPhase;
    const end_angle = (pole + 0.5) * (360 / noniusPoles) + noniusPhase;

    let shape1 = generateArc(noniusID, begin_angle, end_angle, 32);
    shape1.push(...generateArc(noniusOD, end_angle, begin_angle, 32));
    board.addShape("F.Cu", path(...shape1));
  }
}

for (let pole = 0; pole < masterPoles; pole += 1) {
  const begin_angle = pole * (360 / masterPoles) + masterPhase;
  const end_angle = (pole + 0.5) * (360 / masterPoles) + masterPhase;

  let shape1 = generateArc(masterID, begin_angle, end_angle, 32);
  shape1.push(...generateArc(masterOD, end_angle, begin_angle, 32));
  board.addShape("F.Cu", path(...shape1));
}




/* -- ADD_WIRES -- */

/* -- RENDER_PCB -- */
const D = boardOD_mm * 1.1 / 2 / 25.4;
const limit0 = pt(-D, -D);
const limit1 = pt(+D, +D);
const xMin = Math.min(limit0[0], limit1[0]);
const xMax = Math.max(limit0[0], limit1[0]);
const yMin = Math.min(limit0[1], limit1[1]);
const yMax = Math.max(limit0[1], limit1[1]);

renderPCB({
  pcb: board,
  layerColors: {
    "outline": "#002d00ff",
    "F.Cu": "#ff8c00cc",
    "do-not-manufacture": "#ffffffff",
  },
  limits: {
    x: [xMin, xMax],
    y: [yMin, yMax]
  },
  background: "#00000000",
  mmPerUnit: 25.4
});

`

export const basicSetup = `/* 
@version: v0.2.0

Melexis Inductive Position Sensor Target PCB designer
*/

/* -- DECLARE_PCB -- */
const board = new PCB();

/* -- DECLARE_COMPONENTS -- */

/* -- CONSTANTS -- */
const boardOD_mm = 50; // Outer diameter of your circular PCB
const boardID_mm = 10; // Inner diameter of the hold in the center of your PCB

const noniusEnable = 1;
const noniusID = 14;
const noniusOD = 27;
const noniusPoles = 5;
const noniusPhase = 0;

const masterID = 29;
const masterOD = 45;
const masterPoles = 32;
const masterPhase = 0;



const numSegments = 128; // Resolution (number of sides for the polygon)

// --- LOGIC ---
// Helper to generate points on a circle
function generateCirclePath(diameter_mm, segments) {
  const radius = diameter_mm / 2 / 25.4;
  const points = [];

  for (let i = 0; i < segments; i++) {
    // Calculate the angle for this point in radians
    const theta = (i / segments) * 2 * Math.PI; // 0 to 2π radians

    // Basic trigonometry to get Cartesian (X, Y) coordinates
    // We keep the center at (0, 0)
    const x = Math.cos(theta) * radius;
    const y = Math.sin(theta) * radius;

    // Use the pt() helper from svg-pcb API to define the point
    points.push(pt(x, y));

  }

  // Use the path() helper from svg-pcb API to join points into a loop
  return path(...points);
}

function generateArc(diameter_mm, begin_angle_deg, end_angle_deg, segments) {
  const radius = diameter_mm / 2 / 25.4;
  const points = [];

  if (end_angle_deg > begin_angle_deg) {
    for (let angle = begin_angle_deg; angle < end_angle_deg; angle += (end_angle_deg - begin_angle_deg) / segments) {
      // Calculate the angle for this point in radians
      const angle_rad = (angle / 360) * 2 * Math.PI; // 0 to 2π radians

      // Basic trigonometry to get Cartesian (X, Y) coordinates
      // We keep the center at (0, 0)
      const x = Math.cos(angle_rad) * radius;
      const y = Math.sin(angle_rad) * radius;

      // Use the pt() helper from svg-pcb API to define the point
      points.push(pt(x, y));
    }
  } else {
    for (let angle = begin_angle_deg; angle > end_angle_deg; angle += (end_angle_deg - begin_angle_deg) / segments) {
      // Calculate the angle for this point in radians
      const angle_rad = (angle / 360) * 2 * Math.PI; // 0 to 2π radians

      // Basic trigonometry to get Cartesian (X, Y) coordinates
      // We keep the center at (0, 0)
      const x = Math.cos(angle_rad) * radius;
      const y = Math.sin(angle_rad) * radius;

      // Use the pt() helper from svg-pcb API to define the point
      points.push(pt(x, y));
    }
  }

  const angle_rad = (end_angle_deg / 360) * 2 * Math.PI; // 0 to 2π radians

  // Basic trigonometry to get Cartesian (X, Y) coordinates
  // We keep the center at (0, 0)
  const x = Math.cos(angle_rad) * radius;
  const y = Math.sin(angle_rad) * radius;

  // Use the pt() helper from svg-pcb API to define the point
  points.push(pt(x, y));

  // Use the path() helper from svg-pcb API to join points into a loop
  return points;
}

/* -- ADD_COMPONENTS -- */

/* -- BOARD_SIZE_SHAPE -- */
const outline = generateCirclePath(boardOD_mm, numSegments);
const cutout = generateCirclePath(boardID_mm, numSegments);

board.addShape("outline", cutout);
board.addShape("outline", outline);
board.addShape("do-not-manufacture", cutout); //

/* -- ADD the IPS Targets -- */
if (noniusEnable) {
  for (let pole = 0; pole < noniusPoles; pole += 1) {
    const begin_angle = pole * (360 / noniusPoles) + noniusPhase;
    const end_angle = (pole + 0.5) * (360 / noniusPoles) + noniusPhase;

    let shape1 = generateArc(noniusID, begin_angle, end_angle, 32);
    shape1.push(...generateArc(noniusOD, end_angle, begin_angle, 32));
    board.addShape("F.Cu", path(...shape1));
  }
}

for (let pole = 0; pole < masterPoles; pole += 1) {
  const begin_angle = pole * (360 / masterPoles) + masterPhase;
  const end_angle = (pole + 0.5) * (360 / masterPoles) + masterPhase;

  let shape1 = generateArc(masterID, begin_angle, end_angle, 32);
  shape1.push(...generateArc(masterOD, end_angle, begin_angle, 32));
  board.addShape("F.Cu", path(...shape1));
}




/* -- ADD_WIRES -- */

/* -- RENDER_PCB -- */
const D = boardOD_mm * 1.1 / 2 / 25.4;
const limit0 = pt(-D, -D);
const limit1 = pt(+D, +D);
const xMin = Math.min(limit0[0], limit1[0]);
const xMax = Math.max(limit0[0], limit1[0]);
const yMin = Math.min(limit0[1], limit1[1]);
const yMax = Math.max(limit0[1], limit1[1]);

renderPCB({
  pcb: board,
  layerColors: {
    "outline": "#002d00ff",
    "F.Cu": "#ff8c00cc",
    "do-not-manufacture": "#ffffffff",
  },
  limits: {
    x: [xMin, xMax],
    y: [yMin, yMax]
  },
  background: "#00000000",
  mmPerUnit: 25.4
});


`.replaceAll("\t", " ")

