import { Link } from "react-router-dom";

const Navigation = () => (
  <div style={{ margin: "0.5rem 1rem", display: 'flex' }}>
    <span style={{ marginRight: "1rem" }}>
      <Link to="/form-viewer">Viewer</Link>
    </span>
    <span style={{ marginRight: "1rem" }}>
      <Link to="/">Designer</Link>
    </span>
  </div>
);

export default Navigation;
