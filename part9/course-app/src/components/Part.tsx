import { CoursePart } from '../types'

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div><em>{part.description}</em></div>
      )
    case "group":
      return (
        <div>project exercises {part.groupProjectCount}</div>
      )
    case "background":
      return (
        <div>
          <em>{part.description}</em>
          <div>{part.backgroundMaterial}</div>
        </div>
      )
    case "special":
      return (
        <div>required skills: {part.requirements.join(', ')}</div>
      )
    default:
      return assertNever(part);
  }

}

export default Part