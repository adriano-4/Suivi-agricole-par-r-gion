import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navBar.css";
import minaelogo from "../assets/minaelogo.png";
import { useNavigate } from "react-router-dom";
import {
  getNotifications,
  markNotificationAsRead,
} from "../service/notification";

// function NavBar() {
//   const navigate = useNavigate();
//   const role = localStorage.getItem("role");
//   const user = localStorage.getItem("user");
//   const [isNotifOpen, setIsNotifOpen] = useState(false);
//   const notifRef = useRef(null);

//   const { unreadToday, unreadOther, read } = useNotifications();

//   function useNotifications() {
//     const [unreadToday, setUnreadToday] = useState([]);
//     const [unreadOther, setUnreadOther] = useState([]);
//     const [read, setRead] = useState([]);

//     useEffect(() => {
//       getNotifications()
//         .then((res) => {
//           const all = res.data;

//           const today = new Date();
//           const unread = all.filter((n) => n.etat === 0);
//           const unreadTodayList = unread.filter((n) => {
//             const notifDate = new Date(n.dateNotif);
//             return (
//               notifDate.getFullYear() === today.getFullYear() &&
//               notifDate.getMonth() === today.getMonth() &&
//               notifDate.getDate() === today.getDate()
//             );
//           });

//           const unreadOtherList = unread.filter((n) => {
//             const notifDate = new Date(n.dateNotif);
//             return !(
//               notifDate.getFullYear() === today.getFullYear() &&
//               notifDate.getMonth() === today.getMonth() &&
//               notifDate.getDate() === today.getDate()
//             );
//           });

//           const readList = all.filter((n) => n.etat === 1);

//           setUnreadToday(unreadTodayList);
//           setUnreadOther(unreadOtherList);
//           setRead(readList);
//         })
//         .catch((err) => console.error("Erreur fetch notifications:", err));
//     }, []);

//     return { unreadToday, unreadOther, read };
//   }

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         notifRef.current &&
//         !notifRef.current.contains(event.target) &&
//         !event.target.closest("#notification-btn")
//       ) {
//         setIsNotifOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleMarkAsRead = (id) => {
//     markNotificationAsRead(id)
//       .then(() => {
//         setUnreadToday((prev) =>
//           prev.filter((notif) => notif.idNotification !== id)
//         );
//         setUnreadOther((prev) =>
//           prev.filter((notif) => notif.idNotification !== id)
//         );
//       })
//       .catch((err) => console.error("Erreur marquer comme lu:", err));
//   };

//   return (
//     <nav className="navbar">
//       <div></div>
//       <div className="navbar__logo">
//         <img src={minaelogo} alt="" />
//       </div>
//       <div className="navbar_droite">
//         <button
//           id="notification-btn"
//           onClick={() => setIsNotifOpen(!isNotifOpen)}
//         >
//           <i className="fa-regular fa-bell"></i>
//           {unreadToday.length > 0 && <div id="not"></div>}
//         </button>
//         <div id="ligne"></div>
//         <p id="user_compte">
//           <i className="fa fa-user"></i>
//           <span>{user}</span>
//         </p>
//         <button id="déco" onClick={() => navigate("/navigation")}>
//           <i className="fa fa-home"></i>
//           <span>Acceuil</span>
//         </button>
//       </div>
//       {isNotifOpen && (
//         <div id="notif-div" ref={notifRef}>
//           <h1 id="titre_notif_date">Aujourd'hui</h1>
//           {unreadToday.length > 0 ? (
//             unreadToday.map((notif, index) => (
//               <div className="message-notif" key={index}>
//                 <div className="haut-mes">
//                   <div className="haut-mes-g">
//                     <i className="fa fa-graduation-cap"></i>
//                     <p>Alert {notif.objet}</p>
//                   </div>
//                   <div className="haut-mes-d">
//                     <button
//                       onClick={() => handleMarkAsRead(notif.idNotification)}
//                     >
//                       <i className="fa fa-check"></i>
//                     </button>
//                   </div>
//                 </div>
//                 <div className="bas-mes">
//                   <p>
//                     La date prévue pour {notif.action} dans la région de{" "}
//                     {notif.region} est aujourd'hui
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p style={{ color: "gray", fontSize: "12px" }}>
//               Aucune notification pour aujourd'hui.
//             </p>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

