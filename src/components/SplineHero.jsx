import Spline from "@splinetool/react-spline";

const SCENE_URL = "https://prod.spline.design/xRkklBoXbbz0Tum2/scene.splinecode";

function removeSplineWatermark(spline) {
  spline?._renderer?.pipeline?.setWatermark?.(null);
}

export function SplineHero({ className = "" }) {
  return (
    <div className={`spline-hero ${className}`}>
      <Spline scene={SCENE_URL} onLoad={removeSplineWatermark} />
    </div>
  );
}

export default SplineHero;
