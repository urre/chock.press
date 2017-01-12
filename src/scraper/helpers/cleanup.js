const cleanup = () => {
  fs.unlinkSync('../data/aftonbladet.json');
  fs.unlinkSync('../data/expressen.json');
}

export default cleanup;