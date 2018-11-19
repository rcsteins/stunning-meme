import React  from 'react';
import {DivRow, DivCol} from './bs_div_gid.js';
var dataModel = require("./DataModel.js");



function TextInputControl(props) {
  return (
    <div className="input-group form-group">
      <div className="input-group-prepend  d-none d-sm-block ">
        <span className="input-group-text" id="basic-addon1">amount</span>
      </div>
       <input className="form-control" pattern="[0-9]*\.?\d?\d?" {...props} value={props.value} onChange={props.onChange} required placeholder="Enter amount" min=".01"/>
    </div>
    
  );
}

function SelectInputControl(props) {
  return (
    <div className="input-group">
      <div className="input-group-prepend  d-none d-sm-block">
        <span className="input-group-text" id="basic-addon1">category</span>
      </div>
      
      <select className="form-control"  onChange={props.onChange} name={props.name}>
        {props.optNames.map( (optName,ix) => (
          <option key={ix} value={optName}>{optName}</option>
        ))}
      </select>
    </div>
  );
}


export class ItemForm extends React.Component {
  constructor(props) {
    super(props);
        let initFruitVal = this.firstOptionName()
    
    this.state = {amountVal:'', foodName:initFruitVal};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  optionNames1() {
      return this.props.optionListAb.map(item => (item.name) );
  }
  
  firstOptionName() {
    return this.optionNames1()[0]
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const stateKey = target.name;
    const stateKeyEqAmountValue = stateKey === "amountVal"
    const notNum = isNaN(value);
    
    
    if (stateKeyEqAmountValue && notNum) {
            event.preventDefault();
      return;
    }
        
    let newState = {
      [stateKey]: value
    }
        
    if (target.name==='foodName') {
      newState['amountVal'] = ''
    }
    
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.newItemSubmited(this.state.foodName,this.state.amountVal)
    this.setState({amountVal:''})
  }
  
  renderOption(optName) {
    return <option key={dataModel.guid()} value={optName}>{optName}</option>
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="">

        
        <div className="row form-inline">
          <div className="col">  
            
            <DivRow className=" wtf-row">
              <DivCol className="col pb-0 mb-0">
                
                <SelectInputControl name="foodName" value={this.state.foodName}  optNames={this.optionNames1()} onChange={this.handleChange} />
                
              </DivCol>
              
              <DivCol className=" col-6 col-sm-6">
                
                <TextInputControl value={this.state.amountVal} onChange={this.handleChange} step=".01" name ="amountVal" />
              </DivCol>
            </DivRow>
              
          </div>

          
          <div className="col col-12 col-md-5 col-lg-4">
              <button className='btn btn-primary btn-block' type="submit" value="Submit" >Submit </button>      
          </div>
        </div>
        
      </form>

    );
  }
}