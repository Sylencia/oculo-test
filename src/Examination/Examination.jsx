import { Images } from '../Images';
import './Examination.css';

export const Examination = ({ examinationData }) => {
  const { date, images } = examinationData;

  return (
    <div className="examination-container">
      <h2 className="examination-date">{date}</h2>
      <Images imageData={images} key={`images-${date}`} />
    </div>
  );
};
