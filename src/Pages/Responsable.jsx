import { useState, useEffect } from "react";
import NavBar from "../components/navBar";
import "../css/responsable.css";
import Alert_message from "../components/alert_message";
import { getAllUnites } from "../service/unite";

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
import {
  getIntrants,
  createIntrant,
  updateIntrant,
  deleteIntrant,
  getAutresProduits,
  createAutreProduit,
  updateAutreProduit,
  deleteAutreProduit,
} from "../service/produits";

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
  const [unites, setUnites] = useState([]);
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

  const [products, setProducts] = useState([]);
  const [intrants, setIntrants] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({ type: "", unite: "" });
  const [editProduct, setEditProduct] = useState({ type: "", unite: "" });
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingIntrant, setIsAddingIntrant] = useState(false);

  useEffect(() => {
    const fetchUnites = async () => {
      try {
        const data = await getAllUnites();
        setUnites(data);
      } catch (error) {
        console.error("Erreur chargement unités:", error);
      }
    };
    fetchUnites();
  }, []);

  const showSuccessMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  useEffect(() => {
    if (["produit", "intrant"].includes(activeRole)) {
      fetchProduitsOuIntrants();
      setIsAddingProduct(false);
      setIsAddingIntrant(false);
    } else {
      fetchData(activeRole);
      setIsAdding(false);
    }
  }, [activeRole]);

  const fetchData = async (role) => {
    try {
      let response;
      if (role === "superviseur") response = await getSuperviseurs();
      else if (role === "technicien") response = await getTechniciens();
      else if (role === "responsable") response = await getResponsables();

      if (response) {
        const result = response.data;
        setData(result);
        setFilteredData(result);
      }
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  const fetchProduitsOuIntrants = async () => {
    try {
      if (activeRole === "produit") {
        const response = await getAutresProduits();
        if (response) {
          setProducts(response.data);
        }
      } else if (activeRole === "intrant") {
        const response = await getIntrants();
        if (response) {
          setIntrants(response.data);
        }
      }
    } catch (error) {
      console.error("Erreur chargement produits/intrants :", error);
    }
  };

  useEffect(() => {
    setEditingProductId(null);
    setIsAddingProduct(false);
    setIsAddingIntrant(false);
    setEditingId(null);
  }, [activeRole]);

  const handleRoleClick = (role) => {
    setActiveRole(role);
    setSearchTerm("");
    setIsAdding(false);
    setIsAddingProduct(false);
    setIsAddingIntrant(false);
    setEditingProductId(null);
    setEditingId(null);
  };

  useEffect(() => {
    if (["produit", "intrant"].includes(activeRole)) {
      const currentData = activeRole === "produit" ? products : intrants;
      if (searchTerm.trim() === "") {
        // Pas besoin de filtrer, on utilise les données originales
        return;
      } else {
        const lower = searchTerm.toLowerCase();
        const filtered = currentData.filter((item) => {
          const type = item.typeProduit || item.typeIntrant || "";
          const uniteMesure = item.unite?.uniteMesure || "";
          return (
            type.toLowerCase().includes(lower) ||
            uniteMesure.toLowerCase().includes(lower)
          );
        });
        if (activeRole === "produit") {
        } else if (activeRole === "intrant") {
        }
      }
    } else {
      if (searchTerm.trim() === "") {
        setFilteredData(data);
      } else {
        const lower = searchTerm.toLowerCase();
        const filtered = data.filter((item) => {
          const nom = item.nomSup || item.nomTech || item.nomResp || "";
          const prenom =
            item.prenomSup || item.prenomTech || item.prenomResp || "";
          const contact =
            item.contactSup || item.contactTech || item.contactResp || "";
          const fullName = `${nom} ${prenom}`.toLowerCase();
          return (
            fullName.includes(lower) || contact.toLowerCase().includes(lower)
          );
        });
        setFilteredData(filtered);
      }
    }
  }, [searchTerm, data, activeRole, products, intrants]);

  const handleAddClick = () => {
    setIsAdding(true);
    setNewEntry({ nom: "", prenom: "", contact: "" });
  };

  const handleCancel = () => setIsAdding(false);

  // ✅ Ajout superviseur / technicien / responsable
  const handleValidate = async () => {
    try {
      let payload = {};
      let response;

      if (activeRole === "superviseur") {
        payload = {
          nomSup: newEntry.nom,
          prenomSup: newEntry.prenom,
          contactSup: newEntry.contact,
        };
        response = await createSuperviseur(payload);
      } else if (activeRole === "technicien") {
        payload = {
          nomTech: newEntry.nom,
          prenomTech: newEntry.prenom,
          contactTech: newEntry.contact,
        };
        response = await createTechnicien(payload);
      } else if (activeRole === "responsable") {
        payload = {
          nomResp: newEntry.nom,
          prenomResp: newEntry.prenom,
          contactResp: newEntry.contact,
        };
        response = await createResponsable(payload);
      }

      if (response) {
        const newData = [response.data, ...data];
        setData(newData);
        setFilteredData(newData);
      }

      setIsAdding(false);
      showSuccessMessage(`${activeRole} ajouté avec succès.`);
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  const handleDeleteClick = (item) => {
    setEntryToDelete(item);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!entryToDelete) return;

      if (activeRole === "superviseur")
        await deleteSuperviseur(entryToDelete.idSup);
      else if (activeRole === "technicien")
        await deleteTechnicien(entryToDelete.idTech);
      else if (activeRole === "responsable")
        await deleteResponsable(entryToDelete.idResp);
      else if (activeRole === "produit") {
        await deleteAutreProduit(entryToDelete.idProduit);
        setProducts(products.filter((p) => p.id !== entryToDelete.id));
      } else if (activeRole === "intrant") {
        await deleteIntrant(entryToDelete.idIntrant);
        setIntrants(intrants.filter((i) => i.id !== entryToDelete.id));
      }

      setShowDeleteModal(false);
      setEntryToDelete(null);
      showSuccessMessage(`${activeRole} supprimé avec succès.`);

      if (["produit", "intrant"].includes(activeRole)) {
        fetchProduitsOuIntrants();
      } else {
        fetchData(activeRole);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

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
        updatedItem = await updateSuperviseur(editingId, {
          nomSup: editEntry.nom,
          prenomSup: editEntry.prenom,
          contactSup: editEntry.contact,
        });
      } else if (activeRole === "technicien") {
        updatedItem = await updateTechnicien(editingId, {
          nomTech: editEntry.nom,
          prenomTech: editEntry.prenom,
          contactTech: editEntry.contact,
        });
      } else if (activeRole === "responsable") {
        updatedItem = await updateResponsable(editingId, {
          nomResp: editEntry.nom,
          prenomResp: editEntry.prenom,
          contactResp: editEntry.contact,
        });
      }

      if (updatedItem) {
        const updatedData = data.map((item) => {
          const id = item.idSup || item.idTech || item.idResp;
          return id === editingId ? { ...item, ...updatedItem.data } : item;
        });
        setData(updatedData);
        setFilteredData(updatedData);
      }

      setEditingId(null);
      showSuccessMessage(`${activeRole} modifié avec succès.`);
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };

  const handleAddProductClick = () => {
    if (activeRole === "produit") {
      setIsAddingProduct(true);
      setIsAddingIntrant(false);
    } else if (activeRole === "intrant") {
      setIsAddingIntrant(true);
      setIsAddingProduct(false);
    }
    setNewProduct({ type: "", unite: "" });
  };

  const handleValidateProduct = async () => {
    try {
      let payload = {};
      if (activeRole === "produit") {
        payload = {
          typeProduit: newProduct.type,
          idUnite: newProduct.unite,
        };
        const response = await createAutreProduit(payload);
        if (response) {
          setProducts([response.data, ...products]);
          fetchProduitsOuIntrants();
        }
        setIsAddingProduct(false);
      } else if (activeRole === "intrant") {
        payload = {
          typeIntrant: newProduct.type,
          idUnite: newProduct.unite,
        };
        const response = await createIntrant(payload);
        if (response) {
          setIntrants([response.data, ...intrants]);
          fetchProduitsOuIntrants();
        }
        setIsAddingIntrant(false);
      }
      showSuccessMessage(`${activeRole} ajouté avec succès`);
      setNewProduct({ type: "", unite: "" });
    } catch (error) {
      console.error("Erreur ajout produit/intrant :", error);
    }
  };

  const handleEditProductClick = (item) => {
    let id_upt = activeRole === "produit" ? item.idProduit : item.idIntrant;
    setEditingProductId(id_upt);

    setEditProduct({
      type:
        activeRole === "produit"
          ? item.typeProduit || ""
          : item.typeIntrant || "",
      unite: item.unite ? item.unite.idUnite : "",
    });
  };

  const handleEditProductValidate = async () => {
    if (!editProduct.type || !editProduct.unite) return;

    try {
      let payload = {};
      let response;

      if (activeRole === "produit") {
        payload = {
          typeProduit: editProduct.type.trim(),
          idUnite: editProduct.unite,
        };

        response = await updateAutreProduit(editingProductId, payload);

        if (response?.data) {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === editingProductId ? { ...p, ...response.data } : p
            )
          );
        }
      } else if (activeRole === "intrant") {
        payload = {
          typeIntrant: editProduct.type.trim(),
          idUnite: editProduct.unite,
        };

        response = await updateIntrant(editingProductId, payload);

        if (response?.data) {
          setIntrants((prev) =>
            prev.map((i) =>
              i.id === editingProductId ? { ...i, ...response.data } : i
            )
          );
        }
      }

      setEditingProductId(null);
      setEditProduct({ type: "", unite: "" });
      showSuccessMessage(`${activeRole} modifié avec succès`);
      if (["produit", "intrant"].includes(activeRole)) {
        fetchProduitsOuIntrants();
      } else {
        fetchData(activeRole);
      }
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };

  const getFilteredProductsIntrants = () => {
    const currentData = activeRole === "produit" ? products : intrants;
    if (searchTerm.trim() === "") {
      return currentData;
    }

    const lower = searchTerm.toLowerCase();
    return currentData.filter((item) => {
      const type = item.typeProduit || item.typeIntrant || "";
      const uniteMesure = item.unite?.uniteMesure || "";
      return (
        type.toLowerCase().includes(lower) ||
        uniteMesure.toLowerCase().includes(lower)
      );
    });
  };

  // 🧱 Interface
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

        <button
          className={activeRole === "produit" ? "active" : ""}
          onClick={() => handleRoleClick("produit")}
        >
          <div className="tete_resp">
            <i className="fa-solid fa-boxes"></i>
            <span>Autres produits</span>
          </div>
          <div className="bas_resp">
            <p>Autres produits nécessaires pour la livraison</p>
          </div>
        </button>

        <button
          className={activeRole === "intrant" ? "active" : ""}
          onClick={() => handleRoleClick("intrant")}
        >
          <div className="tete_resp">
            <i className="fa-solid fa-box-open"></i>
            <span>Intrants</span>
          </div>
          <div className="bas_resp">
            <p>Intrants nécessaires pour la livraison</p>
          </div>
        </button>
      </div>

      {/* TABLES */}
      {["produit", "intrant"].includes(activeRole) ? (
        <div className="tableau_resp">
          <div className="entete_responsable">
            <input
              type="text"
              placeholder={`Recherche de ${activeRole} ...`}
              id="recherche_benef"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleAddProductClick}>
              <span>Ajouter</span>
              <i className="fa fa-plus"></i>
            </button>
          </div>

          <div className="tableau_responsable__">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Unité de mesure</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* Ligne d'ajout */}
                {(activeRole === "produit"
                  ? isAddingProduct
                  : isAddingIntrant) && (
                  <tr key="add-row">
                    <td>
                      <input
                        id="ajout_resp"
                        type="text"
                        value={newProduct.type}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, type: e.target.value })
                        }
                        placeholder={`Type de ${activeRole}`}
                      />
                    </td>
                    <td>
                      <select
                        id="ajout_resp"
                        value={newProduct.unite}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            unite: e.target.value,
                          })
                        }
                      >
                        <option value="">Sélectionner une unité</option>
                        {unites.map((u) => (
                          <option key={u.idUnite} value={u.idUnite}>
                            {u.uniteMesure}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td id="btn_td3">
                      <button
                        id="valid_btn_resp"
                        onClick={handleValidateProduct}
                        disabled={!newProduct.type || !newProduct.unite}
                      >
                        <i className="fa fa-check"></i>
                      </button>
                      <button
                        id="annuler-btn-resp"
                        onClick={() => {
                          setIsAddingProduct(false);
                          setIsAddingIntrant(false);
                        }}
                      >
                        <i className="fa fa-xmark"></i>
                      </button>
                    </td>
                  </tr>
                )}

                {getFilteredProductsIntrants().length > 0 ? (
                  getFilteredProductsIntrants().map((item) => {
                    const id =
                      activeRole === "produit"
                        ? item.idProduit
                        : item.idIntrant;
                    const type =
                      activeRole === "produit"
                        ? item.typeProduit
                        : item.typeIntrant;
                    const unite = item.unite
                      ? item.unite.uniteMesure
                      : "Non définie";

                    // 🛠️ Mode édition — même logique que "responsable"
                    if (editingProductId === id) {
                      return (
                        <tr key={id}>
                          <td>
                            <input
                              id="ajout_resp"
                              type="text"
                              value={editProduct.type}
                              onChange={(e) =>
                                setEditProduct({
                                  ...editProduct,
                                  type: e.target.value,
                                })
                              }
                              placeholder="Type"
                            />
                          </td>
                          <td>
                            <select
                              id="ajout_resp"
                              value={editProduct.unite}
                              onChange={(e) =>
                                setEditProduct({
                                  ...editProduct,
                                  unite: e.target.value,
                                })
                              }
                            >
                              <option value="">Sélectionner une unité</option>
                              {unites.map((u) => (
                                <option key={u.idUnite} value={u.idUnite}>
                                  {u.uniteMesure}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td id="btn_td3">
                            <button
                              id="valid_btn_resp"
                              onClick={handleEditProductValidate}
                              disabled={!editProduct.type || !editProduct.unite}
                            >
                              <i className="fa fa-check"></i>
                            </button>
                            <button
                              id="annuler-btn-resp"
                              onClick={() => setEditingProductId(null)}
                            >
                              <i className="fa fa-xmark"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={id}>
                        <td>{type}</td>
                        <td>{unite}</td>
                        <td id="btn_td3">
                          <button
                            id="mod"
                            onClick={() => handleEditProductClick(item)}
                          >
                            <i className="fa fa-pen"></i>
                          </button>
                          <button
                            id="sup"
                            onClick={() => handleDeleteClick(item)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr key="no-data">
                    <td
                      colSpan="3"
                      style={{ textAlign: "center", color: "gray" }}
                    >
                      Aucun {activeRole} trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="tableau_resp">
          <div className="entete_responsable">
            <input
              type="text"
              placeholder={`Recherche de ${activeRole} ...`}
              id="recherche_benef"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                {/* Formulaire d'ajout */}
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
                        placeholder="Nom"
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
                        placeholder="Prénom"
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
                        placeholder="Contact"
                      />
                    </td>
                    <td id="btn_td3">
                      <button
                        id="valid_btn_resp"
                        onClick={handleValidate}
                        disabled={
                          !newEntry.nom || !newEntry.prenom || !newEntry.contact
                        }
                      >
                        <i className="fa fa-check"></i>
                      </button>
                      <button id="annuler-btn-resp" onClick={handleCancel}>
                        <i className="fa fa-xmark"></i>
                      </button>
                    </td>
                  </tr>
                )}

                {/* Liste */}
                {filteredData.length > 0 ? (
                  filteredData.map((item) => {
                    const id = item.idSup || item.idTech || item.idResp;
                    const nom =
                      item.nomSup || item.nomTech || item.nomResp || "-";
                    const prenom =
                      item.prenomSup ||
                      item.prenomTech ||
                      item.prenomResp ||
                      "-";
                    const contact =
                      item.contactSup ||
                      item.contactTech ||
                      item.contactResp ||
                      "-";

                    if (editingId === id)
                      return (
                        <tr key={id}>
                          <td>
                            <input
                              id="ajout_resp"
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
                              value={editEntry.contact}
                              onChange={(e) =>
                                setEditEntry({
                                  ...editEntry,
                                  contact: e.target.value,
                                })
                              }
                            />
                          </td>
                          <td id="btn_td3">
                            <button
                              id="valid_btn_resp"
                              onClick={handleEditValidate}
                              disabled={
                                !editEntry.nom ||
                                !editEntry.prenom ||
                                !editEntry.contact
                              }
                            >
                              <i className="fa fa-check"></i>
                            </button>
                            <button
                              id="annuler-btn-resp"
                              onClick={() => setEditingId(null)}
                            >
                              <i className="fa fa-xmark"></i>
                            </button>
                          </td>
                        </tr>
                      );

                    return (
                      <tr key={id}>
                        <td>{nom.toUpperCase()}</td>
                        <td>{prenom}</td>
                        <td>{contact}</td>
                        <td id="btn_td3">
                          <button
                            id="mod"
                            onClick={() => handleEditClick(item)}
                          >
                            <i className="fa fa-pen"></i>
                          </button>
                          <button
                            id="sup"
                            onClick={() => handleDeleteClick(item)}
                          >
                            <i className="fa fa-trash"></i>
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
      )}

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
