import { useState, useEffect } from "react";
import NavBar from "../components/navBar";
import "../css/responsable.css";
import Alert_message from "../components/alert_message";
import {
  getSuperviseurs,
  getTechniciens,
  getResponsables,
} from "../service/responsable";
import {
  createSuperviseur,
  createTechnicien,
  createResponsable,
} from "../service/responsable";
import Suppression from "../components/suppression";
import {
  deleteSuperviseur,
  deleteTechnicien,
  deleteResponsable,
} from "../service/responsable";
import {
  updateSuperviseur,
  updateTechnicien,
  updateResponsable,
} from "../service/responsable";

function Responsable() {
  const [activeRole, setActiveRole] = useState("superviseur");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [newEntry, setNewEntry] = useState({
    nom: "",
    prenom: "",
    contact: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editEntry, setEditEntry] = useState({
    nom: "",
    prenom: "",
    contact: "",
  });

  const showSuccessMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  useEffect(() => {
    fetchData(activeRole);
    setIsAdding(false);
  }, [activeRole]);

  const fetchData = async (role) => {
    try {
      let response;
      if (role === "superviseur") {
        response = await getSuperviseurs();
      } else if (role === "technicien") {
        response = await getTechniciens();
      } else if (role === "responsable") {
        response = await getResponsables();
      }

      const result = response.data;
      setData(result);
      console.log("Données chargées :", result);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  useEffect(() => {
    fetchData(activeRole);
  }, [activeRole]);

  const handleRoleClick = (role) => {
    setActiveRole(role);
    setSearchTerm("");
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(data);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = data.filter((item) => {
        const nom = item.nomSup || item.nomTech || item.nomResp || "";
        const prenom =
          item.prenomSup || item.prenomTech || item.prenomResp || "";
        const contact =
          item.contactSup || item.contactTech || item.contactResp || "";

        const fullName = `${nom} ${prenom}`.toLowerCase();

        return (
          fullName.includes(lowerSearch) ||
          contact.toLowerCase().includes(lowerSearch)
        );
      });
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  const handleAddClick = () => {
    setIsAdding(true);
    setNewEntry({ nom: "", prenom: "", contact: "" });
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  //code na ajout
  const handleValidate = async () => {
    try {
      let payload = {};

      if (activeRole === "superviseur") {
        payload = {
          nomSup: newEntry.nom,
          prenomSup: newEntry.prenom,
          contactSup: newEntry.contact,
        };
        const response = await createSuperviseur(payload);
        setData([response.data, ...data]);
        setFilteredData([response.data, ...filteredData]);
      } else if (activeRole === "technicien") {
        payload = {
          nomTech: newEntry.nom,
          prenomTech: newEntry.prenom,
          contactTech: newEntry.contact,
        };
        const response = await createTechnicien(payload);
        setData([response.data, ...data]);
        setFilteredData([response.data, ...filteredData]);
      } else if (activeRole === "responsable") {
        payload = {
          nomResp: newEntry.nom,
          prenomResp: newEntry.prenom,
          contactResp: newEntry.contact,
        };
        const response = await createResponsable(payload);
        setData([response.data, ...data]);
        setFilteredData([response.data, ...filteredData]);
      }

      setIsAdding(false);
      showSuccessMessage(
        `${
          activeRole.charAt(0).toUpperCase() + activeRole.slice(1)
        } ajouté avec succès.`
      );
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  //code na suppression
  const handleDeleteClick = (item) => {
    setEntryToDelete(item);
    setShowDeleteModal(true);
  };
  const handleConfirmDelete = async () => {
    try {
      if (!entryToDelete) return;

      if (activeRole === "superviseur") {
        await deleteSuperviseur(entryToDelete.idSup);
      } else if (activeRole === "technicien") {
        await deleteTechnicien(entryToDelete.idTech);
      } else if (activeRole === "responsable") {
        await deleteResponsable(entryToDelete.idResp);
      }

      const updatedData = data.filter((d) => {
        if (activeRole === "superviseur")
          return d.idSup !== entryToDelete.idSup;
        if (activeRole === "technicien")
          return d.idTech !== entryToDelete.idTech;
        if (activeRole === "responsable")
          return d.idResp !== entryToDelete.idResp;
        return true;
      });

      setData(updatedData);
      setFilteredData(updatedData);
      setShowDeleteModal(false);
      setEntryToDelete(null);
      showSuccessMessage(
        `${
          activeRole.charAt(0).toUpperCase() + activeRole.slice(1)
        } supprimé avec succès.`
      );
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  //code na modification
  const handleEditClick = (item) => {
    const nom = item.nomSup || item.nomTech || item.nomResp || "";
    const prenom = item.prenomSup || item.prenomTech || item.prenomResp || "";
    const contact =
      item.contactSup || item.contactTech || item.contactResp || "";
    setEditingId(item.idSup || item.idTech || item.idResp);
    setEditEntry({ nom, prenom, contact });
  };
  const handleEditValidate = async () => {
    try {
      let updatedItem;
      if (activeRole === "superviseur") {
        const payload = {
          nomSup: editEntry.nom,
          prenomSup: editEntry.prenom,
          contactSup: editEntry.contact,
        };
        updatedItem = await updateSuperviseur(editingId, payload);
      } else if (activeRole === "technicien") {
        const payload = {
          nomTech: editEntry.nom,
          prenomTech: editEntry.prenom,
          contactTech: editEntry.contact,
        };
        updatedItem = await updateTechnicien(editingId, payload);
      } else if (activeRole === "responsable") {
        const payload = {
          nomResp: editEntry.nom,
          prenomResp: editEntry.prenom,
          contactResp: editEntry.contact,
        };
        updatedItem = await updateResponsable(editingId, payload);
      }
      const updatedData = data.map((item) => {
        const id = item.idSup || item.idTech || item.idResp;
        if (id === editingId) {
          return { ...item, ...updatedItem.data };
        }
        return item;
      });

      setData(updatedData);
      setFilteredData(updatedData);
      setEditingId(null);
      showSuccessMessage(
        `${
          activeRole.charAt(0).toUpperCase() + activeRole.slice(1)
        } modifié avec succès.`
      );
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  return (
    <div id="ppale_resp">
      <NavBar />

      <div id="affichagerespo">
        <button
          className={activeRole === "superviseur" ? "active" : ""}
          onClick={() => handleRoleClick("superviseur")}
        >
          <div className="tete_resp">
            <i className="fa fa-user-tie"></i>
            <span>Superviseur</span>
          </div>
          <div className="bas_resp">
            <p>Superviseur responsable d'une formation</p>
          </div>
        </button>

        <button
          className={activeRole === "technicien" ? "active" : ""}
          onClick={() => handleRoleClick("technicien")}
        >
          <div className="tete_resp">
            <i className="fa fa-user-cog"></i>
            <span>Technicien</span>
          </div>
          <div className="bas_resp">
            <p>Technicien vulgarisateur d'une formation</p>
          </div>
        </button>

        <button
          className={activeRole === "responsable" ? "active" : ""}
          onClick={() => handleRoleClick("responsable")}
        >
          <div className="tete_resp">
            <i className="fa fa-warehouse"></i>
            <span>Responsable Magasin</span>
          </div>
          <div className="bas_resp">
            <p>Responsable de magasin dans livraison</p>
          </div>
        </button>
      </div>

      <div id="tableau_resp">
        <div className="entete_responsable">
          <input
            type="text"
            placeholder={`Recherche de ${
              activeRole.charAt(0).toUpperCase() + activeRole.slice(1)
            } ...`}
            id="recherche_benef"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              boxShadow:
                searchTerm && filteredData.length === 0
                  ? "0 0 7px red"
                  : "none",
              border: "none",
            }}
          />
          <button onClick={handleAddClick}>
            <span>Ajouter</span>
            <i className="fa fa-plus"></i>
          </button>
        </div>

        <div className="tableau_responsable__">
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Contact</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isAdding && (
                <tr>
                  <td>
                    <input
                      id="ajout_resp"
                      type="text"
                      value={newEntry.nom}
                      onChange={(e) =>
                        setNewEntry({ ...newEntry, nom: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      id="ajout_resp"
                      type="text"
                      value={newEntry.prenom}
                      onChange={(e) =>
                        setNewEntry({ ...newEntry, prenom: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      id="ajout_resp"
                      type="text"
                      value={newEntry.contact}
                      onChange={(e) =>
                        setNewEntry({ ...newEntry, contact: e.target.value })
                      }
                      maxLength={10}
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/\D/g, ""))
                      }
                    />
                  </td>
                  <td id="btn_td3">
                    <button id="valid_btn_resp" onClick={handleValidate}>
                      <i className="fa fa-check"></i>
                    </button>
                    <button id="annuler-btn-resp" onClick={handleCancel}>
                      <i className="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
              )}
              {filteredData.length > 0 ? (
                filteredData.map((item) => {
                  const id = item.idSup || item.idTech || item.idResp;
                  const nom =
                    item.nomSup || item.nomTech || item.nomResp || "-";
                  const prenom =
                    item.prenomSup || item.prenomTech || item.prenomResp || "-";
                  const contact =
                    item.contactSup ||
                    item.contactTech ||
                    item.contactResp ||
                    "-";
                  if (editingId === id) {
                    return (
                      <tr key={id}>
                        <td>
                          <input
                            id="ajout_resp"
                            type="text"
                            value={editEntry.nom}
                            onChange={(e) =>
                              setEditEntry({
                                ...editEntry,
                                nom: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            id="ajout_resp"
                            type="text"
                            value={editEntry.prenom}
                            onChange={(e) =>
                              setEditEntry({
                                ...editEntry,
                                prenom: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            id="ajout_resp"
                            type="text"
                            value={editEntry.contact}
                            onChange={(e) =>
                              setEditEntry({
                                ...editEntry,
                                contact: e.target.value,
                              })
                            }
                            maxLength={10}
                            onInput={(e) =>
                              (e.target.value = e.target.value.replace(
                                /\D/g,
                                ""
                              ))
                            }
                          />
                        </td>
                        <td id="btn_td3">
                          <button
                            id="valid_btn_resp"
                            onClick={handleEditValidate}
                          >
                            <i className="fa fa-check"></i>
                          </button>
                          <button
                            id="annuler-btn-resp"
                            onClick={handleEditCancel}
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={id}>
                      <td>{nom.toUpperCase()}</td>
                      <td>{prenom}</td>
                      <td>{contact}</td>
                      <td id="btn_td3">
                        <button id="mod" onClick={() => handleEditClick(item)}>
                          <i className="fa fa-pen"></i>
                        </button>
                        <button
                          id="sup"
                          onClick={() => handleDeleteClick(item)}
                        >
                          <i className="fa fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{ textAlign: "center", color: "gray" }}
                  >
                    Aucune donnée trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showDeleteModal && (
        <Suppression
          titre_sup={activeRole}
          texte=""
          setShowSupCrud={setShowDeleteModal}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
      <Alert_message
        visible={showAlert}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
}

export default Responsable;
