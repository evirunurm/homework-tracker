import React from "react";
import {IDENTIFIERS_BY_TYPES} from "../../utils/moduleIdentifiers";
import "./nav.css"

export default function Nav() {
  return <nav>
    <p>CALENDA<span className={"bold"}>Reader</span></p>
    <div>
      <ul className={"legend"}>
        {
          Object.values(IDENTIFIERS_BY_TYPES).map((type, i) => {
            return <li key={i} className={"types-items"}>
              <div className={`type ${type}`}>

              </div>
              {type}
            </li>
          })
        }
      </ul>
    </div>
  </nav>
};