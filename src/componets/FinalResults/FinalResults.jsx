import './FinalResults.css'
import PropTypes  from 'prop-types';

export default function FinalResults({secResults,finalResults}){
return (
    <>{secResults != undefined && finalResults != undefined ?
        <>
            {secResults.map(secResult =>(
                <p key={secResult.secName}>
                    {secResult != null ? <>Your Section Results for {secResult.secName} is {secResult.youGotRight}/{secResult.secQuestion}</>:<></>}
                </p>
            ))}
            <p>Your Percentage {finalResults.overAllPercentage}%</p><br/><p>Total Number of right Answers {finalResults.totalRightAnswers}/{finalResults.totalQuestion}</p>
        </>
        :<></>}</>
)
}

FinalResults.propTypes = {
    secResults: PropTypes.arrayOf(PropTypes.shape({
        secName: PropTypes.string,
        secQuestion: PropTypes.number,
        youGotRight: PropTypes.number
})),
    finalResults: PropTypes.shape({
        totalRightAnswers: PropTypes.number,
        overAllPercentage: PropTypes.number,
        totalQuestion: PropTypes.number,
    }),
};