// export default NavBar;
function NavBar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const user = localStorage.getItem("user");
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const [unreadToday, setUnreadToday] = useState([]);
  const [unreadOther, setUnreadOther] = useState([]);
  const [read, setRead] = useState([]);

  // Fetch notifications
  const fetchNotifications = () => {
    getNotifications()
      .then((res) => {
        const all = res.data;
        const today = new Date();
        const unread = all.filter((n) => n.etat === 0);

        const unreadTodayList = unread.filter((n) => {
          const notifDate = new Date(n.dateNotif);
          return (
            notifDate.getFullYear() === today.getFullYear() &&
            notifDate.getMonth() === today.getMonth() &&
            notifDate.getDate() === today.getDate()
          );
        });

        const unreadOtherList = unread.filter((n) => {
          const notifDate = new Date(n.dateNotif);
          return !(
            notifDate.getFullYear() === today.getFullYear() &&
            notifDate.getMonth() === today.getMonth() &&
            notifDate.getDate() === today.getDate()
          );
        });

        const readList = all.filter((n) => n.etat === 1);

        setUnreadToday(unreadTodayList);
        setUnreadOther(unreadOtherList);
        setRead(readList);
      })
      .catch((err) => console.error("Erreur fetch notifications:", err));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Gestion click en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target) &&
        !event.target.closest("#notification-btn")
      ) {
        setIsNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMarkAsRead = (id) => {
    markNotificationAsRead(id)
      .then(() => {
        // Met à jour directement les listes
        setUnreadToday((prev) =>
          prev.filter((notif) => notif.idNotification !== id)
        );
        setUnreadOther((prev) =>
          prev.filter((notif) => notif.idNotification !== id)
        );
        // Optionnel : ajouter dans read
        fetchNotifications(); // rafraîchit tout, si tu veux être sûr que read est à jour
      })
      .catch((err) => console.error("Erreur marquer comme lu:", err));
  };

  return (
    <nav className="navbar">
      <div></div>
      <div className="navbar__logo">
        <img src={minaelogo} alt="" />
      </div>
      <div className="navbar_droite">
        <button
          id="notification-btn"
          onClick={() => setIsNotifOpen(!isNotifOpen)}
        >
          <i className="fa-regular fa-bell"></i>
          {unreadToday.length > 0 && <div id="not"></div>}
        </button>
        <div id="ligne"></div>
        <p id="user_compte">
          <i className="fa fa-user"></i>
          <span>{user}</span>
        </p>
        <button id="déco" onClick={() => navigate("/navigation")}>
          <i className="fa fa-home"></i>
          <span>Acceuil</span>
        </button>
      </div>
      {isNotifOpen && (
        <div id="notif-div" ref={notifRef}>
          <h1 id="titre_notif_date">Aujourd'hui</h1>
          {unreadToday.length > 0 ? (
            unreadToday.map((notif, index) => (
              <div className="message-notif" key={index}>
                <div className="haut-mes">
                  <div className="haut-mes-g">
                    <i className="fa fa-graduation-cap"></i>
                    <p>Alert {notif.objet}</p>
                  </div>
                  <div className="haut-mes-d">
                    <button
                      onClick={() => handleMarkAsRead(notif.idNotification)}
                    >
                      <i className="fa fa-check"></i>
                    </button>
                  </div>
                </div>
                <div className="bas-mes">
                  <p>
                    La date prévue pour {notif.action} dans la région de{" "}
                    {notif.region} est aujourd'hui
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "gray", fontSize: "12px" }}>
              Aucune notification pour aujourd'hui.
            </p>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
