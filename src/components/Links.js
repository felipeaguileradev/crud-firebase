import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LinkForm from "./LinkForm";
import { db } from "../firebase";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const getLinks = async () => {
    // optengo una sola vez los datos, cuando monto el componente
    // const querySnapshot = await db.collection("links").get();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });

    // con el onSnapshot pregunta en tiempo real si hubo un cambio en los datos de firebase
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };
  useEffect(() => {
    getLinks();
  }, []);

  const addOrEditLink = async (linkObject) => {
    try {
      if (currentId === "") {
        await db.collection("links").doc().set(linkObject);
        toast("New link added", {
          type: "success",
        });
      } else {
        await db.collection("links").doc(currentId).update(linkObject);
        toast("Link updated successfully", {
          type: "info",
        });
      }
      setCurrentId("");
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteLink = async (id) => {
    if (window.confirm("are you sure you want to delete this link?")) {
      await db.collection("links").doc(id).delete();
      toast("Link deleted", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="col-12">
      <LinkForm {...{ addOrEditLink, currentId, links }} />
      <div className="col-md-8 mt-3">
        {links.map((link) => (
          <div key={link.id} className="card mb-1">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i
                    className="material-icons text-danger mr-2"
                    onClick={() => onDeleteLink(link.id)}
                  >
                    close
                  </i>
                  <i
                    className="material-icons text-info"
                    onClick={() => setCurrentId(link.id)}
                  >
                    create
                  </i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                Go to website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;
