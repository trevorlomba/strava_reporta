import { useState, useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import CadenceReport from './CadenceReport';
import RestReport from './RestReport';


const ReportSlider = () => {
  const navigate = useNavigate();
  const [reportsIndex, setReportsIndex] = useState(0);
  const reportsArray = ['/rest', '/cadence'];

  const handleBack = () => {
    const newReportsIndex = reportsIndex - 1;
    setReportsIndex(newReportsIndex < 0 ? reportsArray.length - 1 : newReportsIndex);
  };

  const handleNext = () => {
    const newReportsIndex = (reportsIndex + 1) % reportsArray.length;
    setReportsIndex(newReportsIndex);
  };

  useEffect(() => {
    navigate(reportsArray[reportsIndex]);
  }, [reportsIndex]);

  return (
        <div className="report-slider">
      <Routes>
        <Route index path="/rest" element={<RestReport />} />
        <Route path="/cadence" element={<CadenceReport />} />
      </Routes>
      {reportsArray.length > 1 ? <button className="back-button" onClick={handleBack}>
        <FontAwesomeIcon icon={faAngleLeft} className="back-icon" />
        <span className="sr-only">Back</span>
      </button> : ''}
      {reportsArray.length > 1 ? <button className="next-button" onClick={handleNext}> 
        <FontAwesomeIcon icon={faAngleRight} className="next-icon" />
        <span className="sr-only">Next</span>
      </button>: ''}
    </div>
  );
};

export default ReportSlider;
