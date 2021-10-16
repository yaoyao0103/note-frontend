import axios from "axios";
import { useState, useEffect } from "react";
import { API_HOST } from ".";
export const FetchPages = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .get(`${API_HOST}pages/`)
      .then((response) => {
        setLoading(false);
        setPages(response.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
        setError(err);
      });
  });

  return { loading, pages, error };
};

export const CreatePage = (name, pages) => {
  const [newPage, setNewPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .post(`${API_HOST}pages/`, { name })
      .then((response) => {
        setLoading(false);
        setNewPage(response.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
        setError(err);
      });
  });
  return { loading, newPage, error, pages: [...pages, newPage] };
};
