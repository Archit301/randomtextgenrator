const generateRandomText = (length, charset) => {
    
        const allCharsets = {
            alphabetic: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
            numeric: '0123456789',
            symbols: '!@#$%^&*()_+[]{}|;:,.<>?'
          };
     
     const combinedCharset = charset
    .map(charset => allCharsets[charset])
    .join('');
 
    let result = '';
    for (let i = 0; i < length; i++) {
      result += combinedCharset.charAt(Math.floor(Math.random() * combinedCharset.length));
    }
  
    return result;
  };
  
  export default generateRandomText