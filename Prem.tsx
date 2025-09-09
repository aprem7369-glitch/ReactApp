import React, { useState } from "react";
import "./site-labels.css";

type Form = {
  siteHeaderName: string;
  cacheClearOnWrapperChange: string;
  topNavigationHomeChannel: string;
};

type Field = { key: keyof Form; label: string; hint: string };

const FIELDS: Field[] = [
  { key: "siteHeaderName", label: "Site Header name", hint: "Shown in the header" },
  { key: "cacheClearOnWrapperChange", label: "Cache clear on wrapper change", hint: "After wrapper changes" },
  { key: "topNavigationHomeChannel", label: "Top Navigation Home Channel", hint: "Channel key for Home" },
];

const Prem = () => {
  const [open, setOpen] = useState(true);
  const [form, setForm] = useState<Form>({
    siteHeaderName: "",
    cacheClearOnWrapperChange: "",
    topNavigationHomeChannel: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof Form;     // <-- typed key
    const value = e.target.value;
    setForm((p) => ({ ...p, [name]: value }));
  };

  return (
    <section className={`sl-panel ${open ? "is-open" : ""}`}>
      <button className="sl-header" type="button" onClick={() => setOpen((v) => !v)}>
        <svg className="sl-chevron" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" fill="currentColor" />
        </svg>
        <h3 className="sl-title">
          Site labels <span className="sl-title-info">(i)</span>
        </h3>
      </button>

      {open && (
        <div className="sl-rows">
          {FIELDS.map((f, idx) => (
            <div className="sl-row" key={f.key}>
              <div className="sl-label">
                <span className="sl-label-prefix">LABEL:</span> {f.label}
                <span className="sl-info" title={f.hint}>i</span>
              </div>

              <input
                className="sl-input"
                type="text"
                name={f.key}
                value={form[f.key]}          // <-- properly typed string
                onChange={onChange}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
  
};

export default Prem;