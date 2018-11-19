import React, { Component } from 'react';
import {DivRow, DivCol} from './bs_div_gid.js'
import {ItemForm} from './item_form.js'
import logo from './logo.svg';
import {ItemList} from './list_item.js'
import './App.css';

var dataModel = require("./DataModel.js");

class TodoApp extends React.Component {
  
  constructor(props) {
    super(props)
    this.menuDir = dataModel.FoodDirectory.sampleMenu();
    this.state = {
      items:[
        this.newMenuItem('chicken',2.9),
        this.newMenuItem('frozen raspberries',2.9),
        this.newMenuItem('kale',1.1),
        this.newMenuItem('kale',1.1),
        this.newMenuItem('peanuts',1.2)
      ]
    }
    this.newItemSubmited = this.newItemSubmited.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  
  newItemSubmited(name,amount) {
    this.setState(function(state, props) {
      return {
        items: [this.newMenuItem(name,amount) ].concat(state.items)
      }
    });
  }
  
  newMenuItem(kind,amount) {
    return this.menuDir.createMenuItem(kind,amount);
  }
  
  handleClick(removeKey) {
    this.setState(function(state, props) {
      let newItems = state.items.filter( (item) => (item.uid !== removeKey) )
      return {
        items: newItems
      }
    });
  }
  
  totalCalories() {
    return dataModel.Meal.totalCalories(this.state.items);
  }
  
  formOptionList() {
    return this.menuDir.entryList()
  }
  
  render() {
    return (
      <div>
        <DivRow className='pt-1'> 
          
          <DivCol className="col-6 col-lg-8 col-md-7 col-sm-6">
            <h2 className="h2-title ">CaloReact:</h2>
            <img src={logo} className="App-logo2 d-inline-block d-sm-inline-block" alt="logo" />
          </DivCol>
          <DivCol className="col-6 col-lg-4 col-sm-6 col-md-5">
            <h2 className='h2-title '> Cal:{this.totalCalories()} </h2>
            <img src={logo} className="App-logo2 d-inline-block d-sm-inline-block d-md-none " alt="logo" />
          </DivCol>
          
        </DivRow>
        <ItemForm optionListAb={this.formOptionList() } newItemSubmited={this.newItemSubmited}/>

        <DivRow className= "list-g-cont">
          <DivCol className="">
            <ItemList onClick={this.handleClick} items={this.state.items} />
          </DivCol>
          <DivCol className="col-lg-4 col-md-5 col-sm-7 d-none d-xs-none d-sm-none d-md-block ">
            <img src={logo} className="App-logo" alt="logo" />
          </DivCol>
        </DivRow>


      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <div className="container fixed-top">
            
            <DivRow className=" make-border">
              
              <DivCol className="">
                <TodoApp />
              </DivCol>
              
            </DivRow>

          </div>
          
        </header>
      </div>
    );
  }
}

export default App;
