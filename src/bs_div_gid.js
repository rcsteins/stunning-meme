import React from 'react';

export function DivRow({className,...props}) {
  return(
    <div className={['row ', className].join(' ')} {...props}>
      
    </div>
  );
}

export function DivCol({className,...props}) {
  return(
    <div className={['col ', className].join(' ')} {...props}>
      
    </div>
  );
}