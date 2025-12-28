import { useState, useEffect, useRef } from "react";
import "../css/suivi.css";
import { getStatByRegion } from "../service/stat";

function donnee({ region, onPlusStatClick }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const anneePrecedente = new Date().getFullYear() - 1;
  const anneeActuelle = new Date().getFullYear();

  console.log(region.color);
  useEffect(() => {
    if (!region || !region.nomReg) return;
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getStatByRegion(region.nomReg);
        setStats(data);
      } catch (err) {
        setError("Erreur lors du chargement des statistiques.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [region]);

  if (loading) return <p>Chargement des statistiques...</p>;
  if (error) return <p>{error}</p>;
  if (!stats) return <p>Aucune statistique disponible.</p>;

  const valueClass = (val) => (val === 0 ? "stat-zero" : "");
  const valeurmax = 200;
  const superficieCible = stats.superficie_fsrp_actuelle;
  const pourcentage = Math.min((superficieCible / valeurmax) * 100, 100);

  return (
    <div id="donnee">
      <div className="donnee_haut">
        <section>
          <i className="fa fa-location-dot"></i>
          <h4>{region.nomReg}</h4>
        </section>
        {/* <i className="fa fa-list"></i> */}
        {/* <div className="color" style={{ backgroundColor: region.color }}></div> */}
      </div>
      <div className="donnee_bas">
        <div>
          <p>Nombre de bénéficiaire :</p>
          <span className={valueClass(stats.nbr_beneficiaire)}>
            {stats.nbr_beneficiaire}
          </span>
        </div>
        {/* <div>
          <p>Nombre de formation :</p>
          <span className={valueClass(stats.nbr_formation)}>
            {stats.nbr_formation}
          </span>
        </div> */}
        <div>
          <p>Superficie total ({anneePrecedente}):</p>
          <span className={valueClass(stats.superficie_precedente)}>
            {stats.superficie_precedente} Ha
          </span>
        </div>
        <div>
          <p>Superficie total ({anneeActuelle}):</p>
          <span className={valueClass(stats.superficie_actuelle)}>
            {stats.superficie_actuelle} Ha
          </span>
        </div>
        <div>
          <p>Superficie cible ({anneeActuelle}):</p>
          <span className={valueClass(stats.superficie_fsrp_actuelle)}>
            {stats.superficie_fsrp_actuelle} Ha
          </span>
        </div>
      </div>
      {/* <section className="pource">
        <text className="objectif">Objectif : {valeurmax} Ha</text>
        <div className="pourcentage">
          <div className="actuel" style={{ width: `${pourcentage}%` }}>
            {pourcentage > 0 && <text>{pourcentage}%</text>}
          </div>
        </div>
      </section> */}
      <div id="plu_info">
        {" "}
        <button
          id="plus_stat"
          onClick={() => {
            if (onPlusStatClick) onPlusStatClick(region, stats);
          }}
        >
          <span>Plus de statistiques</span>
          <i className="fa fa-arrow-right"></i>
          {/* <i className="fa fa-chart-column"></i> */}
        </button>
      </div>
    </div>
  );
}

export default donnee;
