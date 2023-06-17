import style from "./Card.module.css";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";

export const Card = () => {
  return (
    <div className={style.background}>
      <div>
        <span>10h</span>
        <p>Mauricio Inhaia</p>
      </div>
      <div className={style.icons}>
        <RiEditLine color="#5F68B1" size={17} />
        <RiDeleteBin5Line color="#EB2A2A" size={17} />
      </div>
    </div>
  );
};
