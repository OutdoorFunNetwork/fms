type ErrorList = {
  errors: string[];
}

const Errors = ({ errors }: ErrorList): JSX.Element => (
  <>
    {
      errors.map(e => <span key={e}>{e}</span>)
    }
  </>
);

export default Errors;
