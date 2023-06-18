import { getHours, isAfter } from "date-fns";
import style from "./Card.module.css";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";

interface ISchedule {
  name: string;
  phone: string;
  id: string;
  date: Date;
}

export const Card = ({ name, date, id, phone }: ISchedule) => {
  const isAfterDate = isAfter(new Date(date), new Date());
  let phoneFormatted = phone.replace(/\D/g, "");
  phoneFormatted = phoneFormatted.replace(
    /(\d{2})(\d{5})(\d{4})/,
    "($1) $2-$3"
  );

  return (
    <div className={style.background}>
      <div>
        <span className={`${!isAfterDate && style.disabled}`}>
          {getHours(new Date(date))}h
        </span>
        <p>
          {name} - {phoneFormatted}
        </p>
      </div>
      <div className={style.icons}>
        <RiEditLine color="#5F68B1" size={17} />
        <RiDeleteBin5Line color="#EB2A2A" size={17} />
      </div>
    </div>
  );
};
