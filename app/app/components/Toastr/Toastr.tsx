import { FC, ReactNode } from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';


type ToastrProps = {
  toasts: { title: string; message: string; type: string }[];
  children?: ReactNode;
}

const Toastr: FC<ToastrProps> = ({ toasts }: ToastrProps): JSX.Element | null => {
  return (
    <TransitionGroup className="toastr">
      {
        toasts.map(
          (t, index) => (
            <CSSTransition
              key={index}
              timeout={500}
              classNames="example">
              <div className="toast" key={index}>
                {t.message}
              </div>
            </CSSTransition>
          )
        )
      }
    </TransitionGroup>
  );
}

export default Toastr;
