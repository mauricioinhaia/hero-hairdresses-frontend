import style from "./ModalEdit.module.css";
import { AiOutlineClose } from "react-icons/ai";

interface IModal {
  isOpen: boolean;
  handleChangeModal: () => void;
  hour: number;
  name: string;
}

export function ModalEdit({ isOpen, handleChangeModal, hour, name }: IModal) {
  const todayValue = new Date().toISOString().split("T")[0];

  if (isOpen) {
    return (
      <div className={style.background}>
        <div className={style.modal}>
          <div className={style.header}>
            <h2>Editar Horario</h2>
            <AiOutlineClose onClick={handleChangeModal} />
          </div>
          <div className={style.body}>
            <p>
              {hour}h - {name}
            </p>
            <div className={style.input}>
              <label htmlFor="">Escolha uma nova data:</label>
              <input type="date" defaultValue={todayValue} />
            </div>
            <div className={style.input}>
              <label htmlFor="">Selecione um novo horario</label>
              <select name="" id="">
                <option value="">13:00</option>
                <option value="">13:00</option>
                <option value="">13:00</option>
                <option value="">13:00</option>
              </select>
            </div>
          </div>
          <div className={style.footer}>
            <button onClick={handleChangeModal}>Cancelar</button>
            <button>Ok</button>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
