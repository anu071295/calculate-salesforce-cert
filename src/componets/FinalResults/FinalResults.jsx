import './FinalResults.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'; // Import useEffect and useState

export default function FinalResults({ secResults, finalResults }) {
  const [sectionResults, setSectionResults] = useState([]);
  const [overallResults, setOverallResults] = useState(null);

  useEffect(() => {
    // Update the section and overall results when props change
    setSectionResults(secResults || []);
    setOverallResults(finalResults || null);
  }, [secResults, finalResults]);

  return (
    <>
      {sectionResults.length > 0 && overallResults !== null ? (
        <div className='resultsContainer'>
            <h3>Results</h3>
            <table className='resultTable'>
            {sectionResults.map((secResult) => (
                    <tbody key={secResult.secName}>
                        <tr>
                            <td>{secResult.secName}</td>
                            <td>{secResult.youGotRight}/{secResult.secQuestion}</td>
                        </tr>

                    </tbody>
                
            ))}
            </table>
          <p>Your Percentage {overallResults.overAllPercentage}%</p>
          <br />
          <p>Total Number of right Answers {overallResults.totalRightAnswers}/{overallResults.totalQuestion}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

FinalResults.propTypes = {
  secResults: PropTypes.arrayOf(
    PropTypes.shape({
      secName: PropTypes.string,
      secQuestion: PropTypes.number,
      youGotRight: PropTypes.number,
    })
  ),
  finalResults: PropTypes.shape({
    totalRightAnswers: PropTypes.number,
    overAllPercentage: PropTypes.number,
    totalQuestion: PropTypes.number,
  }),
};
