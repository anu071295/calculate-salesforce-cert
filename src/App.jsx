import {useState } from 'react'
import './App.css'
import certData from './assets/cert-data.json'
import SectionResultInput from './componets/SectionResultInput/SectionResultInput';



export default function App() {
  const certificationOptions = [{value : '', label : 'None'}];
  const [certSelectedValue, setCertSelectedValue] = useState('');
  const [certDetailsofSelected, setCertDetailsofSelected] = useState();
  for(var key in certData.certificates){
    certificationOptions.push({value : certData.certificates[key].name, label : certData.certificates[key].name});
  }
   
  const handleSelectChange = (Event) => {
    setCertSelectedValue(Event.target.value);
  }

  const handleOnClickGo = () => {
    setCertDetailsofSelected(null);
    for(var key in certData.certificates){
      if(certData.certificates[key].name == certSelectedValue){
        console.log('Inside');
        setCertDetailsofSelected(certData.certificates[key]);
      }
    }
  }
  
  return (
    <div className='appContainer'>
      <h1>Salesforce Certificate Results Calculator</h1>
      <select className = 'certificateDropDown' value={certSelectedValue} onChange={handleSelectChange}>
        {certificationOptions.map(certificates => (
          <option key={certificates.label} value={certificates.value}>
            {certificates.label}
          </option>
        ))}
      </select>
      <button className='searchButton' onClick={handleOnClickGo}>Search</button>
      <SectionResultInput certDetailsofSelected={certDetailsofSelected}/>
    </div>
  )
}
