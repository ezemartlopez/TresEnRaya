import React from 'react';

function ReactIf({ state = false, children }) {
  return (
    <React.Fragment>
      {state ? <div>{children}</div> : null}
      {/* Opcional: Manejar el caso cuando state es false */}
      {/* {!state && <div>Contenido cuando state es false</div>} */}
    </React.Fragment>
  );
}

export default ReactIf;
