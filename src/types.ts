export interface WindowSize {
  windowHeight: number;
  windowWidth: number;
}
export interface Coords {
  x: number;
  y: number;
}
export interface Paddle {
  coords: Coords;
  upKey: string;
  downKey: string;
}
