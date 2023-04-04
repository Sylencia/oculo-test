import './Images.css';

export const Images = ({ imageData }) => {
  if (!imageData.length) {
    return (
      <p className="images-error">
        No images found for this date with the filters set.
      </p>
    );
  }

  return (
    <>
      <div className="images-container images-title-container">
        <h3 className="images-title">Left Eye</h3>
        <h3 className="images-title">Right Eye</h3>
      </div>
      <div className="images-container">
        {imageData.map((image) => {
          const { modality, note, thumbnail, eye } = image;

          return (
            <div className="image-details" key={`image_${modality}_${eye}`}>
              <img src={thumbnail} alt={note} />
              <ul>
                <li>Modality: {modality}</li>
                <li>Note: {note}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};
