import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_HOST } from "./api_utils";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import geditorConfig from "./api_utils/geditor_config";
import PageSection from "./components/PageSection";

const Editor = () => {
  const [editor, setEditor] = useState(null);
  const [assets, setAssets] = useState([]);
  const [pages, setPages] = useState([]);
  const [error, setError] = useState("");
  const { pageId } = useParams();

  useEffect(() => {
    async function getAllAssets() {
      try {
        const response = await axios.get(`${API_HOST}assets/`);
        setAssets(response.data);
      } catch (error) {
        setAssets(error.message);
      }
    }
    async function getAllPages() {
      try {
        const response = await axios.get(`${API_HOST}pages/`);
        setPages(response.data);
      } catch (error) {
        setError(error.message);
      }
    }
    getAllPages();
    getAllAssets();
  }, []);

  useEffect(() => {
    const editor = geditorConfig(assets, pageId);
    setEditor(editor);
  }, [pageId, assets]);
  return (
    <div className="App">
      <div id="navbar" className="sidenav d-flex flex-column overflow-scroll">
        <nav className="navbar navbar-light">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h3 logo">Code Dexterous</span>
          </div>
        </nav>
        <PageSection pages={pages} />
        <Sidebar />
      </div>
      <div className="main-content" id="main-content">
        <TopNav />
        <div id="editor"></div>
      </div>
    </div>
  );
};

export default Editor;
