import style from "./Input.module.css";
import { AiOutlineMail } from "react-icons/ai";

interface IInput {
  placeholder: string;
}

export const Input = ({ placeholder, }: IInput) => {
  return (
    <div className={style.container}>
      <label htmlFor="">
        <i aria-hidden="true">
          <AiOutlineMail size={20} />
        </i>
        <input type="text" placeholder={placeholder} />
      </label>
    </div>
  );
};
