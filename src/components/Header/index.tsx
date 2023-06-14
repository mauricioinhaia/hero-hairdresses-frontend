import style from "./Header.module.css";
import logo from "../../assets/logo_branca.png";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div>
      <header className={style.background}>
        <div className={style.image} onClick={() => navigate("/dashboard")}>
          <img src={logo} alt="" />
          <span>Hero HairDresses</span>
        </div>
        <div className={style.profile}>
          <div className={style.dropdown} onClick={() => setOpen(!open)}>
            <CgProfile size={18} />
            <span>Perfil</span>
            <ul className={`${style.dropdownMenu} ${open && style.open}`}>
              <li className={style.dropdownMenuItem}>Agendamentos</li>
              <li className={style.dropdownMenuItem}>Editar Perfil</li>
              <li className={style.dropdownMenuItem}>Sair</li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}
