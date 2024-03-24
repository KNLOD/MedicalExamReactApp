import { Link } from 'react-router-dom';
import "../styles/Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Navigation</h2>
            <ul>
                <Link to="/">Main page</Link>
                <Link to="/patients">Patients</Link>
                <Link to="/examinations">Examinations</Link>
            </ul>
        </div>
    )

}

export default Sidebar;