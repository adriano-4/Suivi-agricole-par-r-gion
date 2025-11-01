import { useState, useEffect, useRef } from "react";
import "../css/suivi.css";
import { getStatByRegion } from "../service/stat";

function donnee({ region }) {
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
          <p>Superficie d'appui ({anneeActuelle}):</p>
          <span className={valueClass(stats.superficie_fsrp_actuelle)}>
            {stats.superficie_fsrp_actuelle} Ha
          </span>
        </div>
      </div>
    </div>
  );
}

export default donnee;
