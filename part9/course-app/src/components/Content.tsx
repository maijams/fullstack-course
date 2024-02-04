import Part from "./Part";
import { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map(part => (
        <div key={part.name}>
          <b>{part.name} {part.exerciseCount}</b>
          <Part part={part} />
          <br/>
        </div>
      ))}
    </div>
  );
};

export default Content;