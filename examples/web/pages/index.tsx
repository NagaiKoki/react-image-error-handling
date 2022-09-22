import { useImageHooks } from "react-image-hooks";

import SampleImage from "../images/sampleImage.jpg";

const errorImageUrl =
  "https://error.avatars.githubusercontent.com/u/50698194?v=4";
const myGithubUrl = "./sampleImadge.jpg";

export default function Web() {
  const { src } = useImageHooks({
    url: "/samplesImage.jpg",
  });

  return (
    <div>
      <div style={{ width: 2000, height: 2000 }}>
        <img
          src={src}
          width={400}
          height={400}
          alt="react-error-handling-image"
        />
      </div>
    </div>
  );
}
