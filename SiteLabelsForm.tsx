
import React, { useState, useEffect } from "react";
import "./site-labels.css";
import Prem from "./Prem";

function SiteLabelsForm() {
  const [open, setOpen] = useState(true);
  const [siteHeaderName, setSiteHeaderName] = useState("");
  const [cacheClearOnWrapperChange, setCacheClearOnWrapperChange] = useState("");
  const [topNavigationHomeChannel, setTopNavigationHomeChannel] = useState("");
  const [showJson, setShowJson] = useState(false);
  const [submittedJson, setSubmittedJson] = useState<{ siteHeaderName: string; cacheClearOnWrapperChange: string; topNavigationHomeChannel: string } | null>(null);

  useEffect(() => {
  fetch("/site-labels-data.json")
      .then(res => res.json())
      .then(data => {
        setSiteHeaderName(data.siteHeaderName || "");
        setCacheClearOnWrapperChange(data.cacheClearOnWrapperChange || "");
        setTopNavigationHomeChannel(data.topNavigationHomeChannel || "");
      });
  }, []);

  return (
    <section className={open ? "sl-panel is-open" : "sl-panel"}>
      <button className="sl-header" type="button" onClick={() => setOpen(!open)}>
        <svg className="sl-chevron" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" fill="currentColor" />
        </svg>
        <h3 className="sl-title">
          Site labels <span className="sl-title-info">(i)</span>
        </h3>
      </button>

      {open && (
        <div className="sl-rows">
          <div className="sl-row">
            <div className="sl-label">
              <span className="sl-label-prefix">LABEL:</span> Site Header name
              <span className="sl-info" title="Shown in the header">i</span>
            </div>
            <input
              className="sl-input"
              type="text"
              name="siteHeaderName"
              value={siteHeaderName}
              onChange={e => setSiteHeaderName(e.target.value)}
            />
          </div>
          <div className="sl-row">
            <div className="sl-label">
              <span className="sl-label-prefix">LABEL:</span> Cache clear on wrapper change
              <span className="sl-info" title="After wrapper changes">i</span>
            </div>
            <input
              className="sl-input"
              type="text"
              name="cacheClearOnWrapperChange"
              value={cacheClearOnWrapperChange}
              onChange={e => setCacheClearOnWrapperChange(e.target.value)}
            />
          </div>
          <div className="sl-row">
            <div className="sl-label">
              <span className="sl-label-prefix">LABEL:</span> Top Navigation Home Channel
              <span className="sl-info" title="Channel key for Home">i</span>
            </div>
            <input
              className="sl-input"
              type="text"
              name="topNavigationHomeChannel"
              value={topNavigationHomeChannel}
              onChange={e => setTopNavigationHomeChannel(e.target.value)}
            />
          </div>
          {/* Submit button at the bottom of the form */}
          <div style={{ textAlign: "right", marginTop: "24px" }}>
            <button
              type="button"
              style={{ padding: "8px 20px", fontSize: "15px", borderRadius: "4px", border: "1px solid #0b5ed7", background: "#0b5ed7", color: "#fff", cursor: "pointer" }}
              onClick={() => {
                setSubmittedJson({ siteHeaderName, cacheClearOnWrapperChange, topNavigationHomeChannel });
                setShowJson(true);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {showJson && submittedJson && (
        <div style={{ marginTop: "32px", background: "#f7f7f8", padding: "16px", borderRadius: "6px" }}>
          <strong>Submitted JSON:</strong>
          <pre style={{ fontSize: "15px", marginTop: "8px" }}>{JSON.stringify(submittedJson, null, 2)}</pre>
        </div>
      )}
    </section>
  );
}

export default SiteLabelsForm;