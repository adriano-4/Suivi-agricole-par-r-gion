import "../css/partager.css";
import { useState, useEffect } from "react";

function partager_reg({ nom_reg, selectAll, onSelectChange }) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(selectAll);
  }, [selectAll]);

  const handleClick = () => {
    setSelected((prev) => !prev);
  };
  useEffect(() => {
    onSelectChange(nom_reg, selected);
  }, [selected, nom_reg, onSelectChange]);

  return (
    <div
      id="partager_reg"
      onClick={handleClick}
      className={selected ? "selected" : ""}
    >
      <h4>{nom_reg}</h4>
    </div>
  );
}

export default partager_reg;
