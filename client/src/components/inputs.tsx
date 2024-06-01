interface InputProps {
  name: string;
  change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputType: string;
  ph: string;
  lengthMin: number;
}

function Inputs(props: InputProps) {
  return (
    <input
      name={props.name}
      className={props.name}
      onChange={props.change}
      type={props.inputType}
      placeholder={props.ph}
      minLength={props.lengthMin}
      required={true}
      autoComplete="on"
      // autoComplete="off" // turned off auto suggestions for testing
    />
  );
}

export default Inputs;
