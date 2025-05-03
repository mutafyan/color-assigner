
const ColorGrid = ({ colors = [] }) => {
  return (
    <div style={styles.container}>
      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            ...styles.colorBox,
            backgroundColor: color,
          }}
          title={color}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '16px',
  },
  colorBox: {
    width: '40px',
    height: '40px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
};

export default ColorGrid;
