import { useState, useEffect } from "react";
import "../css/formation.css";
import {
  getDistrictsByRegion,
  addDistrict,
  updateDistrict,
  deleteDistrict,
} from "../service/district";
import {
  getFokontanyByCommune,
  addFokontany,
  updateFokontany,
  deleteFokontany,
} from "../service/fokontany";
import {
  getCommunesByDistrict,
  addCommune,
  updateCommune,
  deleteCommune,
} from "../service/commune";
import Editer_connexion from "./editer_connexion";
import {
  getAppartenancesByFokontany,
  addAppartenance,
  updateAppartenance,
} from "../service/appartenance";
import Alert_message from "../components/alert_message";
import Suppression from "./suppression";

function Region_comp({ region, setShowReg, regionId }) {
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [fokontanys, setFokontanys] = useState([]);
  const [showSuppression, setShowSuppression] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({
    type: "",
    id: null,
    name: "",
  });

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCommune, setSelectedCommune] = useState(null);

  const [appartenances, setAppartenances] = useState([]);
  const [selectedFokontany, setSelectedFokontany] = useState(null);

  const [showEditConnexion, setShowEditConnexion] = useState(false);
  const [appartenanceEditingList, setAppartenanceEditingList] = useState([]);
  const [alert, setAlert] = useState({ visible: false, message: "", type: "" });

  const showAlert = (message, type = "info") => {
    setAlert({ visible: true, message, type });
    setTimeout(() => setAlert({ visible: false, message: "", type: "" }), 4000);
  };

  console.log(regionId);

  const handleDeleteClick = (type, id, name) => {
    setDeleteInfo({ type, id, name });
    setShowSuppression(true);
  };

  const confirmDeletion = async () => {
    try {
      const { type, id } = deleteInfo;

      if (type === "district") {
        await deleteDistrict(id);
        const data = await getDistrictsByRegion(regionId);
        setDistricts(
          data.map((d) => ({ id: d.idDist, name: d.nomDist, editing: false }))
        );
        setSelectedDistrict(null);
      } else if (type === "commune") {
        await deleteCommune(id);
        const data = await getCommunesByDistrict(selectedDistrict.id);
        setCommunes(
          data.map((c) => ({
            id: c.idComm,
            name: c.nomComm,
            districtId: selectedDistrict.id,
            editing: false,
          }))
        );
        setSelectedCommune(null);
      } else if (type === "fokontany") {
        await deleteFokontany(id);
        const data = await getFokontanyByCommune(selectedCommune.id);
        setFokontanys(
          data.map((f) => ({
            id: f.idFok,
            name: f.nomFok,
            communeId: selectedCommune.id,
            editing: false,
          }))
        );
        setSelectedFokontany(null);
      } else if (type === "appartenance") {
        // await deleteAppartenance(id);
        const data = await getAppartenancesByFokontany(selectedFokontany.id);
        setAppartenances(data.map((a) => ({ ...a, editing: false })));
      }

      setShowSuppression(false);
      setDeleteInfo({ type: "", id: null, name: "" });
      showAlert(`Suppression de ${deleteInfo.type} réussie`, "success");
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  const startEditingDistrict = (id) => {
    setDistricts(
      districts.map((d) => (d.id === id ? { ...d, editing: true } : d))
    );
  };

  const startEditingCommune = (id) => {
    setCommunes(
      communes.map((c) => (c.id === id ? { ...c, editing: true } : c))
    );
  };

  const startEditingFokontany = (id) => {
    setFokontanys(
      fokontanys.map((f) => (f.id === id ? { ...f, editing: true } : f))
    );
  };

  const startEditingAppartenance = (id) => {
    setAppartenances(
      appartenances.map((a) =>
        a.idAppartenance === id ? { ...a, editing: true } : a
      )
    );
  };

  const validateEditDistrict = async (id) => {
    try {
      const district = districts.find((d) => d.id === id);
      if (!district || !district.name.trim()) return;

      await updateDistrict(id, { nomDist: district.name });

      const data = await getDistrictsByRegion(regionId);

      setDistricts(
        data.map((d) => ({ id: d.idDist, name: d.nomDist, editing: false }))
      );
      showAlert("Mis a jour effectué avec succès", "success");
    } catch (err) {
      console.error("Erreur lors de la modification du district :", err);
    }
  };

  const validateEditCommune = async (id) => {
    try {
      const commune = communes.find((c) => c.id === id);
      if (!commune || !commune.name.trim()) return;

      await updateCommune(id, { nomComm: commune.name });

      const data = await getCommunesByDistrict(selectedDistrict.id);
      setCommunes(
        data.map((c) => ({
          id: c.idComm,
          name: c.nomComm,
          districtId: selectedDistrict.id,
          editing: false,
        }))
      );
      showAlert("Mis a jour effectué avec succès", "success");
    } catch (err) {
      console.error("Erreur lors de la modification de la commune :", err);
    }
  };

  const validateEditFokontany = async (id) => {
    try {
      const fokontany = fokontanys.find((f) => f.id === id);
      if (!fokontany || !fokontany.name.trim()) return;

      await updateFokontany(id, { nomFok: fokontany.name });

      const data = await getFokontanyByCommune(selectedCommune.id);
      setFokontanys(
        data.map((f) => ({
          id: f.idFok,
          name: f.nomFok,
          communeId: selectedCommune.id,
          editing: false,
        }))
      );
      showAlert("Mis a jour effectué avec succès", "success");
    } catch (err) {
      console.error("Erreur lors de la modification du fokontany :", err);
    }
  };

  const validateEditAppartenance = async (id) => {
    try {
      const appartenance = appartenances.find((a) => a.idAppartenance === id);
      if (!appartenance || !appartenance.nomAppartenance.trim()) return;

      await updateAppartenance(id, {
        nomAppartenance: appartenance.nomAppartenance,
        fokontany: { idFok: selectedFokontany.id },
      });

      const data = await getAppartenancesByFokontany(selectedFokontany.id);
      setAppartenances(data.map((a) => ({ ...a, editing: false })));
      showAlert("Mis a jour effectué avec succès", "success");
    } catch (err) {
      console.error("Erreur lors de la modification de l'appartenance :", err);
    }
  };

  //   const cancelAllEditing = () => {
  //     setDistricts(districts.map((d) => ({ ...d, editing: false })));
  //     setCommunes(communes.map((c) => ({ ...c, editing: false })));
  //     setFokontanys(fokontanys.map((f) => ({ ...f, editing: false })));
  //     setAppartenances(appartenances.map((a) => ({ ...a, editing: false })));
  //   };

  // const cancelNewEntries = () => {
  //   setDistricts(districts.filter((d) => d.id !== null));
  //   setCommunes(communes.filter((c) => c.id !== null));
  //   setFokontanys(fokontanys.filter((f) => f.id !== null));
  //   setAppartenanceEditingList([]);
  // };
  //   const isInEditingContainer = (element) => {
  //     if (!element) return false;
  //     if (
  //       element.classList?.contains("input-row") ||
  //       element.classList?.contains("validate-btn") ||
  //       element.classList?.contains("annuler_btn") ||
  //       element.tagName === "INPUT"
  //     ) {
  //       return true;
  //     }
  //     if (element.parentElement) {
  //       return isInEditingContainer(element.parentElement);
  //     }
  //     return false;
  //   };

  // useEffect(() => {
  //   const handleGlobalClick = (e) => {
  //     if (!isInEditingContainer(e.target)) {
  //       cancelAllEditing();
  //     }
  //   };

  //   document.addEventListener("click", handleGlobalClick);
  //   return () => document.removeEventListener("click", handleGlobalClick);
  // }, []);

  const addAppartenanceRow = () => {
    if (!selectedFokontany) return;

    setAppartenanceEditingList([
      {
        id: Date.now(),
        name: "",
        fokontanyId: selectedFokontany.id,
        editing: true,
        isNew: true,
      },
      ...appartenanceEditingList,
    ]);
  };

  const validateAppartenance = async (tempId) => {
    try {
      const appartenance = appartenanceEditingList.find((a) => a.id === tempId);
      if (!appartenance || !appartenance.name.trim()) return;

      const newAppart = await addAppartenance(selectedFokontany.id, {
        nomAppartenance: appartenance.name,
      });

      const updatedList = await getAppartenancesByFokontany(
        selectedFokontany.id
      );
      setAppartenances(updatedList);

      // Retirer la ligne temporaire
      setAppartenanceEditingList((prev) => prev.filter((a) => a.id !== tempId));
      showAlert("Ajout effectué avec succès", "success");
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'appartenance :", err);
    }
  };

  const cancelAppartenance = (tempId) => {
    setAppartenanceEditingList((prev) => prev.filter((a) => a.id !== tempId));
  };

  useEffect(() => {
    if (!selectedDistrict || !selectedDistrict.id) {
      setCommunes([]);
      setSelectedCommune(null);
      setFokontanys([]);
      setSelectedFokontany(null);
      setAppartenances([]);
      return;
    }

    setSelectedCommune(null);
    setSelectedFokontany(null);
    setFokontanys([]);
    setAppartenances([]);

    const fetchCommunes = async () => {
      try {
        const data = await getCommunesByDistrict(selectedDistrict.id);
        const mapped = data.map((c) => ({
          id: c.idComm,
          name: c.nomComm,
          districtId: selectedDistrict.id,
          editing: false,
        }));
        setCommunes(mapped);
      } catch (err) {
        console.error("Erreur lors de la récupération des communes :", err);
      }
    };

    fetchCommunes();
  }, [selectedDistrict]);

  const addDistrictRow = () => {
    setDistricts([{ id: null, name: "", editing: true }, ...districts]);
  };

  const addFokontanyrow = () => {
    if (!selectedCommune) return;
    setFokontanys([
      {
        id: null,
        name: "",
        communeId: selectedCommune.id,
        editing: true,
      },
      ...fokontanys,
    ]);
  };

  const addCommuneRow = () => {
    if (!selectedDistrict) return;
    setCommunes([
      { id: null, name: "", districtId: selectedDistrict.id, editing: true },
      ...communes,
    ]);
  };

  const validateDistrict = async (tempId) => {
    try {
      const district = districts.find((d) => d.id === tempId || d.id === null);
      if (!district || !district.name.trim()) return;

      const newDistrict = await addDistrict(regionId, {
        nomDist: district.name,
      });

      setDistricts(
        districts.map((d) =>
          d.id === tempId || d.id === null
            ? {
                id: newDistrict.idDist,
                name: newDistrict.nomDist,
                editing: false,
              }
            : d
        )
      );
      showAlert("Ajout effectué avec succès", "success");
    } catch (err) {
      console.error("Erreur lors de l'ajout du district :", err);
    }
  };

  useEffect(() => {
    if (!regionId) return;

    const fetchDistricts = async () => {
      try {
        const data = await getDistrictsByRegion(regionId);
        const mapped = data.map((d) => ({
          id: d.idDist,
          name: d.nomDist,
          editing: false,
        }));
        setDistricts(mapped);
      } catch (err) {
        console.error("Erreur lors de la récupération des districts :", err);
      }
    };

    fetchDistricts();
  }, [regionId]);

  const validateCommune = async (tempId) => {
    try {
      const commune = communes.find((c) => c.id === tempId || c.id === null);
      if (!commune || !commune.name.trim()) return;

      const newCommune = await addCommune(selectedDistrict.id, {
        nomComm: commune.name,
      });

      setCommunes(
        communes.map((c) =>
          c.id === tempId || c.id === null
            ? {
                id: newCommune.idComm,
                name: newCommune.nomComm,
                districtId: selectedDistrict.id,
                editing: false,
              }
            : c
        )
      );
      showAlert("Ajout effectué avec succès", "success");
    } catch (err) {
      console.error("Erreur lors de l'ajout de la commune :", err);
    }
  };

  const validateFokontany = async (tempId) => {
    try {
      const fok = fokontanys.find((f) => f.id === tempId || f.id === null);
      if (!fok || !fok.name.trim() || !selectedCommune) return;

      const newFok = await addFokontany(selectedCommune.id, {
        nomFok: fok.name,
      });

      setFokontanys(
        fokontanys.map((f) =>
          f.id === tempId || f.id === null
            ? {
                id: newFok.idFok,
                name: newFok.nomFok,
                communeId: selectedCommune.id,
                editing: false,
              }
            : f
        )
      );
      showAlert("Ajout effectué avec succès", "success");
    } catch (err) {
      console.error("Erreur lors de l'ajout du fokontany :", err);
    }
  };

  useEffect(() => {
    if (!selectedCommune?.id) {
      setFokontanys([]);
      setSelectedFokontany(null);
      setAppartenances([]);
      setAppartenanceEditingList([]);
      return;
    }

    setSelectedFokontany(null);
    setAppartenances([]);
    setAppartenanceEditingList([]);

    const fetchFokontanys = async () => {
      try {
        const data = await getFokontanyByCommune(selectedCommune.id);
        setFokontanys(
          data.map((f) => ({
            id: f.idFok,
            name: f.nomFok,
            communeId: selectedCommune.id,
            editing: false,
          }))
        );
      } catch (err) {
        console.error(
          `Erreur lors de la récupération des fokontany pour la commune ${selectedCommune.id} :`,
          err
        );
      }
    };

    fetchFokontanys();
  }, [selectedCommune]);

  const cancelDistrict = (id) => {
    setDistricts(districts.filter((d) => d.id !== id));
    setSelectedDistrict(null);
  };

  const cancelCommune = (id) => {
    setCommunes(communes.filter((c) => c.id !== id));
    setSelectedCommune(null);
  };

  const cancelFokontany = (id) => {
    setFokontanys(fokontanys.filter((f) => f.id !== id));
  };

  useEffect(() => {
    if (!selectedFokontany?.id) {
      setAppartenances([]);
      return;
    }

    const fetchAppartenances = async () => {
      try {
        const data = await getAppartenancesByFokontany(selectedFokontany.id);
        setAppartenances(data.map((a) => ({ ...a, editing: false })));
      } catch (err) {
        console.error(
          `Erreur lors de la récupération des appartenances pour le fokontany ${selectedFokontany.id} :`,
          err
        );
      }
    };

    fetchAppartenances();
  }, [selectedFokontany]);

  const renderDistrictRow = (d, index) => (
    <tr
      id="tr_hov"
      key={d.id ?? `temp-${index}`}
      onClick={() => !d.editing && setSelectedDistrict(d)}
      style={{
        backgroundColor: selectedDistrict?.id === d.id ? "#d0f0ff" : "white",
        cursor: d.editing ? "default" : "pointer",
      }}
    >
      <td>
        {d.editing ? (
          <div id="input_row" className="input-row">
            <input
              type="text"
              value={d.name}
              id="ajout_inp"
              onChange={(e) =>
                setDistricts(
                  districts.map((dist) =>
                    dist.id === d.id ? { ...dist, name: e.target.value } : dist
                  )
                )
              }
            />
            <button
              id="validate-btn"
              className="validate-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (d.id === null) {
                  validateDistrict(d.id);
                } else {
                  validateEditDistrict(d.id);
                }
              }}
              disabled={!d.name.trim()}
            >
              <i className="fa fa-check"></i>
            </button>
            <button
              id="annuler_btn"
              className="annuler_btn"
              onClick={(e) => {
                e.stopPropagation();
                if (d.id === null) {
                  cancelDistrict(d.id);
                } else {
                  setDistricts(
                    districts.map((dist) =>
                      dist.id === d.id ? { ...dist, editing: false } : dist
                    )
                  );
                }
              }}
            >
              <i className="fa fa-times"></i>
            </button>
          </div>
        ) : (
          d.name
        )}
      </td>
      <td id="btn_td2">
        {!d.editing && (
          <>
            <button
              id="mod"
              onClick={(e) => {
                e.stopPropagation();
                startEditingDistrict(d.id);
              }}
            >
              <i className="fa fa-pen"></i>
            </button>
            <button
              id="sup"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick("district", d.id, d.name);
              }}
            >
              <i className="fa fa-trash-alt"></i>
            </button>
          </>
        )}
      </td>
    </tr>
  );

  const renderCommuneRow = (c, index) => (
    <tr
      id="tr_hov"
      key={c.id ?? `temp-comm-${index}`}
      onClick={() => !c.editing && setSelectedCommune(c)}
      style={{
        backgroundColor: selectedCommune?.id === c.id ? "#d0f0ff" : "white",
        cursor: c.editing ? "default" : "pointer",
      }}
    >
      <td>
        {c.editing ? (
          <div id="input_row" className="input-row">
            <input
              type="text"
              value={c.name}
              id="ajout_inp"
              onChange={(e) =>
                setCommunes(
                  communes.map((comm) =>
                    comm.id === c.id ? { ...comm, name: e.target.value } : comm
                  )
                )
              }
            />
            <button
              id="validate-btn"
              className="validate-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (c.id === null) {
                  validateCommune(c.id);
                } else {
                  validateEditCommune(c.id);
                }
              }}
              disabled={!c.name.trim()}
            >
              <i className="fa fa-check"></i>
            </button>
            <button
              id="annuler_btn"
              className="annuler_btn"
              onClick={(e) => {
                e.stopPropagation();
                if (c.id === null) {
                  cancelCommune(c.id);
                } else {
                  setCommunes(
                    communes.map((comm) =>
                      comm.id === c.id ? { ...comm, editing: false } : comm
                    )
                  );
                }
              }}
            >
              <i className="fa fa-times"></i>
            </button>
          </div>
        ) : (
          c.name
        )}
      </td>
      <td id="btn_td2">
        {!c.editing && (
          <>
            <button
              id="mod"
              onClick={(e) => {
                e.stopPropagation();
                startEditingCommune(c.id);
              }}
            >
              <i className="fa fa-pen"></i>
            </button>
            <button
              id="sup"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick("commune", c.id, c.name);
              }}
            >
              <i className="fa fa-trash-alt"></i>
            </button>
          </>
        )}
      </td>
    </tr>
  );

  const renderFokontanyRow = (f, index) => (
    <tr
      id="tr_hov"
      key={f.id ?? `temp-fok-${index}`}
      onClick={() => !f.editing && setSelectedFokontany(f)}
      style={{
        backgroundColor: selectedFokontany?.id === f.id ? "#d0f0ff" : "white",
        cursor: f.editing ? "default" : "pointer",
      }}
    >
      <td>
        {f.editing ? (
          <div id="input_row" className="input-row">
            <input
              type="text"
              value={f.name}
              id="ajout_inp"
              onChange={(e) =>
                setFokontanys(
                  fokontanys.map((fok) =>
                    fok.id === f.id ? { ...fok, name: e.target.value } : fok
                  )
                )
              }
            />
            <button
              id="validate-btn"
              className="validate-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (f.id === null) {
                  validateFokontany(f.id);
                } else {
                  validateEditFokontany(f.id);
                }
              }}
              disabled={!f.name.trim()}
            >
              <i className="fa fa-check"></i>
            </button>
            <button
              id="annuler_btn"
              className="annuler_btn"
              onClick={(e) => {
                e.stopPropagation();
                if (f.id === null) {
                  cancelFokontany(f.id);
                } else {
                  setFokontanys(
                    fokontanys.map((fok) =>
                      fok.id === f.id ? { ...fok, editing: false } : fok
                    )
                  );
                }
              }}
            >
              <i className="fa fa-times"></i>
            </button>
          </div>
        ) : (
          f.name
        )}
      </td>
      <td id="btn_td2">
        {!f.editing && (
          <>
            <button
              id="mod"
              onClick={(e) => {
                e.stopPropagation();
                startEditingFokontany(f.id);
              }}
            >
              <i className="fa fa-pen"></i>
            </button>
            <button
              id="sup"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick("fokontany", f.id, f.name);
              }}
            >
              <i className="fa fa-trash-alt"></i>
            </button>
          </>
        )}
      </td>
    </tr>
  );

  const renderAppartenanceRow = (a, index) => {
    const isNew = a.isNew;
    const isEditing = a.editing;

    return (
      <tr id="tr_hov" key={a.idAppartenance ?? a.id}>
        <td>
          {isEditing ? (
            <div id="input_row" className="input-row">
              <input
                type="text"
                value={isNew ? a.name : a.nomAppartenance}
                id="ajout_inp"
                onChange={(e) => {
                  if (isNew) {
                    setAppartenanceEditingList((prev) =>
                      prev.map((app) =>
                        app.id === a.id ? { ...app, name: e.target.value } : app
                      )
                    );
                  } else {
                    setAppartenances(
                      appartenances.map((app) =>
                        app.idAppartenance === a.idAppartenance
                          ? { ...app, nomAppartenance: e.target.value }
                          : app
                      )
                    );
                  }
                }}
              />
              <button
                id="validate-btn"
                className="validate-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isNew) {
                    validateAppartenance(a.id);
                  } else {
                    validateEditAppartenance(a.idAppartenance);
                  }
                }}
                disabled={!((isNew ? a.name : a.nomAppartenance) || "").trim()}
              >
                <i className="fa fa-check"></i>
              </button>
              <button
                id="annuler_btn"
                className="annuler_btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isNew) {
                    cancelAppartenance(a.id);
                  } else {
                    setAppartenances(
                      appartenances.map((app) =>
                        app.idAppartenance === a.idAppartenance
                          ? { ...app, editing: false }
                          : app
                      )
                    );
                  }
                }}
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
          ) : (
            a.nomAppartenance
          )}
        </td>
        <td id="btn_td2">
          {!isEditing && !isNew && (
            <>
              <button
                id="mod"
                onClick={(e) => {
                  e.stopPropagation();
                  startEditingAppartenance(a.idAppartenance);
                }}
              >
                <i className="fa fa-pen"></i>
              </button>
              <button
                id="sup"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(
                    "appartenance",
                    a.idAppartenance,
                    a.nomAppartenance
                  );
                }}
              >
                <i className="fa fa-trash-alt"></i>
              </button>
            </>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div id="info_perso">
      <div id="info_perso2_region">
        <div className="entete">
          <h3>Region {region.nomReg}</h3>
          <button id="editer" onClick={() => setShowEditConnexion(true)}>
            <span>Editer les informations de connexion</span>{" "}
            <i className="fa fa-pen"></i>
          </button>
          <button id="quitter" onClick={() => setShowReg(false)}>
            <i className="fa fa-plus"></i>
          </button>
        </div>
        <div className="bas3">
          {/* DISTRICT */}
          <div className="bas_gauche1">
            <div className="haut">
              <h3>District</h3>
              <button onClick={addDistrictRow}>
                <span>Ajout district</span> <i className="fa fa-plus"></i>
              </button>
            </div>
            <div id="bas_tableau">
              <table>
                <tbody>
                  {districts.length > 0 ? (
                    districts.map(renderDistrictRow)
                  ) : (
                    <tr>
                      <td
                        colSpan="2"
                        style={{ textAlign: "center", color: "#888" }}
                      >
                        Aucun district à afficher
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* COMMUNE */}
          <div className="bas_milieu">
            <div className="haut">
              <h3>Commune</h3>
              <button
                onClick={addCommuneRow}
                disabled={!selectedDistrict}
                id={!selectedDistrict ? "disabled" : ""}
              >
                <span>Ajout Commune</span> <i className="fa fa-plus"></i>
              </button>
            </div>
            <div id="bas_tableau">
              <table>
                <tbody>
                  {communes.filter((c) => c.districtId === selectedDistrict?.id)
                    .length > 0 ? (
                    communes
                      .filter((c) => c.districtId === selectedDistrict?.id)
                      .map(renderCommuneRow)
                  ) : (
                    <tr>
                      <td
                        colSpan="2"
                        style={{ textAlign: "center", color: "#888" }}
                      >
                        Aucune commune à afficher
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* FOKONTANY */}
          <div className="bas_droite1">
            <div className="haut">
              <h3>Fokontany</h3>
              <button
                onClick={addFokontanyrow}
                disabled={!selectedCommune}
                id={!selectedCommune ? "disabled" : ""}
              >
                <span>Ajout Fokontany</span> <i className="fa fa-plus"></i>
              </button>
            </div>
            <div id="bas_tableau">
              <table>
                <tbody>
                  {fokontanys.filter((f) => f.communeId === selectedCommune?.id)
                    .length > 0 ? (
                    fokontanys
                      .filter((f) => f.communeId === selectedCommune?.id)
                      .map(renderFokontanyRow)
                  ) : (
                    <tr>
                      <td
                        colSpan="2"
                        style={{ textAlign: "center", color: "#888" }}
                      >
                        Aucune fokontany à afficher
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* APPARTENANCE */}
          <div className="bas_droite1">
            <div className="haut">
              <h3>Appartenance</h3>
              <button
                onClick={addAppartenanceRow}
                disabled={!selectedFokontany}
                id={!selectedFokontany ? "disabled" : ""}
              >
                <span>Ajout Appartenance</span> <i className="fa fa-plus"></i>
              </button>
            </div>
            <div id="bas_tableau">
              <table>
                <tbody>
                  {[...appartenanceEditingList, ...appartenances].length > 0 ? (
                    [...appartenanceEditingList, ...appartenances].map(
                      renderAppartenanceRow
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="2"
                        style={{ textAlign: "center", color: "#888" }}
                      >
                        Aucune appartenance à afficher
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showEditConnexion && (
        <Editer_connexion
          region={region}
          regionId={regionId}
          onClose={() => setShowEditConnexion(false)}
        />
      )}
      {showSuppression && (
        <Suppression
          titre_sup={deleteInfo.type}
          texte="Tous les éléments associés seront également supprimés."
          setShowSupCrud={setShowSuppression}
          onConfirmDelete={confirmDeletion}
        />
      )}
      <Alert_message
        visible={alert.visible}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ ...alert, visible: false })}
      />
    </div>
  );
}

export default Region_comp;
