import '../styles/ColorGrid.css';
const ColorGrid = ({ colors = [] }) => {
  return (
    <div className='container'>
      {colors.map((color, index) => (
        <div
          key={index}
          className='colorBox'
          style={{backgroundColor: color}}
          title={color}
        />
      ))}
    </div>
  );
};

export default ColorGrid;
