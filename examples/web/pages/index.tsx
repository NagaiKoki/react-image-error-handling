import { useImageErrorHandling } from "react-image-error-handling";

const errorImageUrl =
  "https://error.avatars.githubusercontent.com/u/50698194?v=4";
const myGithubUrl = "https://avatars.githubusercontent.com/u/50698194?v=4";

export default function Web() {
  const { ref, loaded } = useImageErrorHandling({ imageUrl: errorImageUrl });

  console.log(loaded);
  return (
    <div>
      <h1>Web</h1>
      <div style={{ width: 400, height: 400 }}>
        <img ref={ref} src={myGithubUrl} alt="react-error-handling-image" />
      </div>
    </div>
  );
}
