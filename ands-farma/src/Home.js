import React,{Component} from 'react';
import image from "./4.jpg";

export class Home extends Component{
    render(){
        return(
            <div>
                <h3>This is Home page</h3>
                <h3>Welcome to ANB-Farma</h3>
                <img width="250px" height="250px" src={image}/>
            </div>
        )
    }
}