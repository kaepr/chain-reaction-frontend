function GameCell(props) {
  const data = props.dataIndividual;
  let color;
  if (data.owner === 0) {
    color =
      'w-10 h-10 flex align-center justify-center border-black cursor-pointer cell-container';
  } else if (data.owner === 1) {
    color =
      'bg-green-800 w-10 h-10 flex align-center justify-center border-black cursor-pointer cell-container';
  } else if (data.owner === 2) {
    color =
      'bg-red-800 w-10 h-10 flex align-center justify-center border-black cursor-pointer cell-container';
  }

  return (
    <div className={color} key={data.x + data.y}>
      {data.val !== 0 && (
        <p className="text-white font-semibold m-auto">{data.val}</p>
      )}
    </div>
  );
}

export default GameCell;
