import React from 'react';
import {DivRow, DivCol} from './bs_div_gid.js'

export function ListItem(props) {
    return (
    <li className="list-group-item">
      
        <DivRow className="">
          <DivCol className="col-10">
            <DivRow className="">
              <DivCol className="col-12 col-sm-8 col-md-7" >
                <span className="li-content text-primary"> {props.item }({props.amount}oz)</span>
                
              </DivCol>
              <DivCol className="col-12 col-sm-4 col-md-5">
                <span className="li-content text-primary">{props.calories}cal</span>
                
              </DivCol>
            </DivRow>
            
          </DivCol>
        
          <DivCol className="col-2">
                  <button type=""  aria-label="Close" className="removeBtn btn-warning btn float-right " onClick={ () => (props.onClick(props.uid) ) }><span aria-hidden="true">&times;</span></button > 
          </DivCol>
        </DivRow>

      </li>
    )
}

export function ItemList(props) {
    return(
    <ul className='list-group'>
      {props.items.map( item => item.toListItemProps() ).map(itemProps => {
        return (
            <ListItem  onClick={ props.onClick } {...itemProps} />
        );
      })}
    </ul>
  )
}