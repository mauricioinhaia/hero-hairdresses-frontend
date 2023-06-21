import { Header } from "../../components/Header";
import { InputSchedule } from "../../components/InputSchedule";
import style from "./Schedules.module.css";

export function Schedules() {
  return (
    <div className="container">
      <Header />
      <h2>Agendamento de Horário</h2>
      <div className={style.formDiv}>
        <InputSchedule placeholder="Nome do Cliente" type="text" />
        <InputSchedule placeholder="Fone" type="text" />
        <div className={style.date}>
          <InputSchedule placeholder="Data" type="date" />
          <select name="" id="">
            <option value="">1</option>
            <option value="">1</option>
            <option value="">1</option>
          </select>
        </div>
        <div className={style.footer}>
          <button>Cancelar</button>
          <button>Ok</button>
        </div>
      </div>
    </div>
  );
}
