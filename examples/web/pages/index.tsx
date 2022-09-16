import { useImageHooks } from "react-image-hooks";

const errorImageUrl =
  "https://error.avatars.githubusercontent.com/u/50698194?v=4";
const myGithubUrl = "https://avatars.githubusercontent.com/u/50698194?v=4";

export default function Web() {
  const { ref, load, onLoad, onError } = useImageHooks({
    imageUrl: errorImageUrl,
  });

  return (
    <div>
      <h1>Web</h1>
      <div style={{ width: 400, height: 400 }}>
        <img
          ref={ref}
          src={myGithubUrl}
          width={400}
          height={400}
          alt="react-error-handling-image"
          onLoad={onLoad}
          onError={onError}
        />
      </div>
    </div>
  );
}
