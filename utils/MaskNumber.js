// Add thousand comma separator

const MaskNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default MaskNumber;
