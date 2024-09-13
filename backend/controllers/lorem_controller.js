import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

  export const genratelorem=async(req,res)=>{
    const { paragraphCount } = req.body;
    if (!paragraphCount || paragraphCount < 1) {
      return res.status(400).json({ message: "Invalid paragraph count!" });
    }
  
    try {
      const loremText = lorem.generateParagraphs(paragraphCount);
    //   console.log('Generated Lorem Ipsum:', loremText); // Log the output
      res.status(200).json({ loremText });
    } catch (error) {
      res.status(500).json({ message: "Error generating Lorem Ipsum text.", error: error.message });
    }
  }
  