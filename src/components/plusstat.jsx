import { useState, useEffect } from "react";
import Alert_message from "../components/alert_message";
import { getActionsEtatByRegion } from "../service/actionEtatView";
import { DepthwiseConv2dNative, div } from "@tensorflow/tfjs";
import { getBeneficiairesByRegion } from "../service/beneficiaireIntrantView.js";
import { getObjectifs } from "../service/objectif.js";

function Plusstat({ onClose, region, stats }) {
  const [actions, setActions] = useState([]);
  const [intrants, setIntrants] = useState([]);
  const [nbBeneficiaires, setNbBeneficiaires] = useState(0);
  const [objectifs, setObjectifs] = useState([]);

  const STATUS_STYLES = {
    "en cours": {
      border: "1px solid orange",
      background: "rgba(255, 165, 0, 0.1)",
      color: "orange",
    },
    "en attente": {
      border: "1px solid rgba(128, 128, 128, 0.2)",
      background: "rgba(128, 128, 128, 0.1)",
      color: "gray",
    },
    exécuté: {
      border: "1px solid rgba(0, 128, 0, 0.2)",
      background: "rgba(0, 128, 0, 0.1)",
      color: "green",
    },
  };

  useEffect(() => {
    if (region) {
      getActionsEtatByRegion(region.nomReg)
        .then((data) => setActions(data))
        .catch((err) => console.error(err));

      getBeneficiairesByRegion(region.nomReg)
        .then((data) => {
          const aggregated = {};
          const beneficiairesDistincts = new Set();

          data.forEach((item) => {
            const key = item.intrant;

            if (item.id_benef) {
              beneficiairesDistincts.add(item.id_benef);
            }

            if (!aggregated[key]) {
              aggregated[key] = {
                intrant: item.intrant,
                quantite: item.quantite ?? 0,
                unite: item.unite ?? "",
                id_benef: item.id_benef,
              };
            } else {
              aggregated[key].quantite += item.quantite ?? 0;
            }
          });

          setIntrants(Object.values(aggregated));
          setNbBeneficiaires(beneficiairesDistincts.size);
        })
        .catch((err) => console.error(err));
    }
  }, [region]);

  const fetchObjectifs = async () => {
    try {
      const data = await getObjectifs();
      setObjectifs(data);
    } catch (error) {
      console.error("Erreur lors du chargement des objectifs :", error);
    } finally {
    }
  };
  useEffect(() => {
    fetchObjectifs();
  }, []);

  const normalize = (str) => str?.trim().toLowerCase();

  const getObjectifForIntrant = (intrantName) => {
    const obj = objectifs.find(
      (o) => normalize(o.libelle) === normalize(intrantName)
    );
    if (obj) return `${obj.quantiteObj} ${obj.unite}`;
    return "—";
  };

  const valeurmax = getObjectifForIntrant("superficie_fsrp");
  const superficieCible = stats.superficie_fsrp_actuelle;
  const pourcentage = Math.min(
    (superficieCible / parseFloat(valeurmax)) * 100,
    100
  );

  const getPourcentageIntrant = (intrantName, quantite) => {
    const objStr = getObjectifForIntrant(intrantName);
    const valeurObj = parseFloat(objStr); // 200 ou 50
    if (!valeurObj || valeurObj === 0) return 0;
    return Math.min((quantite / valeurObj) * 100, 100).toFixed(1);
  };

  const actionsEnAttente = actions.filter((a) => a.etat === 2);
  const actionsEnCours = actions.filter((a) => a.etat === 1);
  const actionsExecutees = actions.filter((a) => a.etat === 0);

  const getStyleForTitle = (title) => {
    if (title.toLowerCase().includes("en attente"))
      return STATUS_STYLES["en attente"];
    if (title.toLowerCase().includes("en cours"))
      return STATUS_STYLES["en cours"];
    if (title.toLowerCase().includes("exécutée"))
      return STATUS_STYLES["exécuté"];
    return {};
  };

  const renderIntrants = () => {
    return intrants.map((i) => (
      <div key={`${i.id_benef}-${i.intrant}`} className="int_divb1">
        <p>
          {i.intrant}{" "}
          <span id="span2">
            ({getPourcentageIntrant(i.intrant, i.quantite)}%)
          </span>
        </p>
        <span>
          {i.quantite}
          {/* {i.unite}{" "} */}
          <span id="span2">sur {getObjectifForIntrant(i.intrant)}</span>
        </span>
      </div>
    ));
  };

  const renderActionBlock = (title, actions) => {
    const count = actions.length || 0;
    return (
      <div className="act_div" style={getStyleForTitle(title)}>
        <div className="act_divh">
          <p>{title}</p>
          <span>{count}</span>
        </div>
        <div id="ligne_"></div>
        <div className="act_divb">
          {actions.length > 0
            ? actions.map((a) => (
                <div key={a.id_action_etat} className="act_divb1">
                  <p>{a.action}</p>
                  <span>{a.dateAction ? a.dateAction : "—"}</span>
                </div>
              ))
            : null}
        </div>
      </div>
    );
  };

  return (
    <div id="info_perso">
      <div id="info_perso2">
        <div className="entete">
          <h3>Statistiques de {region.nomReg}</h3>

          <button onClick={onClose}>
            <i className="fa fa-plus"></i>
          </button>
        </div>

        <div className="bas33">
          <div className="bas33gauche">
            <h5>Actions</h5>

            {renderActionBlock(
              "Action en attente d'éxecution",
              actionsEnAttente
            )}
            {renderActionBlock("Action en cours d'exécution", actionsEnCours)}
            {renderActionBlock("Action exécutée", actionsExecutees)}
          </div>
          <div className="bas33droite">
            <h5>Intrants et Matériels</h5>
            <p className="obj_text">
              Le pourcentage indiqué à côté de chaque intrant ou matériel
              reflète le taux de distribution réalisé par rapport à l’objectif
              fixé.
            </p>
            <div className="int_div">
              <div className="int_divh">
                <p>Intrants et matériels distribués </p>
                <span> Réparti entre {nbBeneficiaires} bénéficiaires</span>
              </div>
              <div id="ligne_2"></div>
              <div className="int_divb">{renderIntrants()}</div>
            </div>
            <h5>
              Superficie cible
              <text className="objectif">Objectif : {valeurmax}</text>
            </h5>
            <div className="sup_div">
              <p>
                Superfice cible actuel : {stats.superficie_fsrp_actuelle} Ha
              </p>
              <section className="pource">
                <div className="pourcentage">
                  <div className="actuel" style={{ width: `${pourcentage}%` }}>
                    {pourcentage > 0 && <text>{pourcentage}%</text>}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plusstat;
