import { useState } from "react";
import "../css/regionbtn.css";
import { useNavigate } from "react-router-dom";
function regionbtn({ region, setShowReg, setShowSupCrud }) {
  return (
    <button
      id="btn_reg"
      onClick={() => {
        setShowReg(true);
      }}
    >
      <span>
        {region.nomReg}
        <div
          id="sup_reg"
          onClick={(e) => {
            e.stopPropagation();
            setShowSupCrud(true);
          }}
        >
          <i className="fa fa-trash-alt"></i>
        </div>
      </span>
      <p>
        plus d'info <i className="fa fa-arrow-right"></i>
      </p>
    </button>
  );
}

export default regionbtn;
