import propTypes from 'prop-types';
import './SectionResultInput.css'
import { useState } from 'react';
import FinalResults from '../FinalResults/FinalResults';

export default function SectionResultInput({certDetailsofSelected}){
    const [inputValues, setInputValues] = useState({});
    const [secResults, setSecResults] = useState([{}]);
    const [finalResults, setFinalResults] = useState({});

  const handleFieldInputChange = event => {
    const { name, value } = event.target;
    setInputValues(prevInputValues => ({
      ...prevInputValues,
      [name]: value,
    }));
  };
  const handleOnSubmit = event => {
    event.preventDefault();
    var totalResults = 0;
    var finalPercentage = 0;
    for(var key in certDetailsofSelected.weightage){
        //console.log("Weightage",certDetailsofSelected.weightage[key].percentage);
        //console.log("Your Score",inputValues[certDetailsofSelected.weightage[key].category]);
        //console.log("Number of questions",certDetailsofSelected.nuberofQuestions);
        const secQuestionConst = Math.round((certDetailsofSelected.weightage[key].percentage * certDetailsofSelected.nuberofQuestions)/100);
        const youGotRighttConst = Math.round(secQuestionConst*(inputValues[certDetailsofSelected.weightage[key].category]/100));
        const categroyValue = certDetailsofSelected.weightage[key].category
        console.log('Sec Question ',secQuestionConst);
        console.log('You got Right ', youGotRighttConst);
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
    console.log('Total ', totalResults);
    finalPercentage = totalResults/certDetailsofSelected.nuberofQuestions*100;
    console.log('Final Percentage ' + finalPercentage);
    console.log('Find out the datatype of the object variable ', typeof(secResults));
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
                <h2>{certDetailsofSelected.name}</h2>
                <form onSubmit={handleOnSubmit}>
                    <table>
                        <thead>
                        <tr>
                            <th>Category</th>
                            <th>Weightage</th>
                            <th>YourScore</th>
                        </tr>
                        </thead>
                        {certDetailsofSelected.weightage.map(weightage =>(
                            <tbody key={weightage.category}>
                            <tr >
                                <td>{weightage.category}</td>
                                <td>{weightage.percentage}%</td>
                                <td>
                                <input
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
                    <button type="submit">Submit</button>
                </form>
                <FinalResults 
                secResults={secResults} 
                finalResults={finalResults}
                />
            </>
            :<></>}
            
        
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