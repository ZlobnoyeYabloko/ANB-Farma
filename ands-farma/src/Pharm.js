import React,{Component} from 'react';
import { variables } from './Variables';
import { connect } from 'react-redux';

export class Pharm extends Component{
    constructor(props){
        super(props);

        this.state={
            manufs:[],
            pharmtypess:[],
            pharms:[],
            modalTitle:"",
            id:0,
            name:"",
            packing:0,
            price:0,
            manufactures_id: 0,
            pharmaceutical_types_id: 0,            
            imageUrl:"upload.png",
            PhotoPath:variables.PHOTO_URL
        }
    }

    refreshList(){

        fetch(variables.API_URL+'pharm')
        .then(response=>response.json())
        .then(data=>{
            this.setState({pharms:data});
        });

        fetch(variables.API_URL+'manuf')
        .then(response=>response.json())
        .then(data=>{
            this.setState({manufs:data});
        });

        fetch(variables.API_URL+'pharmtypes')
        .then(response=>response.json())
        .then(data=>{
            this.setState({pharmtypess:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeEmployeeName =(e)=>{
        this.setState({name:e.target.value});
    }
    changePharmPacking =(e)=>{
        this.setState({packing:e.target.value});
    }
    changeEmployeePrice =(e)=>{
        this.setState({price:e.target.value});
    }
    changeManuf =(e)=>{
        this.setState({manufactures_id:e.target.value});
    }
    changePharmTypes =(e)=>{
        this.setState({pharmaceutical_types_id:e.target.value});
    }


    addClick(){
        this.setState({
            modalTitle:"Add Pharmaceutical",
            id:0,
            name:"",
            packing:0,
            price:0,
            manufactures_id: 0,
            pharmaceutical_types_id: 0,
            imageUrl:"anonymous.png"
        });
    }
    editClick(pharm){
        this.setState({
            modalTitle:"Edit Pharmaceutical",
            id:pharm.id,
            name:pharm.name,
            packing:pharm.packing,
            price:pharm.price,
            manufactures_id: pharm.manufactures_id,
            pharmaceutical_types_id: pharm.pharmaceutical_types_id,
            imageUrl:pharm.imageUrl
        });
    }

    createClick(){
        fetch(variables.API_URL+'pharm',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:this.state.name,
                packing:this.state.packing,
                price:this.state.price,
                manufactures_id:this.state.manufactures_id,
                pharmaceutical_types_id:this.state.pharmaceutical_types_id,
                imageUrl:this.state.imageUrl
            })
        })        
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'pharm',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:this.state.id,
                name:this.state.name,
                packing:this.state.packing,
                price:this.state.price,
                manufactures_id:this.state.manufactures_id,
                pharmaceutical_types_id:this.state.pharmaceutical_types_id,
                imageUrl:this.state.imageUrl
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'pharm/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    imageUpload=(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);

        fetch(variables.API_URL+'pharm/savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({imageUrl:data});
        })
    }

    render(){
        const {
            manufs,
            pharmtypess,
            pharms,
            modalTitle,
            id,
            name,
            packing,
            price,
            manufactures_id,
            pharmaceutical_types_id,
            PhotoPath,
            imageUrl
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Pharmaceutical
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            PharmaceuticalId
        </th>
        <th>
            PharmaceuticalName
        </th>
        <th>
            Packing
        </th>
        <th>
            Price
        </th>
        <th>
            Manufactures Id
        </th>
        <th>
            Image
        </th>
        <th>
            Pharmaceutical types
        </th>
    </tr>
    </thead>
    <tbody>
        {pharms.map(pharm=>
            <tr key={pharm.id}>
                <td>{pharm.id}</td>
                <td>{pharm.name}</td>
                <td>{pharm.packing}</td>
                <td>{pharm.price}</td>
                <td>{pharm.manufactures_id}</td>        
                <td><img width="50px" height="50px" src={PhotoPath+pharm.imageUrl}/></td>
                <td>{pharm.pharmaceutical_types_id}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(pharm)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(pharm.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
    <div className="d-flex flex-row bd-highlight mb-3">
     
     <div className="p-2 w-50 bd-highlight">
    
        <div className="input-group mb-3">
            <span className="input-group-text">Pharm Name</span>
            <input type="text" className="form-control"
            value={name}
            onChange={this.changeEmployeeName}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Pharm packing</span>
            <input type="number" className="form-control"
            value={packing}
            onChange={this.changePharmPacking}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Pharm price</span>
            <input type="number" className="form-control"
            value={price}
            onChange={this.changeEmployeePrice}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">manufactures_id</span>
            <select className="form-select"
            onChange={this.changeManuf}
            value={manufactures_id}>
                {manufs.map(man=><option key={man.id}>
                    {man.id}
                </option>)}
            </select>
        </div>
        
        <div className="input-group mb-3">
            <span className="input-group-text">pharmaceuticals_types_id</span>
            <select className="form-select"
            onChange={this.changePharmTypes}
            value={pharmaceutical_types_id}>
                {pharmtypess.map(pt=><option key={pt.id}>
                    {pt.id}
                </option>)}
                
            </select>
        </div>

     </div>
     <div className="p-2 w-50 bd-highlight">
         <img width="250px" height="250px"
         src={PhotoPath+imageUrl}/>
         <input className="m-2" type="file" onChange={this.imageUpload}/>
     </div>
    </div>

    {id==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {id!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}
   </div>

</div>
</div> 
</div>


</div>
        )
    }
}
