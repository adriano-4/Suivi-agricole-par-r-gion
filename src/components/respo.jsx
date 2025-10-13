import React, { useState, useEffect, useRef } from "react";
import "../css/responsable.css";
import Suppression from "./suppression";

function Respo({ title, headers, data, onAdd, onEdit, onDelete }) {
  const [editId, setEditId] = useState(null); // id en cours d'édition
  const [localData, setLocalData] = useState([]);
  const [showSup, setShowSup] = useState(false);
  const [deleteItemObj, setDeleteItemObj] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [editId]);

  const handleChange = (id, key, value) => {
    setLocalData(
      localData.map((item) =>
        (item.idTech || item.idSup || item.idResp) === id
          ? { ...item, [key]: value }
          : item
      )
    );
  };

  const handleAdd = () => {
    const newItem = {};
    headers.forEach((h) => {
      if (!h.key.toLowerCase().includes("id")) newItem[h.key] = "";
    });

    const newId = Date.now();
    if (title.toLowerCase().includes("technicien")) newItem.idTech = newId;
    else if (title.toLowerCase().includes("superviseur")) newItem.idSup = newId;
    else newItem.idResp = newId;

    setLocalData([newItem, ...localData]);
    setEditId(newId);
  };

  const handleEditToggle = (id) => {
    setEditId(id);
  };

  const handleValidate = (id) => {
    const itemToUpdate = localData.find(
      (item) => (item.idTech || item.idSup || item.idResp) === id
    );
    onEdit(itemToUpdate);
    setEditId(null);
  };

  const handleDelete = (item) => {
    setDeleteItemObj(item);
    setShowSup(true);
  };

  const confirmDelete = () => {
    onDelete(deleteItemObj);
    setShowSup(false);
    setDeleteItemObj(null);
  };

  const recherche__ = () => {
    const recherche = document.querySelector(".recherche__");
    recherche.style.display = "block";
  };

  const isEditing = (id) => editId === id;

  return (
    <div id="table-crud">
      <div id="entete">
        <h2>{title}</h2>
        <input
          className="recherche__"
          id="recherche__"
          type="text"
          placeholder="recherche..."
        />
        <button id="search" onClick={recherche__}>
          <i className="fa fa-search"></i>
        </button>
        <button id="aj" onClick={handleAdd} disabled={editId !== null}>
          <span>Ajouter</span>
          <i className="fa fa-plus"></i>
        </button>
      </div>

      <table>
        <thead>
          <tr>
            {headers
              .filter((h) => !h.key.toLowerCase().includes("id"))
              .map((header) => (
                <th key={header.key}>{header.label}</th>
              ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {localData.map((item) => {
            const id = item.idTech || item.idSup || item.idResp;
            const editing = isEditing(id);

            return (
              <tr key={id}>
                {headers
                  .filter((h) => !h.key.toLowerCase().includes("id"))
                  .map((header, idx) => (
                    <td key={header.key}>
                      {editing ? (
                        <input
                          ref={idx === 0 ? inputRef : null}
                          value={item[header.key]}
                          onChange={(e) =>
                            handleChange(id, header.key, e.target.value)
                          }
                        />
                      ) : (
                        item[header.key]
                      )}
                    </td>
                  ))}
                <td  id="button_action">
                  {editing ? (
                    <button onClick={() => handleValidate(id)}>
                      <i className="fa fa-check"></i>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditToggle(id)}
                      disabled={editId !== null}
                    >
                      <i className="fa fa-pen"></i>
                    </button>
                  )}
                  <button
                    id="sup"
                    onClick={() => handleDelete(item)}
                    disabled={editId !== null}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showSup && deleteItemObj && (
        <Suppression
          titre_sup={title.slice(0, -1)}
          texte="Cette action est irréversible."
          setShowSupCrud={setShowSup}
          onConfirmDelete={confirmDelete}
        />
      )}
    </div>
  );
}

export default Respo;
