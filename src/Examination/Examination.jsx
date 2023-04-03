export const Examination = ({ examinationData }) => {
  const { date, images } = examinationData;
  // TODO: Split out image into its own component
  return (
    <>
      <div>{date}</div>
      {images.map((image) => {
        const { eye, modality, note, thumbnail } = image;
        return (
          <>
            <div>{eye}</div>
            <div>{modality}</div>
            <div>{note}</div>
            <img src={thumbnail} alt={note} />
          </>
        );
      })}
    </>
  );
};
