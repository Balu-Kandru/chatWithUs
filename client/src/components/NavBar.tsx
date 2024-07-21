import "../styles/NavBar.css"
import { FaBars } from "react-icons/fa";
import { RiChatNewLine } from "react-icons/ri";

interface SessionI {
    sessionList: {title: string, id: number}[],
    isCollapsed: boolean,
    toggleNavbar: ()=> void,
    onItemSelected: (sessionId: number)=> void,
    createNewConnection: (()=> void)
}


const NavBar: React.FC<SessionI> = ({ sessionList, isCollapsed, toggleNavbar, onItemSelected, createNewConnection }) => {


    return (
        <div style={{ width: isCollapsed ? '70px' : '200px', transition: 'width 0.3s' }}>
          <div className="navButtonsDiv">
            <button onClick={toggleNavbar}><FaBars /></button>
            <button onClick={createNewConnection}><RiChatNewLine/></button>
          </div>
          {!isCollapsed && (
            <ul>
              {sessionList.map((item, index) => (
                <li key={index} style={{ fontWeight: 20 }}  onClick={() => onItemSelected(item.id)} className="cursor-pointer">
                  {item.title}
                </li>
              ))}
            </ul>
          )}
      </div>
    )
}

export default NavBar;