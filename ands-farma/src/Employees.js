import React,{Component} from 'react';
import { variables } from './Variables';

export class Employees extends Component{
    constructor(props){
        super(props);

        this.state={
            pharmpoints:[],
            employeess:[],
            posts:[
                {id: 1, name1: "selter"},
                {id: 2, name1: "consultant"}],
            modalTitle:"",
            name:"",
            id:0,
            pharmacy_point_id: 0,
            post: "",
            jobDate: Date.now,
            IdFilter:"",
            NameFilter:"",
            WithoutFilter:[]
        }
    }

    FilterFn(){
        var IdFilter=this.state.IdFilter;
        var NameFilter = this.state.NameFilter;

        var filteredData=this.state.WithoutFilter.filter(
            function(el){
                return el.id.toString().toLowerCase().includes(
                    IdFilter.toString().trim().toLowerCase()
                )&&
                el.name.toString().toLowerCase().includes(
                    NameFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({employeess:filteredData});

    }

    sortResult(prop,asc){
        var sortedData=this.state.WithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({employeess:sortedData});
    }

    changeDepartmentIdFilter = (e)=>{
        this.state.IdFilter=e.target.value;
        this.FilterFn();
    }
    changeDepartmentNameFilter = (e)=>{
        this.state.NameFilter=e.target.value;
        this.FilterFn();
    }

    refreshList(){
        fetch(variables.API_URL+'employee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({employeess:data,WithoutFilter:data});
        });
        fetch(variables.API_URL+'pharmpoint')
        .then(response=>response.json())
        .then(data=>{
            this.setState({pharmpoints:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeDepartmentName =(e)=>{
        this.setState({name:e.target.value});
    }
    changeEmployePharmPoint =(e)=>{
        this.setState({pharmacy_point_id:e.target.value});
    }
    changeEmployePost =(e)=>{
        this.setState({post:e.target.value});
    }
    changeDateOfJoining =(e)=>{
        this.setState({jobDate:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Employee",
            id:0,
            name:"",
            pharmacy_point_id:0,
            post:"",
            jobDate: Date
        });
    }
    editClick(emp){
        this.setState({
            modalTitle:"Edit Employee",
            id:emp.id,
            name:emp.name,
            pharmacy_point_id:emp.pharmacy_point_id,
            post:emp.post,
            jobDate:emp.jobDate
        });
    }

    createClick(){
        fetch(variables.API_URL+'employee',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:this.state.name,
                pharmacy_point_id:this.state.pharmacy_point_id,
                post:this.state.post,
                jobDate:this.state.jobDate
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
        fetch(variables.API_URL+'employee',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:this.state.id,
                name:this.state.name,
                pharmacy_point_id:this.state.pharmacy_point_id,
                post:this.state.post,
                jobDate:this.state.jobDate
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
        fetch(variables.API_URL+'employee/'+id,{
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

    render(){
        const {
            employeess,
            modalTitle,
            id,
            name,
            pharmacy_point_id,
            post,
            jobDate,
            pharmpoints,
            posts

        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Employee
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">

            
            <input className="form-control m-2"
            onChange={this.changeDepartmentIdFilter}
            placeholder="Filter"/>
            
            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('id',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('id',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>

            </div>
            EmployeeId
        </th>
        <th>
        <div className="d-flex flex-row">
        <input className="form-control m-2"
            onChange={this.changeDepartmentNameFilter}
            placeholder="Filter"/>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('name',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('name',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            EmployeeName
        </th>
        <th>
            Pharmacy Point Id
        </th>
        <th>
            Post
        </th>
        <th>
            Job date
        </th>
    </tr>
    </thead>
    <tbody>
        {employeess.map(emp=>
            <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.pharmacy_point_id}</td>
                <td>{emp.post}</td>
                <td>{new Date(emp.jobDate).toLocaleDateString()}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(emp)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(emp.id)}>
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
       <div className="input-group mb-3">
        <span className="input-group-text">Employee Name</span>
        <input type="text" className="form-control"
        value={name}
        onChange={this.changeDepartmentName}/>
       </div>

       <div className="input-group mb-3">
            <span className="input-group-text">Employee PharmPoint</span>
            <select className="form-select"
            onChange={this.changeEmployePharmPoint}
            value={pharmacy_point_id}>
                {pharmpoints.map(ph=><option key={ph.id}>
                    {ph.id}
                </option>)}
                
            </select>
        </div>
       <div className="input-group mb-3">
            <span className="input-group-text">Employee Post</span>

            <select className="form-select"
            onChange={this.changeEmployePost}
            value={post}>
                {posts.map(ps=><option key={ps.id}>
                    {ps.name1}
                </option>)}
                
            </select>
        </div>

       <div className="input-group mb-3">
            <span className="input-group-text">job Date</span>
            <input type="date" className="form-control"
            value={jobDate.now}
            onChange={this.changeDateOfJoining}/>
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