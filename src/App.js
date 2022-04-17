import axios from 'axios'
import {useState, useEffect} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
function App() {
    const [data,updatedata]= useState([]);
    const [summary,updatesummary]= useState({});
    const [lr,updatelr]= useState("");

    useEffect(() =>{})
    async function show() {
      let d= await axios.get('https://api.rootnet.in/covid19-in/stats/latest')
      // console.log(d.data.data.regional)
      updatedata(d.data.data.regional)
      // console.log(d.data.data.summary)
      // console.log(d.data.lastRefreshed)
      updatesummary(d.data.data.summary)
      updatelr(d.data.lastRefreshed)
    }
    return(
      <>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className="container-fluid">
        <div className="navbar-brand" >Daily Covid Cases in India</div>
        </div>
        </nav>
        <div className="container">
          <div className="d-grid gap-2 mt-3">
          <button className="btn btn-primary" onClick={show} type="button">Get Data</button>
          </div>
          <div className="mt-2">
            <h5 className='Display-6'>Total Cases in India: {summary.total}</h5>
            <h5 className='Display-6'>Total Discharged: {summary.discharged}</h5>
            <h5 className='Display-6'>Deaths: {summary.deaths}</h5>
            <h5 className='Display-6'>Total Indian Cases: {summary.confirmedCasesIndian}</h5>
            <h5 className='Display-6'>Total Foreign Cases: {summary.confirmedCasesForeign}</h5>
          </div>
          <div className="d-flex flex-row bd-highlight mb-3 mt-4 flex-wrap">
            {
              data.map((item, i) => { return(
                <div className="card mx-1 my-1" style={{"width":"19.5rem"}} key={i}>
                  <div className="card-body">
                    <h5 className="card-title">{item.loc}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Cases</h6>
                    <hr />
                    <b><div className="card-text">Total Cases: {item.totalConfirmed}</div></b>
                    <div className="card-text">Recovered: {item.discharged}</div>
                    <div className="card-text">Total Deaths: {item.deaths}</div>
                    <div className="card-text">Total Indian Cases: {item.confirmedCasesIndian}</div>
                    <div className="card-text">Total Foreign Cases: {item.confirmedCasesForeign}</div>
                  </div>
                </div>
              )})
            }
          </div>
          <div className="mt-2">
            <h5 className='Display-6'>Last Refreshed: {lr}</h5>
          </div>
        </div>
      </>
    );
}

export default App;
