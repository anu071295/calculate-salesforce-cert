import propTypes from 'prop-types';
import './SectionResultInput.css'
import { useEffect, useState } from 'react';
import FinalResults from '../FinalResults/FinalResults';

export default function SectionResultInput({certDetailsofSelected}){
    const [inputValues, setInputValues] = useState({});
    const [secResults, setSecResults] = useState([]);
    const [finalResults, setFinalResults] = useState({});
    useEffect(() => {
        // Reset values when certDetailsofSelected prop changes
        if(secResults.length>0 && finalResults !== undefined){
            setInputValues({});
            setSecResults([]);
            setFinalResults({});
        }
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [certDetailsofSelected]);

  const handleFieldInputChange = event => {
    const { name, value } = event.target;
    setInputValues(prevInputValues => ({
      ...prevInputValues,
      [name]: value,
    }));
  };
  const handleOnSubmit = event => {
    if(secResults.length>0)
        setSecResults([]);
    event.preventDefault();
    var totalResults = 0;
    var finalPercentage = 0;
    for(var key in certDetailsofSelected.weightage){
        const secQuestionConst = Math.round((certDetailsofSelected.weightage[key].percentage * certDetailsofSelected.nuberofQuestions)/100);
        const youGotRighttConst = Math.round(secQuestionConst*(inputValues[certDetailsofSelected.weightage[key].category]/100));
        const categroyValue = certDetailsofSelected.weightage[key].category
        setSecResults(prevSecResults => ([
            ...prevSecResults,
            {
                secName: categroyValue,
                secQuestion:secQuestionConst,
                youGotRight:youGotRighttConst,
            }
        ]));
        totalResults += youGotRighttConst;
    }
    finalPercentage = totalResults/certDetailsofSelected.nuberofQuestions*100;
    setFinalResults({
        totalRightAnswers : totalResults,
        overAllPercentage : finalPercentage,
        totalQuestion : certDetailsofSelected.nuberofQuestions,
    })
  }
    return (
        <>
        
            {certDetailsofSelected != undefined?
            <>
                
                <form className = "certResultForm" onSubmit={handleOnSubmit}>
                <h2>{certDetailsofSelected.name}</h2>
                    <table className='certResultTable'>
                        <thead className='tableHead'>
                        <tr>
                            <th>Category</th>
                            <th>Weightage</th>
                            <th>YourScore</th>
                        </tr>
                        </thead>
                        {certDetailsofSelected.weightage.map(weightage =>(
                            <tbody className='tablebody' key={weightage.category}>
                            <tr >
                                <td>{weightage.category}</td>
                                <td>{weightage.percentage}%</td>
                                <td>
                                <input className='youScoreInput'
                                        type="number"
                                        name={weightage.category}
                                        value={inputValues[weightage.category] || ''}
                                        onChange={handleFieldInputChange}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        ))}
                    </table>
                    <button className='submitButton' type="submit">Submit</button>
                </form>
                {secResults.length > 0 && finalResults != undefined? <FinalResults 
                secResults={secResults} 
                finalResults={finalResults}
                /> : ''}
            </>
            :<>
            </>}
            
        
        </>
    )
}

SectionResultInput.propTypes = {
    certDetailsofSelected : propTypes.shape({
        id: propTypes.number,
        name: propTypes.string,
        nuberofQuestions: propTypes.number,
        weightage : propTypes.arrayOf(
            propTypes.shape({
                category: propTypes.string,
                percentage: propTypes.number,
            })
        )
    }),
};