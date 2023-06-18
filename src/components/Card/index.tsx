import { getHours, isAfter } from "date-fns";
import style from "./Card.module.css";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import { useState } from "react";
import { ModalEdit } from "../ModalEdit";

interface ISchedule {
  name: string;
  phone: string;
  id: string;
  date: Date;
}

export const Card = ({ name, date, id, phone }: ISchedule) => {
  const isAfterDate = isAfter(new Date(date), new Date());
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dateFormatted = new Date(date);
  const hour = getHours(dateFormatted);

  let phoneFormatted = phone.replace(/\D/g, "");
  phoneFormatted = phoneFormatted.replace(
    /(\d{2})(\d{5})(\d{4})/,
    "($1) $2-$3"
  );

  const handleChangeModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <div className={style.background}>
        <div>
          <span className={`${!isAfterDate && style.disabled}`}>{hour}h</span>
          <p>
            {name} - {phoneFormatted}
          </p>
        </div>
        <div className={style.icons}>
          <RiEditLine
            color="#5F68B1"
            size={17}
            onClick={() => {
              isAfterDate && handleChangeModal();
            }}
          />
          <RiDeleteBin5Line color="#EB2A2A" size={17} />
        </div>
      </div>
      <ModalEdit
        isOpen={openModal}
        handleChangeModal={handleChangeModal}
        hour={hour}
        name={name}
      />
    </>
  );
};
