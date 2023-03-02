import { useState, useRef } from "react";
import { useForm } from "react-final-form";

function NumberOfPeopleInput() {
  const { change } = useForm();
  let [people, setPeople] = useState({ old: 2, young: 0 });
  let optionListRef = useRef();
  change("numberOfPeople", people);
  return (
    <div style={{ position: "relative" }}>
      <label className="form-label">Broj ljudi</label>

      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">
          <i class="bi bi-person-fill"></i>
        </span>
        <input
          type="text"
          class="form-control"
          aria-label="Broj ljudi"
          readOnly
          value={`Odrasli-${people.old} ; Deca-${people.young}`}
          aria-describedby="addon-wrapping"
          placeholder="Broj ljudi"
          className="form-control"
          onClick={() => (optionListRef.current.style.display = "block")}
        />
      </div>

      <ul
        className="list-group"
        style={{ position: "absolute", width: "100%", display: "none" }}
        ref={optionListRef}
        onMouseLeave={() => (optionListRef.current.style.display = "none")}
      >
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <div className="form-floating mb-3">
            <input
              type="number"
              min={0}
              class="form-control"
              id="floatingInput"
              value={people.old}
              onChange={(e) => setPeople({ ...people, old: e.target.value })}
            />
            <label for="floatingInput">Broj odraslih</label>
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <div className="form-floating mb-3">
            <input
              type="number"
              min={0}
              class="form-control"
              id="floatingInput1"
              value={people.yound}
              onChange={(e) => setPeople({ ...people, young: e.target.value })}
            />
            <label for="floatingInput1">Broj dece</label>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default NumberOfPeopleInput;
